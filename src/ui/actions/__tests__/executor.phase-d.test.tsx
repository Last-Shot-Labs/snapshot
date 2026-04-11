// @vitest-environment jsdom
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { act, renderHook } from "@testing-library/react";
import { createElement, type ReactNode } from "react";
import { Provider } from "jotai/react";
import { SnapshotApiContext, useActionExecutor } from "../executor";
import { ManifestRuntimeProvider } from "../../manifest/runtime";
import {
  AppRegistryContext,
  PageRegistryContext,
} from "../../context/providers";
import { AtomRegistryImpl } from "../../context/registry";

function createMockApi() {
  return {
    get: vi.fn().mockResolvedValue({}),
    post: vi.fn().mockResolvedValue({}),
    put: vi.fn().mockResolvedValue({}),
    patch: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
    setStorage: vi.fn(),
  };
}

function createWrapper(options: {
  api?: ReturnType<typeof createMockApi>;
  pageRegistry?: AtomRegistryImpl;
  appRegistry?: AtomRegistryImpl;
}) {
  const { api, pageRegistry, appRegistry } = options;
  return function Wrapper({ children }: { children: ReactNode }) {
    return createElement(
      Provider,
      null,
      createElement(
        SnapshotApiContext.Provider,
        { value: api as never },
        createElement(ManifestRuntimeProvider as any, {
          api: api as never,
          manifest: {
            raw: { routes: [] },
            app: { shell: "full-width" },
            routes: [],
            routeMap: {},
            firstRoute: null,
          },
          children: createElement(
            PageRegistryContext.Provider,
            { value: pageRegistry ?? null },
            createElement(
              AppRegistryContext.Provider,
              { value: appRegistry ?? null },
              children,
            ),
          ),
        }),
      ),
    );
  };
}

describe("useActionExecutor phase D", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("navigator", {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  it("copies resolved text to the clipboard", async () => {
    const api = createMockApi();
    const pageRegistry = new AtomRegistryImpl();
    const wrapper = createWrapper({ api, pageRegistry });
    const { result } = renderHook(() => useActionExecutor(), { wrapper });

    await act(async () => {
      await result.current(
        { type: "copy-to-clipboard", text: "{email}" },
        { email: "user@example.com" },
      );
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "user@example.com",
    );
  });

  it("scrolls to components by snapshot id", async () => {
    const api = createMockApi();
    const pageRegistry = new AtomRegistryImpl();
    const wrapper = createWrapper({ api, pageRegistry });
    const { result } = renderHook(() => useActionExecutor(), { wrapper });
    const target = document.createElement("div");
    target.dataset.snapshotId = "billing";
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);

    await act(async () => {
      await result.current({
        type: "scroll-to",
        target: "billing",
        behavior: "smooth",
        block: "center",
      });
    });

    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "center",
    });
  });

  it("debounces actions before executing them", async () => {
    const api = createMockApi();
    const pageRegistry = new AtomRegistryImpl();
    const atom = pageRegistry.register("status");
    const wrapper = createWrapper({ api, pageRegistry });
    const { result } = renderHook(() => useActionExecutor(), { wrapper });

    const promise = result.current({
      type: "set-value",
      target: "status",
      value: "ready",
      debounce: 200,
    });

    expect(pageRegistry.store.get(atom)).toBeUndefined();
    vi.advanceTimersByTime(200);
    await act(async () => {
      await promise;
    });

    expect(pageRegistry.store.get(atom)).toBe("ready");
  });

  it("throttles repeated actions inside the cooldown window", async () => {
    const api = createMockApi();
    const pageRegistry = new AtomRegistryImpl();
    const atom = pageRegistry.register("status");
    const wrapper = createWrapper({ api, pageRegistry });
    const { result } = renderHook(() => useActionExecutor(), { wrapper });

    await act(async () => {
      await result.current({
        type: "set-value",
        target: "status",
        value: "first",
        throttle: 1000,
      });
      await result.current({
        type: "set-value",
        target: "status",
        value: "second",
        throttle: 1000,
      });
    });

    expect(pageRegistry.store.get(atom)).toBe("first");
  });
});
