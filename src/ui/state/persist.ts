'use client';

export type PersistStorage = "localStorage" | "sessionStorage";

function getStorage(storage: PersistStorage): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  return storage === "localStorage" ? window.localStorage : window.sessionStorage;
}

export function toPersistedStateKey(key: string): string {
  return `sn-state:${key}`;
}

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
