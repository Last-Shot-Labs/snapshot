import { Command, Flags } from "@oclif/core";
import { confirm, intro, log, outro, select, text } from "@clack/prompts";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

type PresetName = "crud" | "dashboard" | "settings" | "auth" | "blank";

function buildPresetConfig(
  preset: PresetName,
  title: string,
  routePath: string,
): Record<string, unknown> {
  const slug = routePath.replace(/^\/+/, "").replace(/\//g, "-") || "page";

  switch (preset) {
    case "crud":
      return {
        title,
        listEndpoint: `GET /api/${slug}`,
        createEndpoint: `POST /api/${slug}`,
        updateEndpoint: `PUT /api/${slug}/{id}`,
        deleteEndpoint: `DELETE /api/${slug}/{id}`,
        columns: [{ key: "name", label: "Name" }],
      };
    case "dashboard":
      return {
        title,
        stats: [{ label: "Total", endpoint: `GET /api/${slug}/stats` }],
      };
    case "settings":
      return {
        title,
        sections: [
          {
            label: "General",
            submitEndpoint: `PATCH /api/${slug}`,
            fields: [{ key: "name", type: "text", label: "Name" }],
          },
        ],
      };
    case "auth":
      return {
        screen: "login",
        branding: { appName: title },
      };
    default:
      return {};
  }
}

/**
 * Add a route to the local manifest.
 */
export default class AddPage extends Command {
  static override description = "Add a new page to the snapshot manifest";

  static override examples = [
    "<%= config.bin %> add-page --path /users --title Users --preset crud",
  ];

  static override flags = {
    path: Flags.string({ description: "Route path (e.g. /users)" }),
    title: Flags.string({ description: "Page title" }),
    preset: Flags.string({
      description: "Preset to scaffold",
      options: ["crud", "dashboard", "settings", "auth", "blank"],
    }),
    manifest: Flags.string({
      description: "Manifest file path",
      default: "snapshot.manifest.json",
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(AddPage);
    const manifestPath = path.resolve(process.cwd(), flags.manifest);

    intro("@lastshotlabs/snapshot add-page");

    if (!fs.existsSync(manifestPath)) {
      log.error(`Manifest not found: ${flags.manifest}`);
      outro("Aborted.");
      this.exit(1);
      return;
    }

    const routePathValue =
      flags.path ??
      (await text({
        message: "Route path",
        placeholder: "/users",
        validate: (value) =>
          value.startsWith("/") ? undefined : "Path must start with /",
      }));
    if (typeof routePathValue !== "string") {
      outro("Aborted.");
      return;
    }

    const titleValue =
      flags.title ??
      (await text({
        message: "Page title",
        placeholder: "Users",
      }));
    if (typeof titleValue !== "string") {
      outro("Aborted.");
      return;
    }

    const presetValue =
      (flags.preset as PresetName | undefined) ??
      ((await select({
        message: "Page preset",
        options: [
          { label: "CRUD", value: "crud" },
          { label: "Dashboard", value: "dashboard" },
          { label: "Settings", value: "settings" },
          { label: "Auth", value: "auth" },
          { label: "Blank", value: "blank" },
        ],
      })) as PresetName | symbol);
    if (typeof presetValue !== "string") {
      outro("Aborted.");
      return;
    }

    const manifest = JSON.parse(
      fs.readFileSync(manifestPath, "utf8"),
    ) as Record<string, unknown>;
    const routes = Array.isArray(manifest.routes)
      ? (manifest.routes as Array<Record<string, unknown>>)
      : [];
    manifest.routes = routes;

    const route = {
      id: routePathValue.replace(/^\/+/, "").replace(/[^\w/-]+/g, "-") || "home",
      path: routePathValue,
      ...(presetValue === "blank"
        ? {
            title: titleValue,
            content: [{ type: "heading", text: titleValue, level: 1 }],
          }
        : {
            preset: presetValue,
            presetConfig: buildPresetConfig(presetValue, titleValue, routePathValue),
          }),
    };

    const existingIndex = routes.findIndex(
      (entry) => entry.path === routePathValue || entry.id === route.id,
    );
    if (existingIndex >= 0) {
      const overwrite = await confirm({
        message: `Route "${routePathValue}" already exists. Overwrite it?`,
      });
      if (overwrite !== true) {
        outro("Aborted.");
        return;
      }
      routes[existingIndex] = route;
    } else {
      routes.push(route);
    }

    const addNavItem = await confirm({
      message: "Add this page to navigation?",
      initialValue: true,
    });
    if (addNavItem === true) {
      const navigation = (manifest.navigation ??= {
        items: [],
      }) as { items?: Array<Record<string, unknown>> };
      navigation.items ??= [];
      const existingNavItemIndex = navigation.items.findIndex(
        (item) => item.path === routePathValue,
      );
      const nextNavItem = {
        label: titleValue,
        path: routePathValue,
      };
      if (existingNavItemIndex >= 0) {
        navigation.items[existingNavItemIndex] = {
          ...navigation.items[existingNavItemIndex],
          ...nextNavItem,
        };
      } else {
        navigation.items.push(nextNavItem);
      }
    }

    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    log.success(`Added page "${titleValue}" at ${routePathValue}`);
    outro("Done.");
  }
}
