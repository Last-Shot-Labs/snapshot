import React, { useEffect, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AppContextProvider,
  PageContextProvider,
  ToastContainer,
  ConfirmDialog,
  resolveTokens,
  resolveFrameworkStyles,
} from "@lastshotlabs/snapshot/ui";
import type { Decorator } from "@storybook/react-vite";
import { STORY_STATE } from "./component-fixtures";

export function SnapshotStoryProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: false, staleTime: Infinity },
          mutations: { retry: false },
        },
      }),
  );

  useEffect(() => {
    const existingTokens = document.getElementById("snapshot-storybook-tokens");
    if (existingTokens) {
      existingTokens.textContent = resolveTokens({ flavor: "ocean" });
    } else {
      const style = document.createElement("style");
      style.id = "snapshot-storybook-tokens";
      style.textContent = resolveTokens({ flavor: "ocean" });
      document.head.appendChild(style);
    }

    const existingFramework = document.getElementById("snapshot-storybook-framework");
    if (!existingFramework) {
      const fw = document.createElement("style");
      fw.id = "snapshot-storybook-framework";
      fw.textContent = resolveFrameworkStyles();
      document.head.appendChild(fw);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <PageContextProvider state={STORY_STATE}>
          {children}
          <ToastContainer />
          <ConfirmDialog />
        </PageContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  );
}

export const snapshotDecorator: Decorator = (Story) => (
  <SnapshotStoryProviders>
    <div style={{ padding: "2rem" }}>
      <Story />
    </div>
  </SnapshotStoryProviders>
);
