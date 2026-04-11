'use client';

import { useEffect } from "react";
import type { ActionConfig, ActionExecuteFn } from "../actions/types";
import type { WebSocketManager } from "../../ws/manager";

export type EventActionMap = Record<string, ActionConfig | ActionConfig[]>;

export function useEventBridge(
  wsManager: WebSocketManager<Record<string, unknown>> | null,
  events: EventActionMap | undefined,
  executeAction: ActionExecuteFn,
): void {
  useEffect(() => {
    if (!wsManager || !events) {
      return;
    }

    const cleanups: Array<() => void> = [];
    for (const [eventName, actionConfig] of Object.entries(events)) {
      const handler = (payload: unknown) => {
        void executeAction(actionConfig, {
          event: payload,
          eventName,
        });
      };

      wsManager.on(eventName, handler);
      cleanups.push(() => {
        wsManager.off(eventName, handler);
      });
    }

    return () => {
      for (const cleanup of cleanups) {
        cleanup();
      }
    };
  }, [events, executeAction, wsManager]);
}

export function useSseEventBridge(
  subscribe: (
    endpoint: string,
    event: string,
    handler: (payload: unknown) => void,
  ) => () => void,
  endpoints:
    | Record<
        string,
        {
          eventActions?: EventActionMap;
        }
      >
    | undefined,
  executeAction: ActionExecuteFn,
): void {
  useEffect(() => {
    if (!endpoints) {
      return;
    }

    const cleanups: Array<() => void> = [];
    for (const [endpoint, config] of Object.entries(endpoints)) {
      for (const [eventName, actionConfig] of Object.entries(
        config.eventActions ?? {},
      )) {
        cleanups.push(
          subscribe(endpoint, eventName, (payload) => {
            void executeAction(actionConfig, {
              event: payload,
              eventName,
              endpoint,
            });
          }),
        );
      }
    }

    return () => {
      for (const cleanup of cleanups) {
        cleanup();
      }
    };
  }, [endpoints, executeAction, subscribe]);
}
