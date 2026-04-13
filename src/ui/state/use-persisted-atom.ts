"use client";

import { useEffect } from "react";
import { useAtom } from "jotai/react";
import type { PrimitiveAtom } from "jotai";
import {
  readPersistedState,
  writePersistedState,
  type PersistStorage,
} from "./persist";

/** Bind a primitive atom to browser storage so its value survives page reloads. */
export function usePersistedAtom<T>(
  sourceAtom: PrimitiveAtom<T>,
  key: string,
  storage: PersistStorage,
): [T, (value: T) => void] {
  const [value, setValue] = useAtom(sourceAtom);

  useEffect(() => {
    const persisted = readPersistedState(key, storage);
    if (persisted !== undefined) {
      setValue(persisted as T);
    }
  }, [key, setValue, storage]);

  useEffect(() => {
    writePersistedState(key, value, storage);
  }, [key, storage, value]);

  return [value, setValue];
}
