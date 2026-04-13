// @vitest-environment jsdom
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider as JotaiProvider } from "jotai/react";
import { createStore } from "jotai/vanilla";
import { atom } from "jotai";
import {
  AppRegistryContext,
  PageRegistryContext,
} from "../../../../context/providers";

const execute = vi.fn();

vi.mock("../../../../actions/executor", () => ({
  useActionExecutor: () => execute,
}));

import { Button, ButtonControl } from "../component";

function createMockRegistry(initialValues?: Record<string, unknown>) {
  const store = createStore();
  const atoms = new Map<string, ReturnType<typeof atom<unknown>>>();

  if (initialValues) {
    for (const [id, value] of Object.entries(initialValues)) {
      const target = atom<unknown>(value);
      atoms.set(id, target);
      store.set(target, value);
    }
  }

  return {
    register(id: string) {
      if (!atoms.has(id)) {
        atoms.set(id, atom<unknown>(undefined));
      }
      return atoms.get(id)!;
    },
    get(id: string) {
      return atoms.get(id);
    },
    unregister(id: string) {
      atoms.delete(id);
    },
    keys() {
      return Array.from(atoms.keys());
    },
    store,
  };
}

function renderWithContext(
  ui: React.ReactElement,
  globals?: Record<string, unknown>,
) {
  const appRegistry = createMockRegistry(globals);
  const pageRegistry = createMockRegistry();

  return render(
    <AppRegistryContext.Provider value={appRegistry}>
      <JotaiProvider store={appRegistry.store}>
        <PageRegistryContext.Provider value={pageRegistry}>
          {ui}
        </PageRegistryContext.Provider>
      </JotaiProvider>
    </AppRegistryContext.Provider>,
  );
}

describe("Button", () => {
  beforeEach(() => {
    execute.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the resolved label from runtime state", () => {
    renderWithContext(
      <Button
        config={{
          type: "button",
          label: { from: "global.actions.primaryLabel" },
          action: { type: "navigate", to: "/save" },
        }}
      />,
      { actions: { primaryLabel: "Publish" } },
    );

    expect(screen.getByText("Publish")).toBeTruthy();
  });

  it("executes the configured action when clicked", () => {
    renderWithContext(
      <Button
        config={{
          type: "button",
          label: "Save",
          action: { type: "navigate", to: "/save" },
        }}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(execute).toHaveBeenCalledWith({ type: "navigate", to: "/save" });
  });

  it("exposes canonical runtime states on ButtonControl", () => {
    render(
      <ButtonControl
        surfaceId="button-control"
        activeStates={["current", "open", "active"]}
        ariaCurrent="page"
        ariaExpanded
      >
        Trigger
      </ButtonControl>,
    );

    const button = screen.getByRole("button", { name: "Trigger" });
    expect(button.getAttribute("data-current")).toBe("true");
    expect(button.getAttribute("data-open")).toBe("true");
    expect(button.getAttribute("data-active")).toBe("true");
    expect(button.getAttribute("aria-current")).toBe("page");
    expect(button.getAttribute("aria-expanded")).toBe("true");
  });
});
