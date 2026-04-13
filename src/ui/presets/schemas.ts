import { z } from "zod";

const optionSchema = z
  .object({
    label: z.string().min(1),
    value: z.string().min(1),
  })
  .strict();

const formFieldSchema = z
  .object({
    key: z.string().min(1),
    type: z.enum([
      "text",
      "email",
      "password",
      "number",
      "select",
      "textarea",
      "toggle",
    ]),
    label: z.string().min(1),
    required: z.boolean().optional(),
    options: z.array(optionSchema).optional(),
    placeholder: z.string().optional(),
  })
  .strict();

const formSchema = z
  .object({
    fields: z.array(formFieldSchema).min(1),
  })
  .strict();

/** Validate preset config for a CRUD page assembled from list/form primitives. */
export const crudPresetConfigSchema = z
  .object({
    title: z.string().min(1),
    listEndpoint: z.string().min(1),
    createEndpoint: z.string().optional(),
    updateEndpoint: z.string().optional(),
    deleteEndpoint: z.string().optional(),
    columns: z
      .array(
        z
          .object({
            key: z.string().min(1),
            label: z.string().min(1),
            badge: z.boolean().optional(),
            format: z
              .enum(["date", "currency", "number", "boolean"])
              .optional(),
          })
          .strict(),
      )
      .min(1),
    createForm: formSchema.optional(),
    updateForm: formSchema.optional(),
    filters: z
      .array(
        z
          .object({
            key: z.string().min(1),
            label: z.string().min(1),
            type: z.enum(["select", "text"]),
            options: z.array(optionSchema).optional(),
          })
          .strict(),
      )
      .optional(),
    pagination: z
      .object({
        pageSize: z.number().int().positive().optional(),
        type: z.enum(["offset", "cursor"]).optional(),
      })
      .strict()
      .optional(),
    emptyState: z
      .object({
        title: z.string().min(1),
        description: z.string().optional(),
        icon: z.string().optional(),
      })
      .strict()
      .optional(),
    id: z.string().optional(),
  })
  .strict();

/** Validate preset config for a dashboard page with stats, charts, and activity sections. */
export const dashboardPresetConfigSchema = z
  .object({
    title: z.string().min(1),
    stats: z
      .array(
        z
          .object({
            label: z.string().min(1),
            endpoint: z.string().min(1),
            valueKey: z.string().min(1),
            format: z.enum(["number", "currency", "percent"]).optional(),
            trend: z
              .object({
                key: z.string().min(1),
                positive: z.enum(["up", "down"]).optional(),
              })
              .strict()
              .optional(),
            icon: z.string().optional(),
          })
          .strict(),
      )
      .min(1),
    recentActivity: z.string().optional(),
    charts: z
      .array(
        z
          .object({
            variant: z.enum([
              "line",
              "bar",
              "area",
              "pie",
              "donut",
              "sparkline",
              "funnel",
              "radar",
              "treemap",
              "scatter",
            ]),
            endpoint: z.string().min(1),
            title: z.string().optional(),
            series: z
              .array(
                z
                  .object({
                    field: z.string().min(1),
                    label: z.string().optional(),
                    color: z.string().optional(),
                  })
                  .strict(),
              )
              .optional(),
            span: z.number().int().min(1).max(12).optional(),
          })
          .strict(),
      )
      .optional(),
    activityFeed: z
      .object({
        endpoint: z.string().min(1),
        limit: z.number().int().positive().optional(),
        title: z.string().optional(),
      })
      .strict()
      .optional(),
    id: z.string().optional(),
  })
  .strict();

/** Validate preset config for a settings page composed from one or more submitted sections. */
export const settingsPresetConfigSchema = z
  .object({
    title: z.string().min(1),
    sections: z
      .array(
        z
          .object({
            label: z.string().min(1),
            submitEndpoint: z.string().min(1),
            method: z.enum(["POST", "PUT", "PATCH"]).optional(),
            dataEndpoint: z.string().optional(),
            fields: z.array(formFieldSchema).min(1),
            submitLabel: z.string().optional(),
            icon: z.string().optional(),
            autoSave: z.boolean().optional(),
            autoSaveDelay: z.number().int().positive().optional(),
          })
          .strict(),
      )
      .min(1),
    id: z.string().optional(),
  })
  .strict();

/** Validate preset config for auth screens such as login, register, and password recovery. */
export const authPresetConfigSchema = z
  .object({
    screen: z.enum([
      "login",
      "register",
      "forgot-password",
      "reset-password",
      "verify-email",
    ]),
    branding: z
      .object({
        logo: z.string().optional(),
        appName: z.string().optional(),
        tagline: z.string().optional(),
        background: z
          .object({
            image: z.string().optional(),
            color: z.string().optional(),
            position: z.string().optional(),
          })
          .strict()
          .optional(),
      })
      .strict()
      .optional(),
    oauthProviders: z.array(z.string().min(1)).optional(),
    passkey: z.boolean().optional(),
    redirects: z
      .object({
        afterLogin: z.string().optional(),
        afterRegister: z.string().optional(),
        forgotPassword: z.string().optional(),
        login: z.string().optional(),
        register: z.string().optional(),
      })
      .strict()
      .optional(),
    id: z.string().optional(),
  })
  .strict();
