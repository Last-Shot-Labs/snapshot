import { Command, Flags } from "@oclif/core";
import { intro, log, multiselect, outro, text } from "@clack/prompts";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

/**
 * Add a resource scaffold to the local manifest.
 */
export default class AddResource extends Command {
  static override description = "Add a resource to the snapshot manifest";

  static override examples = [
    "<%= config.bin %> add-resource --name users --base /api/users",
  ];

  static override flags = {
    name: Flags.string({ description: "Resource name" }),
    base: Flags.string({ description: "Base API path" }),
    manifest: Flags.string({
      description: "Manifest file path",
      default: "snapshot.manifest.json",
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(AddResource);
    const manifestPath = path.resolve(process.cwd(), flags.manifest);

    intro("@lastshotlabs/snapshot add-resource");

    if (!fs.existsSync(manifestPath)) {
      log.error(`Manifest not found: ${flags.manifest}`);
      outro("Aborted.");
      this.exit(1);
      return;
    }

    const nameValue =
      flags.name ??
      (await text({
        message: "Resource name",
        placeholder: "users",
      }));
    if (typeof nameValue !== "string" || nameValue.length === 0) {
      outro("Aborted.");
      return;
    }

    const baseValue =
      flags.base ??
      (await text({
        message: "Base API path",
        placeholder: `/api/${nameValue}`,
        initialValue: `/api/${nameValue}`,
      }));
    if (typeof baseValue !== "string" || baseValue.length === 0) {
      outro("Aborted.");
      return;
    }

    const operations = await multiselect({
      message: "Operations to include",
      options: [
        { label: "List", value: "list" },
        { label: "Get", value: "get" },
        { label: "Create", value: "create" },
        { label: "Update", value: "update" },
        { label: "Delete", value: "delete" },
      ],
      initialValues: ["list", "get", "create", "update", "delete"],
    });
    if (!Array.isArray(operations)) {
      outro("Aborted.");
      return;
    }

    const manifest = JSON.parse(
      fs.readFileSync(manifestPath, "utf8"),
    ) as Record<string, unknown>;
    const resources = ((manifest.resources ??= {}) as Record<string, unknown>);

    resources[nameValue] = {
      ...(operations.includes("list") ? { list: `GET ${baseValue}` } : {}),
      ...(operations.includes("get") ? { get: `GET ${baseValue}/{id}` } : {}),
      ...(operations.includes("create") ? { create: `POST ${baseValue}` } : {}),
      ...(operations.includes("update") ? { update: `PUT ${baseValue}/{id}` } : {}),
      ...(operations.includes("delete") ? { delete: `DELETE ${baseValue}/{id}` } : {}),
    };

    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    log.success(`Added resource "${nameValue}"`);
    outro("Done.");
  }
}
