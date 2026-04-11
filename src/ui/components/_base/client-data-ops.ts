import { getNestedValue } from "../../context/utils";

export interface ClientFilter {
  field: string;
  operator:
    | "equals"
    | "contains"
    | "startsWith"
    | "endsWith"
    | "gt"
    | "lt"
    | "gte"
    | "lte"
    | "in"
    | "notEquals";
  value: unknown;
}

export interface ClientSort {
  field: string;
  direction: "asc" | "desc";
}

function compareClientValues(left: unknown, right: unknown): number {
  if (left == null && right == null) {
    return 0;
  }
  if (left == null) {
    return -1;
  }
  if (right == null) {
    return 1;
  }
  if (typeof left === "number" && typeof right === "number") {
    return left - right;
  }
  if (typeof left === "boolean" && typeof right === "boolean") {
    return Number(left) - Number(right);
  }
  return String(left).localeCompare(String(right));
}

function matchesFilter(
  item: Record<string, unknown>,
  filter: ClientFilter,
): boolean {
  const fieldValue = getNestedValue(item, filter.field);
  const filterValue = filter.value;

  switch (filter.operator) {
    case "equals":
      return fieldValue === filterValue;
    case "notEquals":
      return fieldValue !== filterValue;
    case "contains":
      return String(fieldValue ?? "").includes(String(filterValue ?? ""));
    case "startsWith":
      return String(fieldValue ?? "").startsWith(String(filterValue ?? ""));
    case "endsWith":
      return String(fieldValue ?? "").endsWith(String(filterValue ?? ""));
    case "gt":
      return Number(fieldValue) > Number(filterValue);
    case "lt":
      return Number(fieldValue) < Number(filterValue);
    case "gte":
      return Number(fieldValue) >= Number(filterValue);
    case "lte":
      return Number(fieldValue) <= Number(filterValue);
    case "in":
      return Array.isArray(filterValue) && filterValue.includes(fieldValue);
    default:
      return true;
  }
}

export function applyClientFilters<T extends Record<string, unknown>>(
  data: T[],
  filters: ClientFilter[],
): T[] {
  if (filters.length === 0) {
    return data;
  }

  return data.filter((item) =>
    filters.every((filter) => matchesFilter(item, filter)),
  );
}

export function applyClientSort<T extends Record<string, unknown>>(
  data: T[],
  sorts: ClientSort[],
): T[] {
  if (sorts.length === 0) {
    return data;
  }

  return [...data].sort((left, right) => {
    for (const sort of sorts) {
      const comparison = compareClientValues(
        getNestedValue(left, sort.field),
        getNestedValue(right, sort.field),
      );
      if (comparison !== 0) {
        return sort.direction === "desc" ? -comparison : comparison;
      }
    }
    return 0;
  });
}
