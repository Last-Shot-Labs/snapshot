import { z } from "zod";
import { actionSchema } from "../../../actions/types";
import { fromRefSchema } from "../../_base/types";
import { workflowDefinitionSchema } from "../../../workflows/schema";

const footerVariantSchema = z.enum([
  "default",
  "secondary",
  "destructive",
  "ghost",
]);

/**
 * Overlay alias schema for manifest-driven confirmation dialogs.
 */
export const confirmDialogConfigSchema = z
  .object({
    type: z.literal("confirm-dialog"),
    id: z.string().optional(),
    title: z.union([z.string(), fromRefSchema]).optional(),
    description: z.union([z.string(), fromRefSchema]).optional(),
    size: z.enum(["sm", "md", "lg", "xl", "full"]).optional(),
    confirmLabel: z.string().default("Confirm"),
    cancelLabel: z.string().default("Cancel"),
    confirmVariant: footerVariantSchema.default("default"),
    cancelVariant: footerVariantSchema.default("secondary"),
    confirmAction: z.union([actionSchema, z.array(actionSchema)]).optional(),
    cancelAction: z.union([actionSchema, z.array(actionSchema)]).optional(),
    dismissOnConfirm: z.boolean().default(true),
    dismissOnCancel: z.boolean().default(true),
    onOpen: z.union([z.string().min(1), workflowDefinitionSchema]).optional(),
    onClose: z.union([z.string().min(1), workflowDefinitionSchema]).optional(),
    urlParam: z.string().optional(),
    trapFocus: z.boolean().default(true),
    initialFocus: z.string().optional(),
    returnFocus: z.boolean().default(true),
    className: z.string().optional(),
    style: z.record(z.union([z.string(), z.number()])).optional(),
  })
  .strict();
