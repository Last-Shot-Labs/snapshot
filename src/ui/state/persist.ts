"use client";

export type PersistStorage = "localStorage" | "sessionStorage";

function getStorage(storage: PersistStorage): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  return storage === "localStorage"
    ? window.localStorage
    : window.sessionStorage;
}

/** Build the storage key used for persisted Snapshot state entries. */
export function toPersistedStateKey(key: string): string {
  return `sn-state:${key}`;
}

/** Read and JSON-decode a persisted state value, returning `undefined` on failure or absence. */
export function readPersistedState(
  key: string,
  storage: PersistStorage,
): unknown {
  const target = getStorage(storage);
  if (!target) {
    return undefined;
  }

  try {
    const raw = target.getItem(toPersistedStateKey(key));
    return raw !== null ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

/** Serialize and store a persisted state value, ignoring browser storage failures. */
export function writePersistedState(
  key: string,
  value: unknown,
  storage: PersistStorage,
): void {
  const target = getStorage(storage);
  if (!target) {
    return;
  }

  try {
    target.setItem(toPersistedStateKey(key), JSON.stringify(value));
  } catch {
    // Ignore storage failures.
  }
}

/** Remove a persisted state value from the selected browser storage area. */
export function clearPersistedState(
  key: string,
  storage: PersistStorage,
): void {
  const target = getStorage(storage);
  if (!target) {
    return;
  }

  try {
    target.removeItem(toPersistedStateKey(key));
  } catch {
    // Ignore storage failures.
  }
}
