import { Command, Flags } from "@oclif/core";
import { intro, log, outro } from "@clack/prompts";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

/**
 * Generate a JSON Schema file for snapshot manifests.
 */
export default class ManifestSchema extends Command {
  static override description =
    "Generate JSON Schema for snapshot.manifest.json";

  static override examples = [
    "<%= config.bin %> manifest schema --output snapshot.schema.json",
  ];

  static override flags = {
    output: Flags.string({
      char: "o",
      description: "Output file path",
      default: "snapshot.schema.json",
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(ManifestSchema);
    const outputPath = path.resolve(process.cwd(), flags.output);

    intro("@lastshotlabs/snapshot manifest schema");
    const { generateJsonSchema } = await import(
      "../../../ui/manifest/json-schema.js"
    );
    const schema = generateJsonSchema();
    fs.writeFileSync(outputPath, `${JSON.stringify(schema, null, 2)}\n`);
    log.success(`Wrote ${flags.output}`);
    outro("Done.");
  }
}
