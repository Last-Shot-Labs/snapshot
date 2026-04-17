'use client';

import { useCallback, useMemo } from "react";
import { useActionExecutor } from "../../../actions/executor";
import type { ActionConfig } from "../../../actions/types";
import { useResolveFrom, useSubscribe } from "../../../context/hooks";
import { renderIcon } from "../../../icons/render";
import { AutoEmptyState } from "../../_base/auto-empty-state";
import { AutoErrorState } from "../../_base/auto-error-state";
import { AutoSkeleton } from "../../_base/auto-skeleton";
import { ComponentWrapper } from "../../_base/component-wrapper";
import { SurfaceStyles } from "../../_base/surface-styles";
import { resolveSurfacePresentation } from "../../_base/style-surfaces";
import { ButtonControl } from "../../forms/button";
import { useDetailCard } from "./hook";
import type { DetailCardConfig } from "./schema";
import type { ResolvedField } from "./types";
import { resolveLookupValue, useLookupMaps } from "../_shared/lookups";

function FormattedFieldValue({
  rootId,
  field,
  fieldIndex,
  componentSlots,
}: {
  rootId: string;
  field: ResolvedField;
  fieldIndex: number;
  componentSlots?: DetailCardConfig["slots"];
}) {
  const { value, format } = field;
  const fieldSlots = field.slots;
  const emptyValueSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-field-empty-value-${fieldIndex}`,
    implementationBase: {
      color: "var(--sn-color-muted-foreground, #64748b)",
    },
    componentSurface: componentSlots?.emptyValue,
    itemSurface: fieldSlots?.emptyValue,
  });
  const booleanValueSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-field-boolean-value-${fieldIndex}`,
    implementationBase: {
      color: "var(--sn-color-muted-foreground, #94a3b8)",
      states: {
        active: {
          color: "var(--sn-color-success, #22c55e)",
        },
      },
    },
    componentSurface: componentSlots?.booleanValue,
    itemSurface: fieldSlots?.booleanValue,
    activeStates: value ? ["active"] : [],
  });
  const badgeValueSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-field-badge-value-${fieldIndex}`,
    implementationBase: {
      display: "inline-block",
      padding: "var(--sn-spacing-xs, 0.25rem) var(--sn-spacing-sm, 0.5rem)",
      borderRadius: "var(--sn-radius-full, 9999px)",
      bg: "var(--sn-color-secondary, #f1f5f9)",
      color: "var(--sn-color-secondary-foreground, #0f172a)",
      fontSize: "var(--sn-font-size-sm, 0.875rem)",
      fontWeight: "var(--sn-font-weight-medium, 500)",
    },
    componentSurface: componentSlots?.badgeValue,
    itemSurface: fieldSlots?.badgeValue,
  });
  const linkValueSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-field-link-value-${fieldIndex}`,
    implementationBase: {
      color: "var(--sn-color-primary, #3b82f6)",
    },
    componentSurface: componentSlots?.linkValue,
    itemSurface: fieldSlots?.linkValue,
  });
  const imageValueSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-field-image-value-${fieldIndex}`,
    implementationBase: {
      display: "block",
      width: "var(--sn-spacing-3xl, 3rem)",
      height: "var(--sn-spacing-3xl, 3rem)",
      borderRadius: "var(--sn-radius-full, 9999px)",
      style: {
        objectFit: "cover",
      },
    },
    componentSurface: componentSlots?.imageValue,
    itemSurface: fieldSlots?.imageValue,
  });

  let content: React.ReactNode = null;

  if (value != null) {
    switch (format) {
      case "boolean":
        content = (
          <span
            data-snapshot-id={`${rootId}-field-boolean-value-${fieldIndex}`}
            className={booleanValueSurface.className}
            style={booleanValueSurface.style}
          >
            {value ? "Yes" : "No"}
          </span>
        );
        break;

      case "date":
        content = (
          <span>{new Date(value as string | number).toLocaleDateString()}</span>
        );
        break;

      case "datetime":
        content = <span>{new Date(value as string | number).toLocaleString()}</span>;
        break;

      case "number":
        content = <span>{Number(value).toLocaleString()}</span>;
        break;

      case "currency": {
        const divisor = field.divisor;
        const adjusted = divisor && divisor !== 1 ? Number(value) / divisor : Number(value);
        content = (
          <span>
            {adjusted.toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
            })}
          </span>
        );
        break;
      }

      case "badge":
        content = (
          <span
            data-snapshot-id={`${rootId}-field-badge-value-${fieldIndex}`}
            className={badgeValueSurface.className}
            style={badgeValueSurface.style}
          >
            {String(value)}
          </span>
        );
        break;

      case "email":
        content = (
          <a
            href={`mailto:${String(value)}`}
            data-snapshot-id={`${rootId}-field-link-value-${fieldIndex}`}
            className={linkValueSurface.className}
            style={linkValueSurface.style}
          >
            {String(value)}
          </a>
        );
        break;

      case "url":
      case "link":
        content = (
          <a
            href={String(value)}
            target="_blank"
            rel="noopener noreferrer"
            data-snapshot-id={`${rootId}-field-link-value-${fieldIndex}`}
            className={linkValueSurface.className}
            style={linkValueSurface.style}
          >
            {String(value)}
          </a>
        );
        break;

      case "image":
        content = (
          <img
            src={String(value)}
            alt=""
            data-snapshot-id={`${rootId}-field-image-value-${fieldIndex}`}
            className={imageValueSurface.className}
            style={imageValueSurface.style}
          />
        );
        break;

      case "list":
        if (Array.isArray(value)) {
          content = <span>{value.join(", ")}</span>;
          break;
        }
        content = <span>{String(value)}</span>;
        break;

      case "text":
      default:
        if (Array.isArray(value)) {
          content = <span>{value.map((entry) => String(entry)).join(", ")}</span>;
          break;
        }
        content = <span>{String(value)}</span>;
        break;
    }
  }

  return (
    <>
      {value == null ? (
        <span
          data-snapshot-id={`${rootId}-field-empty-value-${fieldIndex}`}
          className={emptyValueSurface.className}
          style={emptyValueSurface.style}
        >
          --
        </span>
      ) : (
        content
      )}
      <SurfaceStyles css={emptyValueSurface.scopedCss} />
      <SurfaceStyles css={booleanValueSurface.scopedCss} />
      <SurfaceStyles css={badgeValueSurface.scopedCss} />
      <SurfaceStyles css={linkValueSurface.scopedCss} />
      <SurfaceStyles css={imageValueSurface.scopedCss} />
    </>
  );
}

async function copyToClipboard(value: unknown): Promise<void> {
  if (value != null && typeof navigator?.clipboard?.writeText === "function") {
    await navigator.clipboard.writeText(String(value));
  }
}

function DetailCardSkeleton({
  rootId,
  componentSlots,
}: {
  rootId: string;
  componentSlots?: DetailCardConfig["slots"];
}) {
  const skeletonSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-skeleton`,
    implementationBase: {
      border: "var(--sn-card-border, 1px solid #e2e8f0)",
      borderRadius: "lg",
      padding: "var(--sn-card-padding, var(--sn-spacing-lg, 1.5rem))",
      bg: "var(--sn-color-surface, #ffffff)",
    },
    componentSurface: componentSlots?.skeleton,
  });
  const skeletonRowSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-skeleton-row`,
    implementationBase: {
      display: "flex",
      gap: "md",
      style: {
        marginBottom: "var(--sn-spacing-sm, 0.5rem)",
      },
    },
    componentSurface: componentSlots?.skeletonRow,
  });
  const skeletonLabelSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-skeleton-label`,
    implementationBase: {
      width: "6rem",
      height: "1rem",
      borderRadius: "sm",
      bg: "var(--sn-color-muted, #e2e8f0)",
    },
    componentSurface: componentSlots?.skeletonLabel,
  });
  const skeletonValueSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-skeleton-value`,
    implementationBase: {
      flex: "1",
      height: "1rem",
      borderRadius: "sm",
      bg: "var(--sn-color-muted, #e2e8f0)",
    },
    componentSurface: componentSlots?.skeletonValue,
  });

  return (
    <div
      data-testid="detail-card-skeleton"
      data-snapshot-id={`${rootId}-skeleton`}
      className={skeletonSurface.className}
      style={skeletonSurface.style}
    >
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          data-snapshot-id={`${rootId}-skeleton-row-${n}`}
          className={skeletonRowSurface.className}
          style={skeletonRowSurface.style}
        >
          <div
            data-snapshot-id={`${rootId}-skeleton-label-${n}`}
            className={skeletonLabelSurface.className}
            style={skeletonLabelSurface.style}
          />
          <div
            data-snapshot-id={`${rootId}-skeleton-value-${n}`}
            className={skeletonValueSurface.className}
            style={skeletonValueSurface.style}
          />
        </div>
      ))}
      <SurfaceStyles css={skeletonSurface.scopedCss} />
      <SurfaceStyles css={skeletonRowSurface.scopedCss} />
      <SurfaceStyles css={skeletonLabelSurface.scopedCss} />
      <SurfaceStyles css={skeletonValueSurface.scopedCss} />
    </div>
  );
}

function FieldRow({
  rootId,
  field,
  fieldIndex,
  componentSlots,
}: {
  rootId: string;
  field: ResolvedField;
  fieldIndex: number;
  componentSlots?: DetailCardConfig["slots"];
}) {
  const fieldSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-field-${fieldIndex}`,
    implementationBase: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 10rem) minmax(0, 1fr)",
      alignItems: "start",
      style: {
        gap: "var(--sn-spacing-sm, 0.5rem) var(--sn-spacing-md, 1rem)",
      },
    },
    componentSurface: componentSlots?.field,
    itemSurface: field.slots?.field as Record<string, unknown> | undefined,
  });
  const labelSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-field-label-${fieldIndex}`,
    implementationBase: {
      color: "var(--sn-color-muted-foreground, #64748b)",
      fontSize: "var(--sn-font-size-sm, 0.875rem)",
      fontWeight: 500,
      style: { margin: 0 },
    },
    componentSurface: componentSlots?.fieldLabel,
    itemSurface: field.slots?.fieldLabel as Record<string, unknown> | undefined,
  });
  const valueSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-field-value-${fieldIndex}`,
    implementationBase: {
      color: "var(--sn-color-foreground, #0f172a)",
      fontSize: "var(--sn-font-size-sm, 0.875rem)",
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      style: {
        margin: 0,
        gap: "var(--sn-spacing-xs, 0.25rem)",
      },
    },
    componentSurface: componentSlots?.fieldValue,
    itemSurface: field.slots?.fieldValue as Record<string, unknown> | undefined,
  });
  const copyButtonSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-copy-button-${fieldIndex}`,
    implementationBase: {
      style: {
        minHeight: "1.5rem",
        padding: "0.125rem 0.375rem",
        fontSize: "var(--sn-font-size-xs, 0.75rem)",
      },
    },
    componentSurface: componentSlots?.copyButton,
    itemSurface: field.slots?.copyButton as Record<string, unknown> | undefined,
  });

  return (
    <div
      data-snapshot-id={`${rootId}-field-${fieldIndex}`}
      className={fieldSurface.className}
      style={fieldSurface.style}
    >
      <dt
        data-snapshot-id={`${rootId}-field-label-${fieldIndex}`}
        className={labelSurface.className}
        style={labelSurface.style}
      >
        {field.label}
      </dt>
      <dd
        data-snapshot-id={`${rootId}-field-value-${fieldIndex}`}
        className={valueSurface.className}
        style={valueSurface.style}
      >
        <FormattedFieldValue
          rootId={rootId}
          field={field}
          fieldIndex={fieldIndex}
          componentSlots={componentSlots}
        />
        {field.copyable ? (
          <ButtonControl
            surfaceId={`${rootId}-copy-button-${fieldIndex}`}
            surfaceConfig={copyButtonSurface.resolvedConfigForWrapper}
            variant="ghost"
            size="sm"
            testId={`copy-${field.field}`}
            onClick={() => void copyToClipboard(field.value)}
            ariaLabel={`Copy ${field.label}`}
          >
            Copy
          </ButtonControl>
        ) : null}
      </dd>
      <SurfaceStyles css={fieldSurface.scopedCss} />
      <SurfaceStyles css={labelSurface.scopedCss} />
      <SurfaceStyles css={valueSurface.scopedCss} />
      <SurfaceStyles css={copyButtonSurface.scopedCss} />
    </div>
  );
}

/** DetailCard — data-driven detail view that resolves fields from a record resource and renders them inside a configurable card surface with formatted values, copy-to-clipboard, and header actions. */
export function DetailCard({ config }: { config: DetailCardConfig }) {
  const { data, fields, title, isLoading, error } = useDetailCard(config);
  const execute = useActionExecutor();
  const emptyStateMessage = useSubscribe(config.emptyState) as string | undefined;
  const resolvedStaticConfig = useResolveFrom({
    actions: config.actions,
    empty: config.empty,
  });
  const rootId = config.id ?? "detail-card";
  const actions = useMemo(
    () =>
      ((resolvedStaticConfig.actions as DetailCardConfig["actions"] | undefined) ??
          config.actions ??
          []
      ).map((actionDef: NonNullable<DetailCardConfig["actions"]>[number]) => ({
        ...actionDef,
        label: typeof actionDef.label === "string" ? actionDef.label : "",
      })),
    [config.actions, resolvedStaticConfig.actions],
  );
  const resolvedEmptyConfig = (resolvedStaticConfig.empty ??
    config.empty) as DetailCardConfig["empty"];
  const lookupMaps = useLookupMaps(
    fields
      .filter((field) => field.lookup)
      .map((field) => ({
        key: field.field,
        lookup: field.lookup!,
      })),
  );
  const displayFields = fields.map((field) => ({
    ...field,
    value: resolveLookupValue(field.value, field.lookup, lookupMaps),
  }));

  const panelSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-panel`,
    implementationBase: {
      display: "flex",
      flexDirection: "column",
      gap: "md",
      border: "var(--sn-card-border, 1px solid #e2e8f0)",
      borderRadius: "lg",
      padding: "var(--sn-card-padding, var(--sn-spacing-lg, 1.5rem))",
      style: {
        boxShadow: "var(--sn-card-shadow, 0 1px 3px rgba(0,0,0,0.1))",
        backgroundColor: "var(--sn-color-surface, #ffffff)",
      },
    },
    componentSurface: config.slots?.panel,
  });
  const headerSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-header`,
    implementationBase: {
      display: "flex",
      justifyContent: "between",
      alignItems: "center",
      gap: "sm",
      style: {
        paddingBottom: "var(--sn-spacing-sm, 0.5rem)",
        borderBottom:
          "var(--sn-border-default, 1px) solid var(--sn-color-border, #e2e8f0)",
      },
    },
    componentSurface: config.slots?.header,
  });
  const titleSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-title`,
    implementationBase: {
      color: "var(--sn-color-foreground, #0f172a)",
      fontSize: "var(--sn-font-size-lg, 1.125rem)",
      fontWeight: 600,
      style: { margin: 0 },
    },
    componentSurface: config.slots?.title,
  });
  const actionsSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-actions`,
    implementationBase: {
      display: "flex",
      justifyContent: "end",
      flexWrap: "wrap",
      gap: "xs",
    },
    componentSurface: config.slots?.actions,
  });
  const fieldsSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-fields`,
    implementationBase: {
      display: "flex",
      flexDirection: "column",
      gap: "sm",
      style: { margin: 0 },
    },
    componentSurface: config.slots?.fields,
  });
  const loadingSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-loading`,
    componentSurface: config.slots?.loadingState,
  });
  const errorSurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-error`,
    componentSurface: config.slots?.errorState,
  });
  const emptySurface = resolveSurfacePresentation({
    surfaceId: `${rootId}-empty`,
    componentSurface: config.slots?.emptyState,
  });

  const handleAction = useCallback(
    (action: ActionConfig | ActionConfig[]) => {
      void execute(action, data ? { ...data } : {});
    },
    [data, execute],
  );

  return (
    <ComponentWrapper type="detail-card" id={config.id} config={config}>
      {isLoading ? (
        <div
          data-snapshot-id={`${rootId}-loading`}
          data-testid="detail-card-loading"
          className={loadingSurface.className}
          style={loadingSurface.style}
        >
          {config.loading && !config.loading.disabled ? (
            <AutoSkeleton componentType="card" config={config.loading} />
          ) : (
            <DetailCardSkeleton rootId={rootId} componentSlots={config.slots} />
          )}
        </div>
      ) : error ? (
        <div
          data-testid="detail-card-error"
          data-snapshot-id={`${rootId}-error`}
          className={errorSurface.className}
          style={errorSurface.style}
        >
          <AutoErrorState config={config.error ?? {}} />
        </div>
      ) : !data ? (
        <div
          data-testid="detail-card-empty"
          data-snapshot-id={`${rootId}-empty`}
          className={emptySurface.className}
          style={emptySurface.style}
        >
          <AutoEmptyState
            config={{
              ...(resolvedEmptyConfig ?? {}),
              title:
                (typeof resolvedEmptyConfig?.title === "string"
                  ? resolvedEmptyConfig.title
                  : undefined) ??
                emptyStateMessage ??
                "Select an item to view details",
            }}
          />
        </div>
      ) : (
        <div
          data-snapshot-id={`${rootId}-panel`}
          className={panelSurface.className}
          style={panelSurface.style}
        >
          {title || actions.length > 0 ? (
            <div
              data-snapshot-id={`${rootId}-header`}
              className={headerSurface.className}
              style={headerSurface.style}
            >
              {title ? (
                <h3
                  data-snapshot-id={`${rootId}-title`}
                  className={titleSurface.className}
                  style={titleSurface.style}
                >
                  {title}
                </h3>
              ) : <span />}
              {actions.length > 0 ? (
                <div
                  data-snapshot-id={`${rootId}-actions`}
                  className={actionsSurface.className}
                  style={actionsSurface.style}
                >
                  {actions.map(
                    (
                      actionDef: NonNullable<typeof actions>[number],
                      index: number,
                    ) => (
                    <ButtonControl
                      key={`${actionDef.label || "action"}-${index}`}
                      surfaceId={`${rootId}-action-button-${index}`}
                      surfaceConfig={config.slots?.actionButton}
                      itemSurfaceConfig={actionDef.slots?.actionButton}
                      variant="outline"
                      size="sm"
                      onClick={() => handleAction(actionDef.action)}
                    >
                      {actionDef.icon ? renderIcon(actionDef.icon, 16) : null}
                      <span>{actionDef.label}</span>
                    </ButtonControl>
                    ),
                  )}
                </div>
              ) : null}
            </div>
          ) : null}

          <dl
            data-snapshot-id={`${rootId}-fields`}
            className={fieldsSurface.className}
            style={fieldsSurface.style}
          >
            {displayFields.map((field, index) => (
              <FieldRow
                key={field.field}
                rootId={rootId}
                fieldIndex={index}
                field={field}
                componentSlots={config.slots}
              />
            ))}
          </dl>
        </div>
      )}
      <SurfaceStyles css={panelSurface.scopedCss} />
      <SurfaceStyles css={headerSurface.scopedCss} />
      <SurfaceStyles css={titleSurface.scopedCss} />
      <SurfaceStyles css={actionsSurface.scopedCss} />
      <SurfaceStyles css={fieldsSurface.scopedCss} />
      <SurfaceStyles css={loadingSurface.scopedCss} />
      <SurfaceStyles css={errorSurface.scopedCss} />
      <SurfaceStyles css={emptySurface.scopedCss} />
    </ComponentWrapper>
  );
}
