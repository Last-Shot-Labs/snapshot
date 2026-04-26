import { z } from "zod";
export declare const autoFormSlotNames: readonly ["root", "fieldGrid", "fieldCell", "section", "sectionHeader", "sectionToggle", "sectionTitle", "sectionDescription", "field", "label", "description", "inputWrapper", "input", "options", "option", "optionLabel", "helper", "error", "requiredIndicator", "inlineAction", "passwordToggle", "switchTrack", "switchThumb", "actions", "submitButton", "fields", "resetButton"];
export declare const autoFormFieldSlotNames: readonly ["field", "fieldCell", "label", "description", "inputWrapper", "input", "options", "option", "optionLabel", "helper", "error", "requiredIndicator", "inlineAction", "passwordToggle", "switchTrack", "switchThumb"];
export declare const fieldValidationSchema: z.ZodObject<{
    required: z.ZodOptional<z.ZodBoolean>;
    minLength: z.ZodOptional<z.ZodNumber>;
    maxLength: z.ZodOptional<z.ZodNumber>;
    min: z.ZodOptional<z.ZodNumber>;
    max: z.ZodOptional<z.ZodNumber>;
    pattern: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        value: z.ZodString;
        message: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        value: string;
        message?: string | undefined;
    }, {
        value: string;
        message?: string | undefined;
    }>]>>;
    equals: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    message?: string | undefined;
    required?: boolean | undefined;
    min?: number | undefined;
    max?: number | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    pattern?: string | {
        value: string;
        message?: string | undefined;
    } | undefined;
    equals?: string | undefined;
}, {
    message?: string | undefined;
    required?: boolean | undefined;
    min?: number | undefined;
    max?: number | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    pattern?: string | {
        value: string;
        message?: string | undefined;
    } | undefined;
    equals?: string | undefined;
}>;
/**
 * Schema for an individual field configuration.
 */
export declare const fieldConfigSchema: z.ZodObject<{
    /** Field name — maps to the key in the submitted values object. */
    name: z.ZodString;
    /** Input type to render. */
    type: z.ZodEnum<["text", "email", "password", "number", "textarea", "select", "multi-select", "checkbox", "date", "file", "time", "datetime", "radio-group", "switch", "slider", "color", "combobox", "tag-input"]>;
    /** Human-readable label. Defaults to the field name. */
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    /** Placeholder text for text-like inputs. */
    placeholder: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    /** Whether the field is required. */
    required: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any]>>;
    /** Client-side validation rules. */
    validation: z.ZodOptional<z.ZodObject<{
        required: z.ZodOptional<z.ZodBoolean>;
        minLength: z.ZodOptional<z.ZodNumber>;
        maxLength: z.ZodOptional<z.ZodNumber>;
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        pattern: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            value: z.ZodString;
            message: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            value: string;
            message?: string | undefined;
        }, {
            value: string;
            message?: string | undefined;
        }>]>>;
        equals: z.ZodOptional<z.ZodString>;
        message: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        message?: string | undefined;
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        pattern?: string | {
            value: string;
            message?: string | undefined;
        } | undefined;
        equals?: string | undefined;
    }, {
        message?: string | undefined;
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        pattern?: string | {
            value: string;
            message?: string | undefined;
        } | undefined;
        equals?: string | undefined;
    }>>;
    /** Canonical validation alias. */
    validate: z.ZodOptional<z.ZodObject<{
        required: z.ZodOptional<z.ZodBoolean>;
        minLength: z.ZodOptional<z.ZodNumber>;
        maxLength: z.ZodOptional<z.ZodNumber>;
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        pattern: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            value: z.ZodString;
            message: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            value: string;
            message?: string | undefined;
        }, {
            value: string;
            message?: string | undefined;
        }>]>>;
        equals: z.ZodOptional<z.ZodString>;
        message: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        message?: string | undefined;
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        pattern?: string | {
            value: string;
            message?: string | undefined;
        } | undefined;
        equals?: string | undefined;
    }, {
        message?: string | undefined;
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        pattern?: string | {
            value: string;
            message?: string | undefined;
        } | undefined;
        equals?: string | undefined;
    }>>;
    /** Options for select fields. Array of {label, value} or a string endpoint. */
    options: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{
        label: z.ZodUnion<[z.ZodString, any]>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        label?: unknown;
        value?: unknown;
    }, {
        [x: string]: any;
        label?: unknown;
        value?: unknown;
    }>, "many">, any]>>;
    /** Field to use as the option label when options come from an endpoint. */
    labelField: z.ZodOptional<z.ZodString>;
    /** Field to use as the option value when options come from an endpoint. */
    valueField: z.ZodOptional<z.ZodString>;
    /** Default value for the field. */
    default: z.ZodOptional<z.ZodUnknown>;
    /** Divide incoming/submitted numeric values by this factor for display/editing. */
    divisor: z.ZodOptional<z.ZodNumber>;
    /** Whether the field is disabled. */
    disabled: z.ZodOptional<z.ZodBoolean>;
    /** Helper text shown below the field. */
    helperText: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    description: z.ZodOptional<z.ZodUnion<[z.ZodString, any]>>;
    /** Column span in a multi-column layout (1-12). Default: full width. */
    span: z.ZodOptional<z.ZodNumber>;
    /** Conditional visibility — show this field only when condition is met. */
    dependsOn: z.ZodOptional<z.ZodObject<{
        /** Name of the field to watch. */
        field: z.ZodString;
        /** Show this field when the watched field equals this value. */
        value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        /** Show this field when the watched field is NOT equal to this value. */
        notValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        /** Show this field when the watched field is truthy (non-empty). */
        filled: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        field: string;
        value?: string | number | boolean | undefined;
        filled?: boolean | undefined;
        notValue?: string | number | boolean | undefined;
    }, {
        field: string;
        value?: string | number | boolean | undefined;
        filled?: boolean | undefined;
        notValue?: string | number | boolean | undefined;
    }>>;
    /** Static visibility toggle. */
    visible: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, any]>>;
    autoComplete: z.ZodOptional<z.ZodString>;
    visibleWhen: z.ZodOptional<z.ZodString>;
    inlineAction: z.ZodOptional<z.ZodObject<{
        label: z.ZodUnion<[z.ZodString, any]>;
        to: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        [x: string]: any;
        label?: unknown;
        to?: unknown;
    }, {
        [x: string]: any;
        label?: unknown;
        to?: unknown;
    }>>;
    readOnly: z.ZodOptional<z.ZodBoolean>;
    slots: z.ZodOptional<z.ZodObject<Record<"input" | "options" | "error" | "label" | "description" | "option" | "requiredIndicator" | "field" | "helper" | "fieldCell" | "inputWrapper" | "optionLabel" | "inlineAction" | "passwordToggle" | "switchTrack" | "switchThumb", z.ZodOptional<z.ZodObject<{
        [x: string]: any;
    } & {
        states: z.ZodOptional<z.ZodRecord<any, z.ZodObject<{
            [x: string]: z.ZodOptional<any>;
        }, "strict", z.ZodTypeAny, {
            [x: string]: any;
        }, {
            [x: string]: any;
        }>>>;
    }, "strict", z.ZodTypeAny, {
        [x: string]: any;
        states?: unknown;
    }, {
        [x: string]: any;
        states?: unknown;
    }>>>, "strict", z.ZodTypeAny, {
        input?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        options?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        error?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        label?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        description?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        option?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        requiredIndicator?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        field?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        helper?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        fieldCell?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        inputWrapper?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        optionLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        inlineAction?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        passwordToggle?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        switchTrack?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        switchThumb?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }, {
        input?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        options?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        error?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        label?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        description?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        option?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        requiredIndicator?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        field?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        helper?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        fieldCell?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        inputWrapper?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        optionLabel?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        inlineAction?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        passwordToggle?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        switchTrack?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
        switchThumb?: {
            [x: string]: any;
            states?: unknown;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    [x: string]: any;
    name?: unknown;
    type?: unknown;
    label?: unknown;
    placeholder?: unknown;
    required?: unknown;
    validation?: unknown;
    validate?: unknown;
    options?: unknown;
    labelField?: unknown;
    valueField?: unknown;
    default?: unknown;
    divisor?: unknown;
    disabled?: unknown;
    helperText?: unknown;
    description?: unknown;
    span?: unknown;
    dependsOn?: unknown;
    visible?: unknown;
    autoComplete?: unknown;
    visibleWhen?: unknown;
    inlineAction?: unknown;
    readOnly?: unknown;
    slots?: unknown;
}, {
    [x: string]: any;
    name?: unknown;
    type?: unknown;
    label?: unknown;
    placeholder?: unknown;
    required?: unknown;
    validation?: unknown;
    validate?: unknown;
    options?: unknown;
    labelField?: unknown;
    valueField?: unknown;
    default?: unknown;
    divisor?: unknown;
    disabled?: unknown;
    helperText?: unknown;
    description?: unknown;
    span?: unknown;
    dependsOn?: unknown;
    visible?: unknown;
    autoComplete?: unknown;
    visibleWhen?: unknown;
    inlineAction?: unknown;
    readOnly?: unknown;
    slots?: unknown;
}>;
/**
 * Schema for a field section/group with a heading.
 */
export declare const fieldSectionSchema: z.ZodType<Record<string, any>>;
/**
 * Zod schema for the AutoForm component config.
 *
 * Defines a config-driven form that auto-generates fields from config
 * or OpenAPI schema. Supports validation, submission, action chaining,
 * multi-column layout, conditional field visibility, and field grouping.
 *
 * @example
 * ```json
 * {
 *   "type": "form",
 *   "submit": "/api/users",
 *   "method": "POST",
 *   "columns": 2,
 *   "fields": [
 *     { "name": "firstName", "type": "text", "required": true, "span": 1 },
 *     { "name": "lastName", "type": "text", "required": true, "span": 1 },
 *     { "name": "email", "type": "email", "required": true },
 *     { "name": "role", "type": "select", "options": [
 *       { "label": "Admin", "value": "admin" },
 *       { "label": "User", "value": "user" }
 *     ]},
 *     { "name": "notes", "type": "textarea", "dependsOn": { "field": "role", "value": "admin" } }
 *   ],
 *   "submitLabel": "Create User",
 *   "onSuccess": { "type": "toast", "message": "User created!", "variant": "success" }
 * }
 * ```
 */
export declare const autoFormConfigSchema: z.ZodType<Record<string, any>>;
