/**
 * Test setup file for bun test runner.
 * Configures happy-dom globals so @testing-library/react works correctly.
 * Loaded via bunfig.toml [test] preload.
 *
 * We use happy-dom (not jsdom) because:
 * - The tests were originally written targeting happy-dom
 * - happy-dom allows configurable window.location (needed by executor tests)
 * - happy-dom is already a devDependency
 */
import { GlobalWindow } from "happy-dom";
// afterEach is a global provided by bun's test runner at runtime.
// It's not in @types/node, so we declare it here for TypeScript.
declare function afterEach(fn: () => void): void;

const win = new GlobalWindow() as any;

// Assign necessary globals to globalThis
function setGlobal(name: string, value: any) {
  if (value !== undefined) {
    Object.defineProperty(globalThis, name, {
      value,
      writable: true,
      configurable: true,
    });
  }
}

// Core window/document
setGlobal("window", win);
setGlobal("document", win.document);
setGlobal("navigator", win.navigator);
setGlobal("location", win.location);
setGlobal("history", win.history);
setGlobal("localStorage", win.localStorage);
setGlobal("sessionStorage", win.sessionStorage);

// DOM element classes
setGlobal("HTMLElement", win.HTMLElement);
setGlobal("HTMLInputElement", win.HTMLInputElement);
setGlobal("HTMLButtonElement", win.HTMLButtonElement);
setGlobal("HTMLFormElement", win.HTMLFormElement);
setGlobal("HTMLSelectElement", win.HTMLSelectElement);
setGlobal("HTMLTextAreaElement", win.HTMLTextAreaElement);
setGlobal("HTMLAnchorElement", win.HTMLAnchorElement);
setGlobal("HTMLImageElement", win.HTMLImageElement);
setGlobal("HTMLDivElement", win.HTMLDivElement);
setGlobal("Element", win.Element);
setGlobal("Node", win.Node);
setGlobal("NodeList", win.NodeList);
setGlobal("EventTarget", win.EventTarget);

// Event classes
setGlobal("Event", win.Event);
setGlobal("CustomEvent", win.CustomEvent);
setGlobal("MouseEvent", win.MouseEvent);
setGlobal("KeyboardEvent", win.KeyboardEvent);
setGlobal("InputEvent", win.InputEvent);
setGlobal("FocusEvent", win.FocusEvent);
setGlobal("PointerEvent", win.PointerEvent);

// Observer APIs
setGlobal("MutationObserver", win.MutationObserver);
setGlobal(
  "ResizeObserver",
  win.ResizeObserver ??
    class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
);
setGlobal(
  "IntersectionObserver",
  win.IntersectionObserver ??
    class IntersectionObserver {
      constructor(
        public callback: any,
        public options?: any,
      ) {}
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    },
);

// SVG/Text/Fragment
setGlobal("SVGElement", win.SVGElement);
setGlobal("Text", win.Text);
setGlobal("DocumentFragment", win.DocumentFragment);
setGlobal("Range", win.Range);

// Parsing
setGlobal("DOMParser", win.DOMParser);
setGlobal("XMLSerializer", win.XMLSerializer);

// File APIs
setGlobal("FileReader", win.FileReader);

// Window methods (bound to window)
setGlobal(
  "requestAnimationFrame",
  win.requestAnimationFrame?.bind(win) ??
    ((cb: FrameRequestCallback) => setTimeout(cb, 0)),
);
setGlobal(
  "cancelAnimationFrame",
  win.cancelAnimationFrame?.bind(win) ?? clearTimeout,
);
setGlobal("getComputedStyle", win.getComputedStyle?.bind(win));
setGlobal("matchMedia", win.matchMedia?.bind(win));
setGlobal("scrollTo", win.scrollTo?.bind(win) ?? (() => {}));
setGlobal("scrollBy", win.scrollBy?.bind(win) ?? (() => {}));

// Web platform APIs (use built-ins as fallback)
setGlobal("fetch", globalThis.fetch);
setGlobal("Headers", win.Headers ?? globalThis.Headers);
setGlobal("Request", win.Request ?? globalThis.Request);
setGlobal("Response", win.Response ?? globalThis.Response);
setGlobal("AbortController", win.AbortController ?? globalThis.AbortController);
setGlobal("AbortSignal", win.AbortSignal ?? globalThis.AbortSignal);
setGlobal("URL", win.URL ?? globalThis.URL);
setGlobal("URLSearchParams", win.URLSearchParams ?? globalThis.URLSearchParams);
setGlobal("FormData", win.FormData ?? globalThis.FormData);
setGlobal("Blob", win.Blob ?? globalThis.Blob);
setGlobal("File", win.File ?? globalThis.File);
setGlobal("crypto", win.crypto ?? globalThis.crypto);
setGlobal("performance", win.performance ?? globalThis.performance);

// Clean up the document body after each test to prevent DOM state leakage
// across test files (bun test runs all files in the same process).
afterEach(() => {
  if (typeof document !== "undefined" && document.body) {
    document.body.innerHTML = "";
  }
});
