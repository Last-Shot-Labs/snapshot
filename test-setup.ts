/**
 * Test setup for bun test — provides browser globals via happy-dom.
 * This enables @testing-library/react to run in bun test's environment.
 */
import { GlobalWindow } from "happy-dom";

const win = new GlobalWindow();

// Install browser globals needed by @testing-library/react
Object.assign(globalThis, {
  window: win,
  document: win.document,
  navigator: win.navigator,
  location: win.location,
  history: win.history,
  HTMLElement: win.HTMLElement,
  HTMLInputElement: win.HTMLInputElement,
  HTMLButtonElement: win.HTMLButtonElement,
  HTMLSelectElement: win.HTMLSelectElement,
  HTMLTextAreaElement: win.HTMLTextAreaElement,
  HTMLFormElement: win.HTMLFormElement,
  HTMLDivElement: win.HTMLDivElement,
  HTMLAnchorElement: win.HTMLAnchorElement,
  HTMLImageElement: win.HTMLImageElement,
  HTMLSpanElement: win.HTMLSpanElement,
  Element: win.Element,
  Node: win.Node,
  Text: win.Text,
  DocumentFragment: win.DocumentFragment,
  MutationObserver: win.MutationObserver,
  Event: win.Event,
  CustomEvent: win.CustomEvent,
  KeyboardEvent: win.KeyboardEvent,
  MouseEvent: win.MouseEvent,
  FocusEvent: win.FocusEvent,
  InputEvent: win.InputEvent,
  requestAnimationFrame: (cb: FrameRequestCallback) => setTimeout(cb, 16),
  cancelAnimationFrame: clearTimeout,
});
