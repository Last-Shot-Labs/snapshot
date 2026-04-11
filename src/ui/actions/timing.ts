const debounceTimers = new Map<string, ReturnType<typeof setTimeout>>();
const debounceWaiters = new Map<
  string,
  Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
  }>
>();
const throttleTimestamps = new Map<string, number>();

/**
 * Debounce async or sync action execution by key and resolve all pending callers
 * with the final invocation result.
 */
export function debounceAction<T>(
  key: string,
  fn: () => Promise<T> | T,
  ms: number,
): Promise<T> {
  const existing = debounceTimers.get(key);
  if (existing) {
    clearTimeout(existing);
  }

  return new Promise<T>((resolve, reject) => {
    const waiters = debounceWaiters.get(key) ?? [];
    waiters.push({
      resolve: resolve as (value: unknown) => void,
      reject,
    });
    debounceWaiters.set(key, waiters);

    const timer = setTimeout(async () => {
      debounceTimers.delete(key);
      const pending = debounceWaiters.get(key) ?? [];
      debounceWaiters.delete(key);

      try {
        const result = await fn();
        for (const waiter of pending) {
          waiter.resolve(result);
        }
      } catch (error) {
        for (const waiter of pending) {
          waiter.reject(error);
        }
      }
    }, ms);

    debounceTimers.set(key, timer);
  });
}

/**
 * Throttle async or sync action execution by key and drop calls inside the
 * active throttle window.
 */
export function throttleAction<T>(
  key: string,
  fn: () => Promise<T> | T,
  ms: number,
): Promise<T | undefined> {
  const now = Date.now();
  const lastRun = throttleTimestamps.get(key);
  if (lastRun !== undefined && now - lastRun < ms) {
    return Promise.resolve(undefined);
  }

  throttleTimestamps.set(key, now);
  return Promise.resolve(fn());
}
