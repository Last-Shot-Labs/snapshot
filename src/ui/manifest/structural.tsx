/**
 * Legacy structural compatibility layer.
 *
 * Older tests and import paths still reference `manifest/structural`, but the
 * actual implementations now live in the primitive-backed component runtime.
 * Keep this file as a thin adapter so legacy imports cannot drift into a
 * parallel styling system.
 */

import { Heading as PrimitiveHeading } from "../components/content/heading";
import { Button as PrimitiveButton } from "../components/forms/button";
import { Select as PrimitiveSelect } from "../components/forms/select";
import { Card as PrimitiveCard } from "../components/layout/card";
import { Container as PrimitiveContainer } from "../components/layout/container";
import { Grid as PrimitiveGrid } from "../components/layout/grid";
import { Outlet as PrimitiveOutlet } from "../components/layout/outlet";
import { Row as PrimitiveRow } from "../components/layout/row";
import { Section as PrimitiveSection } from "../components/layout/section";
import { Spacer as PrimitiveSpacer } from "../components/layout/spacer";

export function Row({ config }: { config: Record<string, unknown> }) {
  return <PrimitiveRow config={config as Parameters<typeof PrimitiveRow>[0]["config"]} />;
}

export function Heading({ config }: { config: Record<string, unknown> }) {
  return (
    <PrimitiveHeading
      config={config as Parameters<typeof PrimitiveHeading>[0]["config"]}
    />
  );
}

export function Button({ config }: { config: Record<string, unknown> }) {
  return (
    <PrimitiveButton
      config={config as Parameters<typeof PrimitiveButton>[0]["config"]}
    />
  );
}

export function Select({ config }: { config: Record<string, unknown> }) {
  return (
    <PrimitiveSelect
      config={config as Parameters<typeof PrimitiveSelect>[0]["config"]}
    />
  );
}

export function Card({ config }: { config: Record<string, unknown> }) {
  return <PrimitiveCard config={config as Parameters<typeof PrimitiveCard>[0]["config"]} />;
}

export function Section({ config }: { config: Record<string, unknown> }) {
  return (
    <PrimitiveSection
      config={config as Parameters<typeof PrimitiveSection>[0]["config"]}
    />
  );
}

export function Container({ config }: { config: Record<string, unknown> }) {
  return (
    <PrimitiveContainer
      config={config as Parameters<typeof PrimitiveContainer>[0]["config"]}
    />
  );
}

export function Grid({ config }: { config: Record<string, unknown> }) {
  return <PrimitiveGrid config={config as Parameters<typeof PrimitiveGrid>[0]["config"]} />;
}

export function Spacer({ config }: { config: Record<string, unknown> }) {
  return (
    <PrimitiveSpacer
      config={config as Parameters<typeof PrimitiveSpacer>[0]["config"]}
    />
  );
}

export function OutletComponent({ config }: { config: Record<string, unknown> }) {
  return (
    <PrimitiveOutlet
      config={config as Parameters<typeof PrimitiveOutlet>[0]["config"]}
    />
  );
}

export const LEGACY_STRUCTURAL_COMPONENTS = {
  row: Row,
  heading: Heading,
  button: Button,
  select: Select,
  card: Card,
  section: Section,
  container: Container,
  grid: Grid,
  spacer: Spacer,
  outlet: OutletComponent,
} as const;
