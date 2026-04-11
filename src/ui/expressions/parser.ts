import { getNestedValue } from "../context/utils";

type TokenType =
  | "identifier"
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "operator"
  | "punctuation";

interface Token {
  type: TokenType;
  value: string;
}

type AstNode =
  | { type: "literal"; value: unknown }
  | { type: "ref"; path: string }
  | { type: "call"; name: "defined" | "empty" | "length"; ref: string }
  | { type: "unary"; operator: "!"; operand: AstNode }
  | { type: "binary"; operator: string; left: AstNode; right: AstNode };

export interface ExpressionContext {
  [key: string]: unknown;
}

const OPERATOR_TOKENS = ["||", "&&", "==", "!=", ">=", "<=", ">", "<", "!"];

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let index = 0;

  while (index < input.length) {
    const current = input[index]!;
    if (/\s/.test(current)) {
      index += 1;
      continue;
    }

    const operator = OPERATOR_TOKENS.find((candidate) =>
      input.startsWith(candidate, index),
    );
    if (operator) {
      tokens.push({ type: "operator", value: operator });
      index += operator.length;
      continue;
    }

    if ("().[],".includes(current)) {
      tokens.push({ type: "punctuation", value: current });
      index += 1;
      continue;
    }

    if (current === "'" || current === '"') {
      const quote = current;
      let value = "";
      index += 1;
      while (index < input.length && input[index] !== quote) {
        value += input[index]!;
        index += 1;
      }
      if (input[index] !== quote) {
        throw new Error(`Unterminated string literal in "${input}"`);
      }
      index += 1;
      tokens.push({ type: "string", value });
      continue;
    }

    if (/[0-9]/.test(current)) {
      let value = current;
      index += 1;
      while (index < input.length && /[0-9.]/.test(input[index]!)) {
        value += input[index]!;
        index += 1;
      }
      tokens.push({ type: "number", value });
      continue;
    }

    if (/[a-zA-Z_$]/.test(current)) {
      let value = current;
      index += 1;
      while (index < input.length && /[a-zA-Z0-9_$-]/.test(input[index]!)) {
        value += input[index]!;
        index += 1;
      }

      if (value === "true" || value === "false") {
        tokens.push({ type: "boolean", value });
      } else if (value === "null") {
        tokens.push({ type: "null", value });
      } else {
        tokens.push({ type: "identifier", value });
      }
      continue;
    }

    throw new Error(`Unexpected token "${current}" in expression "${input}"`);
  }

  return tokens;
}

class Parser {
  private readonly tokens: Token[];

  private index = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  parse(): AstNode {
    const expression = this.parseOrExpr();
    if (this.peek()) {
      throw new Error(`Unexpected token "${this.peek()!.value}"`);
    }
    return expression;
  }

  private parseOrExpr(): AstNode {
    let left = this.parseAndExpr();
    while (this.match("operator", "||")) {
      left = {
        type: "binary",
        operator: "||",
        left,
        right: this.parseAndExpr(),
      };
    }
    return left;
  }

  private parseAndExpr(): AstNode {
    let left = this.parseNotExpr();
    while (this.match("operator", "&&")) {
      left = {
        type: "binary",
        operator: "&&",
        left,
        right: this.parseNotExpr(),
      };
    }
    return left;
  }

  private parseNotExpr(): AstNode {
    if (this.match("operator", "!")) {
      return {
        type: "unary",
        operator: "!",
        operand: this.parseNotExpr(),
      };
    }

    return this.parseCompareExpr();
  }

  private parseCompareExpr(): AstNode {
    const left = this.parsePrimary();
    const operator = this.peek();
    if (
      operator?.type === "operator" &&
      ["==", "!=", ">", "<", ">=", "<="].includes(operator.value)
    ) {
      this.index += 1;
      return {
        type: "binary",
        operator: operator.value,
        left,
        right: this.parsePrimary(),
      };
    }

    return left;
  }

  private parsePrimary(): AstNode {
    if (this.match("punctuation", "(")) {
      const expression = this.parseOrExpr();
      this.expect("punctuation", ")");
      return expression;
    }

    const token = this.peek();
    if (!token) {
      throw new Error("Unexpected end of expression");
    }

    if (token.type === "string") {
      this.index += 1;
      return { type: "literal", value: token.value };
    }

    if (token.type === "number") {
      this.index += 1;
      return { type: "literal", value: Number(token.value) };
    }

    if (token.type === "boolean") {
      this.index += 1;
      return { type: "literal", value: token.value === "true" };
    }

    if (token.type === "null") {
      this.index += 1;
      return { type: "literal", value: null };
    }

    if (token.type === "identifier") {
      const identifier = token.value;
      if (
        ["defined", "empty", "length"].includes(identifier) &&
        this.peek(1)?.value === "("
      ) {
        this.index += 1;
        this.expect("punctuation", "(");
        const ref = this.parseRef();
        this.expect("punctuation", ")");
        return {
          type: "call",
          name: identifier as "defined" | "empty" | "length",
          ref,
        };
      }

      return {
        type: "ref",
        path: this.parseRef(),
      };
    }

    throw new Error(`Unexpected token "${token.value}"`);
  }

  private parseRef(): string {
    const first = this.expect("identifier");
    let path = first.value;

    while (true) {
      if (this.match("punctuation", ".")) {
        const next = this.expect("identifier");
        path += `.${next.value}`;
        continue;
      }

      if (this.match("punctuation", "[")) {
        const next = this.peek();
        if (!next) {
          throw new Error("Unexpected end of expression");
        }

        if (next.type === "number" || next.type === "string") {
          this.index += 1;
          path += `[${next.type === "string" ? JSON.stringify(next.value) : next.value}]`;
          this.expect("punctuation", "]");
          continue;
        }

        throw new Error(`Invalid ref segment "${next.value}"`);
      }

      break;
    }

    return path;
  }

  private match(type: TokenType, value?: string): boolean {
    const token = this.peek();
    if (!token || token.type !== type || (value && token.value !== value)) {
      return false;
    }
    this.index += 1;
    return true;
  }

  private expect(type: TokenType, value?: string): Token {
    const token = this.peek();
    if (!token || token.type !== type || (value && token.value !== value)) {
      throw new Error(
        `Expected ${value ?? type} but found "${token?.value ?? "<eof>"}"`,
      );
    }
    this.index += 1;
    return token;
  }

  private peek(offset = 0): Token | undefined {
    return this.tokens[this.index + offset];
  }
}

function toComparable(value: unknown): number | string | null {
  if (typeof value === "number" || typeof value === "string") {
    return value;
  }
  if (value == null) {
    return null;
  }
  return Number(value);
}

function resolveRefPath(path: string, context: ExpressionContext): unknown {
  const normalized = path.replace(/\[("([^"]*)"|'([^']*)'|[0-9]+)\]/g, ".$1");
  const cleaned = normalized
    .replace(/\."([^"]*)"/g, ".$1")
    .replace(/\.'([^']*)'/g, ".$1");

  return getNestedValue(context, cleaned);
}

function isEmpty(value: unknown): boolean {
  if (value == null || value === "") {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === "object") {
    return Object.keys(value as Record<string, unknown>).length === 0;
  }
  return false;
}

function evaluateAst(node: AstNode, context: ExpressionContext): unknown {
  switch (node.type) {
    case "literal":
      return node.value;
    case "ref":
      return resolveRefPath(node.path, context);
    case "call": {
      const value = resolveRefPath(node.ref, context);
      switch (node.name) {
        case "defined":
          return value !== undefined && value !== null;
        case "empty":
          return isEmpty(value);
        case "length":
          return value != null && "length" in Object(value)
            ? Number((value as { length?: unknown }).length ?? 0)
            : 0;
      }
    }
    case "unary":
      return !Boolean(evaluateAst(node.operand, context));
    case "binary": {
      if (node.operator === "||") {
        return Boolean(evaluateAst(node.left, context)) ||
          Boolean(evaluateAst(node.right, context));
      }
      if (node.operator === "&&") {
        return Boolean(evaluateAst(node.left, context)) &&
          Boolean(evaluateAst(node.right, context));
      }

      const left = evaluateAst(node.left, context);
      const right = evaluateAst(node.right, context);

      switch (node.operator) {
        case "==":
          // eslint-disable-next-line eqeqeq
          return left == right;
        case "!=":
          // eslint-disable-next-line eqeqeq
          return left != right;
        case ">":
          return Number(toComparable(left)) > Number(toComparable(right));
        case "<":
          return Number(toComparable(left)) < Number(toComparable(right));
        case ">=":
          return Number(toComparable(left)) >= Number(toComparable(right));
        case "<=":
          return Number(toComparable(left)) <= Number(toComparable(right));
        default:
          return false;
      }
    }
  }
}

export function evaluateExpression(
  expression: string,
  context: ExpressionContext,
): boolean {
  return Boolean(evaluateAst(new Parser(tokenize(expression)).parse(), context));
}

export function extractExpressionRefs(expression: string): string[] {
  const refs = new Set<string>();
  expression.replace(
    /\b([a-zA-Z_$][a-zA-Z0-9_$-]*(?:\.[a-zA-Z0-9_$-]+|\[(?:"[^"]*"|'[^']*'|\d+)\])*)\b/g,
    (match, path: string) => {
      if (["defined", "empty", "length", "true", "false", "null"].includes(match)) {
        return match;
      }
      refs.add(path);
      return match;
    },
  );

  return [...refs];
}
