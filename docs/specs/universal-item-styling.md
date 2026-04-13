# Universal Declarative Styling

> **Status**
>
> | Phase | Title | Status | Track |
> |---|---|---|---|
> | 1 | Canonical Styleable Element Contract | Not started | Foundation |
> | 2 | Shared Slots, States, and Merge Runtime | Not started | Foundation |
> | 3 | Navigation + Composable Nav Cutover | Not started | Navigation |
> | 4 | Overlay + Menu Surfaces | Not started | Overlay |
> | 5 | Data Display Surfaces | Not started | Data |
> | 6 | Forms + Field Surfaces | Not started | Forms |
> | 7 | Remove Obsolete Visual APIs | Not started | Cleanup |
> | 8 | Docs + Playground + Dogfood | Not started | Docs |
>
> **Priority:** P0
>
> **Product bar:** A manifest author must be able to build sophisticated, production-grade UI
> entirely through declarations. Primitive elements are the source of truth. Grouping components
> are syntactic sugar and must remain fully customizable through the same declarative contract.

---

## Purpose

This spec defines the canonical styling system for Snapshot.

The system must satisfy five requirements:

1. **Primitive-first**. Every visible render surface is a styleable element.
2. **Declarative-only**. Consumers customize UI from manifest declarations, not bespoke code.
3. **Universal**. Grouped/collection components use the same styling contract as primitives.
4. **Composable**. Grouping components are sugar over styleable surfaces, not a separate styling model.
5. **Single-path**. Tokens + universal style props + `className`/`style` are the only styling path.
6. **Primitive-backed**. Grouping components must compose shared UI primitives; they must not roll
   private copies of primitive UI behavior.

This is not a nav-only feature. Nav is the first forcing function, but the architecture must serve
every collection and every grouped primitive.

---

## Zero-Context Execution Standard

This spec must be sufficient for an engineer or agent with no prior repo context to execute the
work correctly.

That means the spec must provide:

1. the system model
2. the repository facts that matter
3. the canonical schema/runtime shapes
4. the exact files likely to change
5. the sequencing constraints
6. the acceptance criteria
7. the explicit anti-patterns to avoid

If an implementation decision is important enough to affect API shape, merge order, or declarative
power, it must be written here.

### Agent Success Criteria

A zero-context agent should be able to read only:

- this spec
- referenced source files named in this spec

and then:

- implement the canonical schema fragments
- wire them through manifest and runtime paths
- upgrade target components consistently
- remove obsolete APIs
- add tests that verify the canonical contract

without inventing alternate patterns.

### Agent Non-Goals

A zero-context agent must not:

- invent new component-specific visual fields when canonical `slots` can express the need
- preserve obsolete APIs for hypothetical external compatibility
- treat grouped surfaces as `className`/`style` only
- upgrade grouped nav without upgrading composable nav primitives
- translate styling intent into bespoke per-component visual CSS variables

---

## Repository Facts

These are repo facts the implementer must know.

### Styling primitives that already exist

The repo already has a universal style vocabulary for top-level components.

Important source files:

- `src/ui/components/_base/schema.ts`
- `src/ui/manifest/schema.ts`
- `src/ui/components/_base/component-wrapper.tsx`

Important current facts:

1. `extendedBaseComponentSchema` in `_base/schema.ts` already contains the universal style props.
2. `baseComponentConfigSchema` in `manifest/schema.ts` mirrors that contract for manifest-level
   component config.
3. `ComponentWrapper` already resolves universal style props, interactive CSS, and responsive CSS
   for top-level components.

System consequence:

- the grouped-surface contract must reuse this vocabulary instead of creating a smaller styling API

### Nav currently has two parallel authoring paths

Grouped path:

- `manifest.navigation.items`
- `src/ui/components/layout/nav/*`

Composable path:

- `manifest.navigation.template`
- `src/ui/components/layout/nav-link/*`
- `src/ui/components/layout/nav-dropdown/*`
- `src/ui/components/layout/nav-section/*`
- `src/ui/components/layout/nav-user-menu/*`

System consequence:

- any “universal styling” implementation that upgrades only one path is incomplete

### The live nav assembly path is not only in `manifest/compiler.ts`

Important files:

- `src/ui/manifest/app.tsx`
- `src/ui/entity-pages/AppShellWrapper.tsx`
- `src/ui/manifest/compiler.ts`

Current fact:

- `manifest/app.tsx` assembles the `Nav` config used by the main app shell
- `AppShellWrapper.tsx` renders `Nav` directly for entity-page shells
- `compiler.ts` passes navigation through, but is not the only place shaping live nav behavior

System consequence:

- a zero-context implementation must update the real runtime handoff points, not assume compiler
  changes alone are sufficient

### Floating menu primitives are shared infrastructure

Important files:

- `src/ui/components/primitives/floating-menu/component.tsx`
- `src/ui/components/primitives/floating-menu/index.ts`

Current fact:

- overlay and nav dropdown behavior already depend on these shared menu primitives

System consequence:

- menu labels, items, separators, and panels should converge here rather than diverging across
  overlay/nav implementations

Current repository warning:

- `dropdown-menu` already composes these primitives
- `nav-dropdown` and `nav-user-menu` currently still roll their own positioned menus
- `layout/nav/component.tsx` still contains bespoke hover/menu rendering behavior

Implementation consequence:

- Phase 3 and Phase 4 must converge those paths on shared primitives rather than merely adding
  styling hooks to bespoke implementations

### Pre-prod cutover rule

Current product fact:

- no external consumers require compatibility support

System consequence:

- internal manifests, tests, docs, and examples may be updated in the same change
- obsolete visual APIs should be removed, not soft-deprecated indefinitely

---

## Primitive Inventory and Current Audit

This section records the current primitive layer and the architectural gaps that must be closed.

### A. Existing reusable primitives or primitive-like building blocks

These already exist and should be treated as first-class building blocks in the universal system.

#### Clear primitives

- `src/ui/components/forms/button/component.tsx`
  - `ButtonControl`
  - config-driven `Button`
- `src/ui/components/primitives/floating-menu/component.tsx`
  - `FloatingPanel`
  - `MenuItem`
  - `MenuSeparator`
  - `MenuLabel`
  - `FloatingMenuStyles`
- `src/ui/components/primitives/link/component.tsx`
  - `Link`
- `src/ui/components/primitives/text/component.tsx`
  - `Text`
- `src/ui/components/primitives/stack/component.tsx`
  - `Stack`
- `src/ui/components/primitives/divider/component.tsx`
  - `Divider`

#### Primitive-like shared infrastructure that should be elevated or normalized

- `src/ui/components/_base/button-styles.ts`
  - shared button styling contract
  - currently used as a helper, not always via `ButtonControl`
- `src/ui/components/_base/context-menu-portal.tsx`
  - shared context-menu behavior and rendering
  - currently lives under `_base` instead of an explicit primitive namespace
- `src/ui/components/layout/collapsible/component.tsx`
  - reusable disclosure/show-hide behavior
  - likely a primitive candidate for accordion-like surfaces

### B. Current good examples

These follow the intended direction and should be used as reference implementations.

- `overlay/dropdown-menu`
  - already composes `FloatingPanel`, `MenuItem`, `MenuSeparator`, and `MenuLabel`
- `overlay/context-menu`
  - already delegates portal/menu behavior to `ContextMenuPortal`
- root component styling system
  - `extendedBaseComponentSchema`
  - `baseComponentConfigSchema`
  - `ComponentWrapper`

### C. Current violations: grouped components rolling their own behavior

These components currently violate the desired primitive-backed standard.

#### Menu / floating behavior duplication

- `layout/nav-dropdown/component.tsx`
  - owns positioned menu panel implementation
  - owns hover-open behavior
  - does not compose shared floating/menu primitives
- `layout/nav-user-menu/component.tsx`
  - owns positioned menu panel implementation
  - does not compose shared floating/menu primitives
- `layout/nav/component.tsx`
  - still owns bespoke hover/current visual behavior for nav items
  - still owns local dropdown-item rendering instead of converging on shared menu item primitives
- `overlay/popover/component.tsx`
  - owns outside-click handling
  - owns escape handling
  - owns floating positioning and animation locally instead of converging on shared floating
    primitives

#### Button / trigger duplication

- `overlay/dropdown-menu/component.tsx`
  - uses local trigger button implementation rather than composing `ButtonControl`
- `overlay/popover/component.tsx`
  - uses local trigger button implementation rather than composing `ButtonControl`
- `layout/nav-link/component.tsx`
  - uses local button-like rendering instead of composing a shared nav/link/button primitive
- `layout/nav-search/component.tsx`
  - owns local input shell and shortcut treatment
- many grouped components render raw `<button>` triggers with local styling instead of a shared
  trigger/button primitive

#### Disclosure / item-shell duplication

- `navigation/accordion/component.tsx`
  - owns disclosure trigger/content behavior locally
- `navigation/tabs/component.tsx`
  - owns tab trigger/panel shell behavior locally
- `navigation/stepper/component.tsx`
  - owns step trigger/item shell behavior locally
- `navigation/tree-view/component.tsx`
  - owns recursive row shell, selection shell, connector shell, and disclosure shell locally
- `navigation/breadcrumb/component.tsx`
  - owns link hover behavior imperatively via `onMouseEnter` / `onMouseLeave`
- `layout/split-pane/component.tsx`
  - mutates DOM style directly on hover for the resize handle

### D. Missing or under-specified primitives

These primitives are either missing or not yet enforced as first-class reusable building blocks.

1. **Floating content primitive family**
   - should unify popover, dropdown, nav-dropdown, nav-user-menu, and any menu-like overlay
2. **Menu surface primitive family**
   - should unify menu panel, menu item, menu separator, menu label, keyboard behavior
3. **Trigger/button primitive family**
   - grouped components should compose `ButtonControl` or a stricter trigger primitive, not just
     borrow button CSS helpers
4. **Disclosure primitive family**
   - should unify collapsible behavior, accordion trigger/content, tree expansion, and similar
     show/hide shells where practical
5. **Interactive item-shell primitive**
   - a reusable shell for selectable/current/disabled item rows would reduce repeated bespoke item
     rendering across nav, list-like surfaces, tree-view, tabs, and stepper

### E. Audit conclusion

Current state is **not yet universal and not yet fully primitive-backed**.

The biggest structural gaps are:

- shared primitives exist but are not mandatory
- some reusable behavior lives in `_base` helpers rather than explicit primitive contracts
- grouped components still hide or bypass primitive capability
- recursive grouped structures exist, but recursive declarative exposure is not yet codified

This spec closes those gaps by making primitive reuse and recursive declarative exposure mandatory.

---

## Primitive Convergence Plan

This is the repository-wide convergence plan for grouped components.

Each grouped component or grouped behavior must end in one of three states:

- **Reuse existing**: compose an existing primitive family directly
- **Extract primitive**: extract a missing primitive first, then compose it
- **Rewrite to compose**: replace a bespoke grouped implementation with primitive composition

### Convergence table

| Area | Component(s) | Current state | Target primitive family | Action |
|---|---|---|---|---|
| Nav menus | `layout/nav`, `layout/nav-dropdown`, `layout/nav-user-menu` | bespoke floating/menu behavior | `FloatingPanel` + `MenuItem` / `MenuSeparator` / `MenuLabel` | Rewrite to compose |
| Overlay menus | `overlay/dropdown-menu` | already primitive-backed | `FloatingPanel` + menu primitives | Reuse existing |
| Context menu | `overlay/context-menu`, `_base/context-menu-portal` | shared but not explicit primitive family | menu/floating primitive family | Extract or normalize primitive |
| Popover | `overlay/popover` | bespoke floating behavior | `FloatingPanel`-family plus trigger primitive | Rewrite to compose |
| Hover card | `overlay/hover-card` | likely bespoke floating behavior | `FloatingPanel`-family plus hover trigger primitive | Rewrite to compose |
| Command palette | `overlay/command-palette` | bespoke list/menu/search behavior | menu surface + input/search primitive families | Extract primitive(s) then compose |
| Nav links | `layout/nav-link`, `navigation/prefetch-link`, `primitives/link` | split across multiple link shells | link/navigation-link primitive family | Extract or normalize primitive |
| Button-like triggers | dropdown trigger, popover trigger, action triggers across grouped components | inconsistent use of button primitive | `ButtonControl` or stricter trigger primitive | Rewrite to compose |
| Disclosure | `layout/collapsible`, `navigation/accordion`, tree expansion shells | split behavior | disclosure/collapsible primitive family | Extract or normalize primitive |
| Tabs | `navigation/tabs` | bespoke trigger/panel shell | tabs primitive family or shared trigger/panel shell | Extract primitive |
| Stepper | `navigation/stepper` | bespoke item-shell and progress rendering | interactive item-shell + connector primitive family | Extract primitive(s) |
| Tree view | `navigation/tree-view` | bespoke recursive row/disclosure shell | disclosure + interactive item-shell primitive family | Extract primitive(s) |
| Breadcrumb | `navigation/breadcrumb` | bespoke link hover shell | link/navigation-link primitive family + separator primitive | Rewrite to compose |
| Toggle group | `forms/toggle-group` | bespoke segmented-control shell | toggle/segmented-control primitive family | Extract primitive |
| Auto form fields | `forms/auto-form` | grouped but mostly local field shells | field-shell/input/label/helper/error primitive family | Extract or normalize primitive |
| Wizard | `forms/wizard` | grouped step + field orchestration | stepper/disclosure + field primitive families | Rewrite to compose |
| Data list | `data/list` | bespoke interactive item row shell | interactive item-shell + badge/icon primitives | Extract primitive(s) |
| Data table | `data/data-table` | bespoke table cell/row/action shells | table surface primitives + button primitive + context menu primitive | Extract primitive(s) |
| Timeline | `content/timeline` | grouped rich item shell | interactive item-shell + divider/connector primitive family | Extract primitive(s) |
| Kanban | `workflow/kanban` | grouped board/column/card interactions | interactive item-shell + drag/drop board primitive family | Extract primitive(s) |
| Carousel | `media/carousel` | grouped viewport/slide/indicator behavior | carousel primitive family | Extract primitive |

### Interpretation rules

1. `Reuse existing` means the component should not keep its current private implementation if the
   primitive already covers the behavior.
2. `Extract primitive` means implementation must not add styling hooks to the bespoke version and
   stop there; extraction is part of the required work.
3. `Rewrite to compose` means the grouped component should become orchestration plus slot/default
   forwarding on top of primitives.

### Primitive families to formalize

These are the primitive families the repo should converge on.

1. **Button / Trigger**
   - basis: `ButtonControl`, `_base/button-styles.ts`
   - target: all grouped action/trigger buttons compose this family
2. **Link / Navigation Link**
   - basis: `primitives/link`, `navigation/prefetch-link`
   - target: one canonical link family for standard links, navigational links, and prefetch-capable links
3. **Floating Surface**
   - basis: `FloatingPanel`
   - target: dropdowns, popovers, hover cards, user menus, floating nav panels
4. **Menu Surface**
   - basis: `MenuItem`, `MenuSeparator`, `MenuLabel`
   - target: all menu-like grouped UIs
5. **Disclosure**
   - basis: `layout/collapsible`
   - target: accordion/tree/show-hide shells
6. **Interactive Item Shell**
   - basis: none yet canonical
   - target: selectable/current/disabled repeated rows across nav, list, tree, stepper
7. **Field Shell**
   - basis: none yet canonical
   - target: label/input/helper/error wrappers across forms
8. **Table Surface**
   - basis: none yet canonical
   - target: header cell / row / cell / action cell shells
9. **Progress / Connector**
   - basis: none yet canonical
   - target: stepper connectors, timeline connectors, related progress shells

### Migration order

The order matters. Primitive extraction must precede broad grouped rewrites.

#### Wave 1: Existing primitive convergence

1. standardize floating/menu primitives as the mandatory menu/floating family
2. standardize button/trigger primitive usage around `ButtonControl`
3. standardize link/navigation-link primitive usage

Deliverables:

- nav dropdowns converge on shared floating/menu primitives
- popover and hover-card stop owning bespoke floating mechanics
- grouped triggers stop using local ad hoc button shells where a button primitive fits

#### Wave 2: Disclosure and item-shell extraction

1. formalize disclosure primitive family from `layout/collapsible`
2. extract canonical interactive item-shell primitive

Deliverables:

- accordion/tree/nav/list/stepper converge on shared item-shell/disclosure patterns

#### Wave 3: Form and table surface extraction

1. extract field-shell primitive family
2. extract table surface primitive family

Deliverables:

- auto-form and wizard become orchestration over field primitives
- data-table stops hand-owning every cell/row shell

#### Wave 4: Advanced grouped systems

1. timeline
2. kanban
3. carousel
4. command palette

Deliverables:

- advanced grouped systems compose primitive families instead of becoming isolated islands

### Exit condition for convergence

A grouped component is considered converged only when all of the following are true:

1. It does not privately re-implement an existing primitive behavior.
2. It exposes configuration declaratively for the primitives it composes.
3. Its visible surfaces participate in canonical `slots` / `states`.
4. Its primitive/composable equivalent path is not weaker in styling or configurability.

---

## Audit of the Prior Draft

The previous draft moved in the right direction but was not yet foundational enough for the product
bar required here.

### 1. It was still component-specific

The previous draft introduced per-component fields such as:

- `itemClassName`
- `activeItemClassName`
- `dropdownItemClassName`
- `activeDropdownItemClassName`
- `headerClassName`
- `cellClassName`

That approach does not scale. It creates a new surface-specific API every time a component gains a
new visible element. It is schema growth by enumeration rather than a system.

### 2. It made grouped elements second-class

The prior draft only added `className` and `style` to item schemas. Snapshot already has a richer
declarative style vocabulary at the component root:

- spacing
- typography
- color
- radius
- shadow
- background
- hover/focus/active
- responsive values

If grouped elements only get `className` and `style`, they remain less capable than primitives.
That violates the product requirement.

### 3. It treated grouping as a custom API rather than syntactic sugar

The product requirement is:

> I should be able to use primitives in a manifest and fully customize them. Anything grouping
> them should be syntactical sugar and should still be customizable via declarations.

The previous draft added collection-specific fields instead of defining a canonical slot/state
model that any grouping component can forward to its rendered surfaces.

### 4. It under-specified composable nav

The repository already has two nav paths:

- grouped nav via `navigation.items`
- composable nav via `navigation.template` and `nav-link` / `nav-dropdown` / `nav-section` /
  `nav-user-menu`

Any universal styling system that upgrades only grouped nav is incomplete.

### 5. It mixed clean-cutover language with compatibility language

This repo is pre-prod with no external consumers. We should not design around hypothetical backward
compatibility. Dogfood manifests, tests, and examples may change in the same cutover.

### 6. It did not define a universal merge contract

The prior draft specified merge behavior for a few nav fields, but not a single merge algorithm
that works for all:

- primitives
- grouped items
- grouped item sub-elements
- stateful surfaces

Without one merge contract, the system will fragment by component.

---

## Canonical System Model

Snapshot UI is composed of **styleable elements**.

Every rendered component, item, and sub-element must fit this model:

1. A component renders one or more **named slots**.
2. Each slot renders a visible **element**.
3. Each element may be styled in the default state and in named runtime states.
4. Grouping components apply defaults to slots, but individual items may override them.
5. Primitive components and grouped components use the same element styling contract.
6. Grouping components compose shared UI-library primitives wherever the behavior already exists.

### Terminology

- **Primitive**: a directly rendered component or element surface with its own styling contract.
- **Grouping component**: a component that renders repeated or nested primitives/surfaces.
- **Slot**: a named visible surface rendered by a component or item.
- **State**: a runtime condition that changes styling, such as `active`, `disabled`, `open`, or `selected`.
- **Surface**: shorthand for a visible slot instance.

### Examples

#### Primitive

A button has one main visible slot:

- `root`

A more complex primitive may expose:

- `root`
- `icon`
- `label`

#### Grouping component

A nav may expose:

- `root`
- `brand`
- `list`
- `item`
- `itemLabel`
- `itemIcon`
- `itemBadge`
- `dropdown`
- `dropdownItem`
- `dropdownItemLabel`
- `dropdownItemIcon`
- `userMenu`
- `userMenuItem`

A data table may expose:

- `root`
- `headerRow`
- `headerCell`
- `row`
- `cell`
- `emptyState`
- `toolbar`
- `bulkActions`

The architecture must not require a custom schema invention for each of these surfaces.

---

## Canonical Declarative Contract

### Rule 1: Every visible surface is styleable

Every visible render surface must support the same declarative styling contract as a primitive
component root.

That contract includes:

- `className`
- `style`
- universal style props already supported by `extendedBaseComponentSchema`
- interactive style props where relevant (`hover`, `focus`, `active`)

This is the most important system rule in the spec.

### Rule 2: Grouping components do not get bespoke visual APIs

Canonical grouped customization must not rely on fields like:

- `itemClassName`
- `activeItemClassName`
- `tabClassName`
- `panelClassName`
- `headerClassName`

Those are convenience aliases at best. They are not the canonical API.

The canonical API is:

- slot defaults
- slot state defaults
- per-item slot overrides
- per-item slot state overrides

### Rule 3: Grouping is syntactic sugar over styleable slots

If a grouped component renders an item and that item renders a label, icon, and badge, each of
those surfaces must be addressable declaratively.

A grouping component may provide convenience defaults, but it may not hide the underlying surfaces.

### Rule 3a: Grouping components must compose UI-library primitives

Grouping components are not allowed to privately re-implement primitive UI patterns that already
exist in the repository.

Examples:

- menus and floating panels must use shared menu/floating primitives
- shared menu item rendering must not be duplicated per grouped component
- shared dismiss, positioning, and keyboard behavior must not be re-implemented ad hoc

If the needed primitive does not exist yet, the correct implementation sequence is:

1. extract or create the primitive in the UI library
2. define its canonical slot contract
3. compose it from grouped components

Not allowed:

- bespoke absolute-positioned dropdowns inside grouped components
- private menu item renderers where a shared menu primitive already exists
- duplicate hover/focus/current behavior logic scattered across grouped components

### Rule 4: The same styling vocabulary applies everywhere

If a primitive root supports:

- `padding`
- `bg`
- `borderRadius`
- `fontSize`
- `hover`
- `focus`
- `active`
- responsive values

then an item root or item sub-element must be able to use the same vocabulary.

No second-class item API.

### Rule 5: Implementation keeps structural styles, not visual policy

Components may keep structural requirements in code:

- layout mechanics
- positioning
- containment
- truncation
- necessary reset styles

But visual policy must be declarative:

- colors
- spacing intent
- radius
- weight
- hover treatment
- selected/current/active appearance
- per-item differentiation

### Rule 6: Shared behavioral primitives own behavior

When a shared primitive exists for behavior, grouped components must delegate behavior to that
primitive rather than reproducing it locally.

Examples of behavior owned by primitives:

- floating positioning
- outside-click dismissal
- escape-to-close
- menu keyboard semantics
- shared menu item rendering
- shared trigger interaction patterns

This rule exists to prevent grouped components from turning into private UI frameworks.

---

## Schema Standard

This spec standardizes on three schema building blocks:

1. **styleable element schema**
2. **slot map schema**
3. **state map schema**

### 1. Styleable Element Schema

This is the canonical styling fragment for any visible surface.

It must reuse the existing universal style prop vocabulary from `_base/schema.ts`.

Proposed export from `src/ui/components/_base/schema.ts`:

```ts
/**
 * Canonical styling contract for any visible render surface.
 *
 * This is intentionally the same styling vocabulary as a component root.
 * Grouped items and sub-elements must not become second-class.
 */
export const styleableElementFields = {
  className: z.string().optional(),
  style: z.record(z.union([z.string(), z.number()])).optional(),

  padding: responsiveSpacing.optional(),
  paddingX: responsiveSpacing.optional(),
  paddingY: responsiveSpacing.optional(),
  margin: responsiveSpacing.optional(),
  marginX: responsiveSpacing.optional(),
  marginY: responsiveSpacing.optional(),
  gap: responsiveSpacing.optional(),
  width: responsiveString.optional(),
  minWidth: responsiveString.optional(),
  maxWidth: responsiveString.optional(),
  height: responsiveString.optional(),
  minHeight: responsiveString.optional(),
  maxHeight: responsiveString.optional(),
  bg: z.union([colorRef, componentBackgroundSchema]).optional(),
  color: colorRef.optional(),
  borderRadius: z.union([radiusEnum, z.string()]).optional(),
  border: z.string().optional(),
  shadow: z.union([shadowEnum, z.string()]).optional(),
  opacity: z.number().min(0).max(1).optional(),
  overflow: z.enum(["auto", "hidden", "scroll", "visible"]).optional(),
  cursor: z.string().optional(),
  position: z.enum(["relative", "absolute", "fixed", "sticky"]).optional(),
  inset: z.string().optional(),
  display: responsiveDisplay.optional(),
  flexDirection: responsiveFlexDirection.optional(),
  alignItems: z.enum(["start", "center", "end", "stretch", "baseline"]).optional(),
  justifyContent: z.enum(["start", "center", "end", "between", "around", "evenly"]).optional(),
  flexWrap: z.enum(["wrap", "nowrap", "wrap-reverse"]).optional(),
  flex: z.string().optional(),
  gridTemplateColumns: z.string().optional(),
  gridTemplateRows: z.string().optional(),
  gridColumn: z.string().optional(),
  gridRow: z.string().optional(),
  textAlign: z.enum(["left", "center", "right", "justify"]).optional(),
  fontSize: responsiveFontSize.optional(),
  fontWeight: z.union([fontWeightEnum, z.number()]).optional(),
  lineHeight: z.union([z.enum(["none", "tight", "snug", "normal", "relaxed", "loose"]), z.string()]).optional(),
  letterSpacing: z.union([z.enum(["tight", "normal", "wide"]), z.string()]).optional(),

  hover: hoverConfigSchema.optional(),
  focus: focusConfigSchema.optional(),
  active: activeConfigSchema.optional(),
} as const;

export const styleableElementSchema = z.object(styleableElementFields).strict();
```

The actual implementation may factor this out of `extendedBaseComponentSchema` instead of
redeclaring the fields. The important part is: **one shared fragment, one vocabulary**.

### 2. State Map Schema

Pseudo-states such as `hover`/`focus`/`active` already exist in style props. Grouped surfaces also
need named runtime states that are not CSS pseudo-classes:

- `disabled`
- `selected`
- `current`
- `open`
- `completed`
- `invalid`

Canonical schema:

```ts
export const slotStateNameSchema = z.enum([
  "hover",
  "focus",
  "active",
  "disabled",
  "selected",
  "current",
  "open",
  "completed",
  "invalid",
]);

export const statefulElementSchema = styleableElementSchema.extend({
  states: z
    .record(slotStateNameSchema, styleableElementSchema.partial())
    .optional(),
});
```

Notes:

- `hover` / `focus` / `active` remain supported through existing root-level style props.
- `states` is the canonical universal way to style runtime states on grouped surfaces.
- Components do not need to support every state. They support the states that make semantic sense.
- Unsupported states must be ignored by implementation, not error at runtime.

### 3. Slot Map Schema

Canonical slot defaults for components and per-item overrides:

```ts
export function slotsSchema<const T extends readonly [string, ...string[]]>(
  slotNames: T,
) {
  return z
    .object(
      Object.fromEntries(
        slotNames.map((slot) => [slot, statefulElementSchema.optional()]),
      ) as Record<T[number], z.ZodOptional<typeof statefulElementSchema>>,
    )
    .strict();
}
```

This is the heart of the system.

Every component that renders internal visible surfaces must expose:

- component-level slot defaults
- item-level slot overrides where items exist

### 4. Canonical Alias Normalization

Aliases are allowed only as authoring sugar and must normalize immediately to canonical slot form.

Canonical normalization examples:

```ts
itemClassName                  -> slots.item.className
activeItemClassName            -> slots.item.states.current.className
disabledItemClassName          -> slots.item.states.disabled.className
dropdownClassName              -> slots.dropdown.className
dropdownItemClassName          -> slots.dropdownItem.className
activeDropdownItemClassName    -> slots.dropdownItem.states.current.className
tabClassName                   -> slots.tab.className
activeTabClassName             -> slots.tab.states.active.className
panelClassName                 -> slots.panel.className
headerClassName                -> slots.headerCell.className
cellClassName                  -> slots.cell.className
rowClassName                   -> slots.row.className
activeRowClassName             -> slots.row.states.selected.className
fieldClassName                 -> slots.field.className
labelClassName                 -> slots.label.className
inputClassName                 -> slots.input.className
```

Normalization rules:

1. Normalize at schema-parse or compiler-shape boundary, not inside ad hoc component render code.
2. Canonical `slots` always win if both alias and canonical values are present.
3. New features must target canonical `slots`, not aliases.
4. Aliases must never expose capabilities unavailable in canonical form.

---

## Canonical Manifest Shape

### Primitive

Primitive components keep their root-level styling contract and may add internal `slots` if they
render multiple visible surfaces.

Example:

```json
{
  "type": "tabs",
  "className": "w-full",
  "slots": {
    "tab": {
      "className": "rounded-none",
      "states": {
        "active": { "className": "bg-primary/20 text-foreground font-semibold" },
        "disabled": { "opacity": 0.5, "cursor": "not-allowed" }
      }
    },
    "panel": {
      "padding": "md"
    }
  }
}
```

### Grouping Component

A grouping component exposes:

- `slots`: component-level defaults for its visible surfaces
- per-item `slots`: overrides for the individual item's visible surfaces

Example:

```json
{
  "navigation": {
    "mode": "top-nav",
    "slots": {
      "item": {
        "className": "rounded-none",
        "states": {
          "hover": { "className": "bg-primary/18" },
          "current": { "className": "bg-primary/30 text-foreground font-semibold" }
        }
      },
      "dropdownItem": {
        "paddingY": "xs",
        "paddingX": "sm",
        "borderRadius": "none"
      }
    },
    "items": [
      {
        "label": "Dashboard",
        "path": "/"
      },
      {
        "label": "Settings",
        "path": "/settings",
        "slots": {
          "item": {
            "className": "ml-auto text-muted-foreground",
            "states": {
              "current": { "className": "text-warning" }
            }
          }
        }
      }
    ]
  }
}
```

This is the canonical pattern. It is generic enough to work for nav, tabs, accordion, list,
table, field groups, and any future grouped primitive.

### Recursive Declarative Exposure Rule

If a grouped component composes primitives internally, those primitives must remain declaratively
addressable through the parent declaration model.

This is a hard requirement.

#### Meaning

If a grouped component renders:

- an item trigger
- an item label
- an item icon
- a nested floating panel
- a nested menu item
- a nested disclosure surface

then the manifest author must be able to configure those surfaces declaratively through the parent
component's canonical contract.

The parent may expose that control through:

- canonical `slots`
- nested child component config
- or both

But the primitive behavior and surfaces may not disappear into private implementation code.

#### Two acceptable patterns

##### Pattern A: Slot-forwarded composition

The grouped component composes an internal primitive and forwards canonical surface config into it.

Example:

```json
{
  "navigation": {
    "slots": {
      "dropdown": { "className": "p-xs" },
      "dropdownItem": { "className": "rounded-none" }
    }
  }
}
```

##### Pattern B: Explicit nested primitive declaration

The grouped component lets the author declare the primitive directly in a nested structure.

Example:

```json
{
  "type": "nav-dropdown",
  "trigger": {
    "type": "button",
    "label": "More",
    "variant": "ghost"
  },
  "panel": {
    "type": "floating-menu",
    "slots": {
      "panel": { "className": "p-xs" },
      "item": { "className": "rounded-none" }
    }
  }
}
```

Either is acceptable. Hiding the primitive entirely is not.

#### Recursive rule

This requirement applies recursively.

If a grouped component contains a primitive that itself contains styleable internal surfaces:

- those internal surfaces must still be configurable through declarations
- grouped wrappers may set defaults
- grouped wrappers may not terminate the declaration chain

The manifest system must remain configurable all the way down to the visible surface.

### Canonical Shape for Grouped Item Schemas

When a component renders repeated items, the item schema must follow this pattern:

```ts
const exampleItemSchema = z.object({
  // item data
  label: z.string(),
  value: z.string().optional(),

  // canonical item-local surface overrides
  slots: slotsSchema(["item", "label", "icon", "badge"]).optional(),
}).strict();
```

Notes:

- item-local `slots` target surfaces rendered by that item
- item-local `slots` are overrides, not a second default layer
- item-local `slots` may omit most surfaces
- item-local `slots` must be strict for the supported slot names of that component

### Canonical Shape for Grouping Component Schemas

When a component renders repeated items or internal visible surfaces, the component config must
follow this pattern:

```ts
const exampleGroupedConfigSchema = baseComponentConfigSchema.extend({
  type: z.literal("example-group"),
  items: z.array(exampleItemSchema),
  slots: slotsSchema([
    "root",
    "list",
    "item",
    "label",
    "icon",
    "badge",
  ]).optional(),
}).strict();
```

Notes:

- component-level `slots` define defaults for all matching surfaces
- item-level `slots` override those defaults for one item instance
- root-level style props still apply to the component root
- internal slots never bypass the canonical merge contract

### Canonical Shape for Primitive Schemas

Primitive components that expose visible internal surfaces should also use `slots`.

```ts
const examplePrimitiveConfigSchema = baseComponentConfigSchema.extend({
  type: z.literal("example-primitive"),
  slots: slotsSchema(["root", "trigger", "panel", "icon", "label"]).optional(),
}).strict();
```

This preserves parity between primitive and grouped authoring.

---

## Merge Contract

Every rendered surface must use one merge algorithm.

### Structural rule

Implementation-owned structural requirements apply first and are not part of the consumer merge
contract. They exist to make the component render correctly.

Examples:

- `display: flex`
- `position: relative`
- `overflow: hidden`
- list reset styles
- alignment required for layout mechanics

### Visual merge order

For a concrete rendered surface, merge in this order:

1. implementation structural base
2. implementation visual defaults for that slot
3. component root style props, if the slot is the root surface
4. component slot default base
5. item slot base, if this is an item surface
6. component slot state styles in canonical state order
7. item slot state styles in canonical state order
8. explicit raw `style` object last

For `className`, concatenate in the same order. Later entries win through normal CSS/Tailwind
precedence.

### Canonical state order

Use one deterministic order across the system:

1. `hover`
2. `focus`
3. `open`
4. `selected`
5. `current`
6. `active`
7. `completed`
8. `invalid`
9. `disabled`

Rationale:

- low-commitment interaction states first
- semantic/selection states next
- terminal/error states later
- `disabled` wins last

### State support rules

- Components only apply the states they can actually compute.
- Unsupported state entries are ignored.
- Per-item state overrides always win over component defaults for the same slot/state.

---

## Naming Standard

Do not invent field names ad hoc.

### Top-level component field names

- `className`
- `style`
- universal style props
- `slots`

### Group item field names

- item data fields
- `slots`

### Slot names

Use short semantic names, not implementation trivia.

Good:

- `root`
- `item`
- `label`
- `icon`
- `badge`
- `trigger`
- `panel`
- `content`
- `separator`
- `headerCell`
- `cell`
- `row`
- `input`
- `helper`
- `error`

Avoid:

- `itemButtonPrimarySurface`
- `tabContentWrapperInner`
- `navDropdownChildButton`

### Collection naming rule

Collection-level slots may be collection-qualified when needed:

- `item`
- `itemLabel`
- `itemIcon`
- `itemBadge`
- `dropdown`
- `dropdownItem`
- `dropdownItemLabel`

Per-item overrides may use the same global slot names for simplicity. Do not create a second
naming system for item-local slots unless required by implementation.

---

## Primitive-First Requirement

This section is the product requirement in engineering terms.

### Requirement

A manifest author must be able to build advanced UI by declaring primitives directly.

Grouping components are allowed only if they preserve that power:

- they may reduce repetition
- they may provide defaults
- they may package common structure
- they may not reduce access to visible surfaces

### Consequences

1. `nav-link`, `nav-dropdown`, `nav-section`, and `nav-user-menu` must participate in the same
   universal styling contract as grouped `navigation.items`.
2. A grouped component may not expose styling surfaces that the corresponding primitive path
   cannot express.
3. A grouped component may not be the only place where a visual capability exists.
4. A grouped component may not privately re-implement a primitive behavior already present in the
   UI library.

### Example standard

If grouped nav supports styling:

- current item
- icon
- badge
- dropdown item

then composable nav primitives must expose those same surfaces declaratively.

If the composable path cannot do it, the grouped path is over-specialized.

### Primitive extraction rule

If multiple grouped components need the same UI behavior, that behavior belongs in a primitive.

Typical examples:

- floating panel / popover positioning
- menu item semantics
- tabs trigger semantics
- accordion trigger/content semantics
- user menu panel behavior

Implementation sequence:

1. extract the primitive
2. define its slot contract
3. migrate grouped components to compose it
4. remove duplicated local implementations

Do not upgrade duplicated implementations in parallel and call the system universal.

### Recursive configuration requirement

Primitives used by grouped components must be exposed to declarations strongly enough that a
manifest author can still configure:

- the primitive root
- the primitive's visible internal slots
- the primitive's relevant runtime states

In other words:

- primitive behavior must be reused
- primitive configurability must also be reused

Reusing a primitive internally while hiding its configuration surface is not sufficient.

### No hidden composition rule

The following is explicitly disallowed:

- a grouped component uses `ButtonControl` internally but does not expose any way to configure the
  trigger surface declaratively
- a grouped component uses `FloatingPanel` internally but does not expose panel/item surface
  declarations
- a grouped component uses an item-shell primitive internally but hardcodes current/selected/disabled
  visuals in the wrapper

Primitive reuse without primitive exposure is only partial convergence and does not meet the bar.

---

## Theme and Token Rules

### One styling path

The system has exactly one visual styling path:

- design tokens
- universal style props
- `className`
- `style`

No parallel per-component visual token resolvers.

### What theme owns

Theme owns:

- token values
- semantic scales
- brand defaults
- behavioral defaults only where they select rendering paths

Theme does **not** own:

- per-item visual differentiation
- per-instance collection visuals
- per-sub-element visual overrides

### Obsolete API rule

Pre-prod means we should remove obsolete visual APIs rather than preserve them.

For nav specifically:

- remove visual properties from `theme.overrides.components.nav`
- migrate dogfood manifests in the same cutover
- do not keep a compatibility window

---

## Compiler and Runtime Invariants

### 1. One schema fragment, reused everywhere

The same styleable fragment must be reused in:

- component schemas
- manifest schemas
- grouped item schemas
- primitive child schemas

Do not duplicate ad hoc versions of the same contract.

### 2. Compiler is a pass-through for styling declarations

The compiler may normalize shape, but it must not reinterpret styling intent.

Allowed:

- passing `slots` through
- expanding sugar aliases into canonical `slots`
- filling in missing defaults

Not allowed:

- translating per-item styling into bespoke component CSS vars
- synthesizing component-specific styling concepts

### 3. Runtime computes state, not design intent

Runtime is responsible for:

- current route
- selected state
- disabled state
- open/closed state
- validation state

Runtime is **not** responsible for inventing visual policy.

### 4. SSR safety

All merge functions must be pure and deterministic:

- safe on server and client
- no hover state in React where CSS can handle it
- no hydration mismatch from visual-only state handling

### 5. Repository integration points must match reality

This spec must be implemented against the real handoff points in the repo, not against an assumed
compiler path.

Current critical integration points:

- `src/ui/components/_base/schema.ts`
- `src/ui/components/_base/component-wrapper.tsx`
- `src/ui/manifest/schema.ts`
- `src/ui/manifest/app.tsx`
- `src/ui/components/layout/nav/schema.ts`
- `src/ui/components/layout/nav/component.tsx`
- `src/ui/components/layout/nav-link/*`
- `src/ui/components/layout/nav-dropdown/*`
- `src/ui/components/layout/nav-section/*`
- `src/ui/components/layout/nav-user-menu/*`
- `src/ui/components/primitives/floating-menu/*`

Implementation rule:

- update the manifest schema and the runtime assembly path together
- do not assume `manifest/compiler.ts` is the only or primary nav shaping layer
- where two schemas or assembly paths exist, shared fragments must be imported rather than copied

The spec is not complete if the canonical contract exists in one path but not the other.

---

## Shared Runtime Utilities

Add a new file:

- `src/ui/components/_base/style-surfaces.ts`

Canonical exports:

```ts
export type RuntimeSurfaceState =
  | "hover"
  | "focus"
  | "open"
  | "selected"
  | "current"
  | "active"
  | "completed"
  | "invalid"
  | "disabled";

export function mergeClassNames(
  ...classes: Array<string | undefined | null | false>
): string | undefined;

export function mergeStyles(
  ...styles: Array<Record<string, string | number> | undefined | null>
): Record<string, string | number> | undefined;

export function resolveSurfaceStateOrder(
  states: RuntimeSurfaceState[],
): RuntimeSurfaceState[];

export function resolveSurfaceConfig(params: {
  implementationBase?: Record<string, unknown>;
  componentSurface?: Record<string, unknown>;
  itemSurface?: Record<string, unknown>;
  activeStates?: RuntimeSurfaceState[];
}): {
  className?: string;
  style?: Record<string, string | number>;
  resolvedConfigForWrapper?: Record<string, unknown>;
};
```

`resolvedConfigForWrapper` exists so sub-surfaces can reuse the same universal style prop
resolution path as `ComponentWrapper`, even when the surface is not itself a top-level component.

That is a critical architectural requirement.

### Required runtime behavior

`resolveSurfaceConfig(...)` must:

1. accept canonical slot config fragments
2. merge universal style props as data, not just `className`/`style`
3. return a resolved object that can be fed into shared style-prop resolution
4. support deterministic state ordering
5. avoid DOM access or browser APIs

### Required implementation pattern

For a rendered sub-surface:

1. compute the active runtime states
2. read component-level slot config for the slot
3. read item-level slot config for the slot, if present
4. resolve merged slot config
5. pass the merged result through the same style-prop resolver family used by top-level components

Do not:

- hand-assemble ad hoc inline style objects for each component forever
- interpret slot config differently by component
- use state-specific `className` fields outside canonical `states`

### Primitive composition helper rule

If a grouped component renders a shared primitive internally, the primitive should accept canonical
surface config rather than forcing the grouped component to flatten everything into bespoke
low-level props.

That keeps the primitive reusable and prevents grouped wrappers from becoming private adapters.

---

## Component Coverage Matrix

The contract lands once. Component coverage may phase in, but the canonical slot model is fixed
from the start.

### Navigation

Grouped nav surfaces:

- `root`
- `brand`
- `brandIcon`
- `brandLabel`
- `list`
- `item`
- `itemLabel`
- `itemIcon`
- `itemBadge`
- `dropdown`
- `dropdownItem`
- `dropdownItemLabel`
- `dropdownItemIcon`
- `userMenu`
- `userMenuTrigger`
- `userMenuItem`
- `userAvatar`

Composable nav primitives must align:

- `nav-link`
- `nav-dropdown`
- `nav-section`
- `nav-user-menu`

Behavioral primitive requirement:

- floating panel behavior must converge on shared floating/menu primitives
- nav user menu and nav dropdown must not keep private menu implementations

### Overlay

- dropdown-menu: `root`, `trigger`, `panel`, `item`, `itemLabel`, `itemIcon`, `separator`, `label`
- context-menu: `root`, `trigger`, `panel`, `item`, `itemLabel`, `itemIcon`, `separator`

Behavioral primitive requirement:

- overlay menu surfaces should define the shared primitive behavior contract that nav menus also use

### Navigation Components

- tabs: `root`, `list`, `tab`, `tabLabel`, `tabIcon`, `panel`
- accordion: `root`, `item`, `trigger`, `triggerLabel`, `triggerIcon`, `content`
- breadcrumb: `root`, `item`, `link`, `current`, `separator`, `icon`
- stepper: `root`, `item`, `marker`, `label`, `description`, `connector`, `content`

Behavioral primitive requirement:

- if tabs, accordion, breadcrumb, or stepper share reusable trigger/content primitives, they
  should converge on those primitives rather than retaining isolated local interaction code

### Data

- data-table: `root`, `toolbar`, `headerRow`, `headerCell`, `row`, `cell`, `actionsCell`, `emptyState`, `bulkActions`
- list: `root`, `item`, `itemTitle`, `itemDescription`, `itemIcon`, `itemBadge`
- chart: `root`, `legend`, `legendItem`, `tooltip`, `series`, `axis`, `grid`

### Forms

- auto-form: `root`, `field`, `label`, `input`, `helper`, `error`, `section`
- toggle-group: `root`, `item`, `itemLabel`, `itemIcon`

Coverage is complete only when every listed surface can be addressed through the canonical slot
contract where the surface is visibly rendered.

### Coverage implementation rule

For every component in this matrix, a zero-context implementer must answer three questions before
starting edits:

1. What visible surfaces does this component actually render today?
2. Which of those surfaces are styleable only through hardcoded inline styles today?
3. Which schema layer needs `slots` so those surfaces become declaratively reachable?

If the answer is unclear, the implementer must inspect the component code and update the matrix or
the component before proceeding.

### Mandatory Primitive Reuse Matrix

This matrix defines which grouped behaviors must converge on which primitive families.

| Behavior | Canonical primitive family | Components that must use it or converge on it |
|---|---|---|
| Floating positioned panel | `FloatingPanel`-family | `dropdown-menu`, `nav-dropdown`, `nav-user-menu`, `popover`, future floating menus |
| Menu item rendering | `MenuItem` / `MenuSeparator` / `MenuLabel`-family | `dropdown-menu`, nav dropdown/menu surfaces, context-menu-like surfaces where semantics align |
| Button / trigger shell | `ButtonControl`-family or stricter trigger primitive | dropdown triggers, popover triggers, grouped action triggers, nav trigger surfaces where applicable |
| Collapsible/disclosure shell | `Collapsible`-family or stricter disclosure primitive | accordion, tree expansion shells, future disclosure-based grouped components |
| Link-like navigation shell | `Link` / navigation-link primitive family | breadcrumb links, nav links, prefetch-capable nav/link surfaces where semantics align |
| Interactive item shell | extracted shared item-shell primitive if needed | nav item rows, tree rows, stepper step triggers, selectable grouped item rows |

Matrix rules:

1. If a component in the right column does not currently use the primitive family, that is
   implementation debt to remove.
2. If the primitive family is insufficient, improve or extract it rather than bypassing it.
3. Grouped components may layer defaults and orchestration on top, but not fork the behavior.

---

## Implementation Phases

## Phase 1: Canonical Styleable Element Contract

### Goal

Create the shared schema fragments so grouped surfaces use the same styling vocabulary as component
roots.

### Deliverables

- export `styleableElementFields`
- export `styleableElementSchema`
- export `statefulElementSchema`
- export `slotsSchema(...)`

### Expected file touch list

- `src/ui/components/_base/schema.ts`
- `src/ui/manifest/schema.ts` if manifest-side shared fragment is needed

### Required tests

- shared schema fragment accepts universal style props
- `states` accepts canonical runtime state names only
- `slotsSchema(...)` is strict for declared slot names

### Exit Criteria

- the styling fragment is shared, not duplicated
- grouped elements can use universal style props, not only `className`/`style`
- tests cover schema acceptance and strict rejection

## Phase 2: Shared Slots, States, and Merge Runtime

### Goal

Implement one runtime merge system for all rendered surfaces.

### Deliverables

- `style-surfaces.ts`
- canonical state order
- merge helpers
- surface resolution utilities

### Expected file touch list

- `src/ui/components/_base/style-surfaces.ts`
- `src/ui/components/_base/component-wrapper.tsx` if helper extraction or shared resolver reuse is required

### Required tests

- merge order for component slot vs item slot
- state precedence
- `className` + style-prop coexistence
- empty/undefined config handling
- SSR-safe pure execution

### Additional required output

- identify candidate behavior primitives that grouped components must compose
- document which current grouped implementations are being replaced versus reused

### Exit Criteria

- one merge contract exists for all components
- no component invents its own merge precedence
- unit tests cover class/style/prop/state precedence

## Phase 3: Navigation + Composable Nav Cutover

### Goal

Land the universal system in the area with the highest product pressure.

### Deliverables

- grouped `navigation.items` uses canonical `slots`
- composable nav primitives use the same slot/state contract
- nav visual APIs in theme are removed in the same cutover

### Expected file touch list

- `src/ui/manifest/schema.ts`
- `src/ui/manifest/app.tsx`
- `src/ui/entity-pages/AppShellWrapper.tsx` if shell parity changes are needed
- `src/ui/components/layout/nav/schema.ts`
- `src/ui/components/layout/nav/component.tsx`
- `src/ui/components/layout/nav-link/schema.ts`
- `src/ui/components/layout/nav-link/component.tsx`
- `src/ui/components/layout/nav-dropdown/schema.ts`
- `src/ui/components/layout/nav-dropdown/component.tsx`
- `src/ui/components/layout/nav-section/schema.ts`
- `src/ui/components/layout/nav-section/component.tsx`
- `src/ui/components/layout/nav-user-menu/schema.ts`
- `src/ui/components/layout/nav-user-menu/component.tsx`
- `src/ui/tokens/schema.ts`
- `src/ui/tokens/resolve.ts`

### Required tests

- grouped nav slot defaults apply
- per-item grouped nav slot overrides win
- composable nav primitives can express the same current/disabled/open visuals
- no React hover state is needed for visual policy
- theme nav visual overrides are rejected after cutover
- nav dropdown and nav user menu compose shared floating/menu primitives rather than bespoke menu implementations
- primitive-backed nav composition still exposes primitive configuration declaratively to the
  manifest author

### Important constraint

Do not land grouped nav customization without composable nav alignment.
Do not preserve bespoke nav menu implementations if equivalent shared primitives exist.

### Exit Criteria

- `navigation.items` and `navigation.template` are stylistically equivalent in capability
- nav hover/current/open/disabled visuals are declarative
- no React hover state for visual policy
- no nav visual CSS variable resolver pipeline remains

## Phase 4: Overlay + Menu Surfaces

### Goal

Upgrade menus to canonical slots, including non-item visible entries.

### Deliverables

- dropdown-menu labels and separators are styleable
- context-menu surfaces are styleable
- floating menu primitives accept canonical slot styling inputs

### Expected file touch list

- `src/ui/components/overlay/dropdown-menu/schema.ts`
- `src/ui/components/overlay/dropdown-menu/component.tsx`
- `src/ui/components/overlay/context-menu/schema.ts`
- `src/ui/components/overlay/context-menu/component.tsx`
- `src/ui/components/primitives/floating-menu/component.tsx`

### Required tests

- menu item slots
- separator slots
- label slots
- destructive/disabled/current state behavior via canonical states where applicable
- nav and overlay menu surfaces share the same primitive behavior contract where behavior overlaps
- popover/dropdown/menu primitives remain declaratively configurable when used inside grouped
  components

### Exit Criteria

- visible menu labels and separators are not hardcoded
- item + separator + label surfaces share one pattern
- grouped menu UIs do not roll their own floating/menu behavior when shared primitives exist

## Phase 5: Data Display Surfaces

### Goal

Upgrade table, list, and chart surfaces.

### Expected file touch list

- `src/ui/components/data/data-table/schema.ts`
- `src/ui/components/data/data-table/component.tsx`
- `src/ui/components/data/list/schema.ts`
- `src/ui/components/data/list/component.tsx`
- `src/ui/components/data/chart/schema.ts`
- `src/ui/components/data/chart/component.tsx`

### Required tests

- header/cell/row slot behavior for table
- list item sub-surface slot behavior
- chart legend/tooltip slot behavior where those surfaces are rendered by Snapshot code
- any extracted interactive item-shell primitives remain configurable through parent declarations

### Exit Criteria

- headers, rows, cells, action cells, and empty states are styleable
- list items and sub-elements are styleable
- chart legend and tooltip surfaces are styleable

## Phase 6: Forms + Field Surfaces

### Goal

Upgrade fields and grouped controls.

### Expected file touch list

- `src/ui/components/forms/auto-form/schema.ts`
- `src/ui/components/forms/auto-form/component.tsx`
- `src/ui/components/forms/toggle-group/schema.ts`
- `src/ui/components/forms/toggle-group/component.tsx`

### Required tests

- field/label/input/helper/error slot behavior
- item-level toggle slot behavior
- invalid/disabled state behavior through canonical states where applicable
- grouped form wrappers do not hide primitive field/input configurability

### Exit Criteria

- field wrapper, label, input, helper, and error surfaces are styleable
- toggle group item surfaces are styleable

## Phase 7: Remove Obsolete Visual APIs

### Goal

Delete pre-universal styling APIs.

### Deliverables

- remove nav visual props from `theme.overrides.components`
- remove resolver code that only supported those props
- remove one-off visual configuration fields superseded by canonical slots

### Expected file touch list

- `src/ui/tokens/schema.ts`
- `src/ui/tokens/resolve.ts`
- docs/examples/manifests that still use obsolete nav visual fields

### Required tests

- schema rejects obsolete visual nav token fields
- no remaining component reads removed nav visual CSS vars

### Exit Criteria

- no obsolete visual path remains
- docs point to one canonical system only

## Phase 8: Docs + Playground + Dogfood

### Goal

Document the canonical system and prove it on real manifests.

### Required examples

- primitive-only sophisticated nav
- grouped nav with slot defaults plus per-item overrides
- tabs, accordion, table, form, and menu examples
- side-by-side primitive vs grouping equivalence where relevant

### Required documentation content

- canonical `slots` / `states` model
- merge order
- alias normalization rules
- primitive vs grouping equivalence principle
- anti-pattern examples showing what not to add
- migration examples from old nav visual fields to canonical slots

### Exit Criteria

- docs teach the canonical slot/state system first
- playground demonstrates per-surface customization
- dogfood manifests use the canonical API

---

## Guidance on Convenience Aliases

Convenience aliases are allowed only under these rules:

1. They compile directly to canonical `slots` / `states`.
2. They are documented as sugar, not as the primary API.
3. They do not unlock any styling capability unavailable in canonical form.

Example:

- `itemClassName` may exist temporarily as sugar for `slots.item.className`

But:

- it must not be the only documented path
- it must not be the only supported path
- new component work must use canonical `slots`, not proliferate aliases

Default guidance: do not add aliases unless dogfooding proves they materially improve authoring
without obscuring the model.

---

## Agent Checklist

This checklist is intentionally procedural for zero-context execution.

1. Read this spec in full before editing code.
2. Inspect `src/ui/components/_base/schema.ts`, `src/ui/manifest/schema.ts`, and
   `src/ui/components/_base/component-wrapper.tsx` to confirm the current universal style prop
   vocabulary.
3. Implement the shared schema fragments first.
4. Implement shared merge/runtime helpers second.
5. Upgrade one product area at a time using canonical `slots`.
6. When upgrading a grouped component, upgrade its primitive/composable equivalent in the same
   phase if one exists.
7. When upgrading a grouped component that currently rolls its own primitive behavior, either
   migrate it to an existing primitive or extract a new primitive first.
8. Normalize any temporary aliases into canonical `slots`.
9. Remove obsolete visual APIs in the same cutover once canonical slots fully cover the use case.
10. Add schema and runtime tests before closing a phase.
11. Validate dogfood manifests/examples against the canonical API.
12. Confirm that primitive reuse did not hide primitive configurability from declarations.

If an implementer cannot explain how a change maps back to the canonical slot/state model in this
spec, the change is probably introducing drift.

---

## Testing Standard

### Schema tests

For every upgraded component:

- valid canonical `slots` accepted
- valid per-item `slots` accepted
- strict mode rejects unknown slot names where appropriate
- sugar aliases, if any, compile to canonical form

### Runtime tests

For every upgraded component:

- base slot defaults apply
- per-item slot overrides win
- state styles apply in canonical order
- unsupported states are ignored safely
- SSR render equals client hydration for visual state inputs

### Dogfood tests

- budget-fe and other internal manifests compile and render through the canonical API
- no obsolete visual API remains in internal manifests after cutover

---

## Definition of Done

The system is complete only when all of the following are true:

1. Every visible render surface in covered components is styleable through the canonical
   styleable-element contract.
2. Grouping components use canonical `slots` and per-item `slots`, not bespoke visual fields.
3. Primitive and grouped forms of the same UI capability are equivalent in styling power.
4. All grouped surfaces can use the same universal style prop vocabulary as component roots.
5. Theme no longer carries per-component visual differentiation APIs for nav.
6. No parallel CSS variable resolver path exists for per-item or per-surface visuals.
7. Internal manifests, docs, and playground examples use the canonical system.

If any visible surface still requires a one-off schema addition for a normal visual customization,
the system is incomplete.
