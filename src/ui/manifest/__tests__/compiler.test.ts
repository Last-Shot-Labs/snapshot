import { describe, expect, it } from "vitest";
import {
  compileManifest,
  defineManifest,
  safeCompileManifest,
} from "../compiler";

describe("compiler", () => {
  it("compiles routes into a route map and page configs", () => {
    const manifest = defineManifest({
      app: {
        shell: "full-width",
        title: "Snapshot App",
        home: "/dashboard",
      },
      state: {
        user: {
          data: "GET /api/me",
          default: null,
        },
      },
      resources: {
        "users.list": {
          method: "GET",
          endpoint: "/api/users",
          refetchOnMount: true,
          refetchOnWindowFocus: true,
        },
      },
      workflows: {
        "users.after-save": {
          type: "toast",
          message: "Saved",
        },
        "users.sync": {
          type: "retry",
          attempts: 2,
          step: {
            type: "api",
            method: "POST",
            endpoint: "/api/users/sync",
          },
          onFailure: {
            type: "toast",
            message: "Sync failed",
          },
        },
        "users.reconcile": {
          type: "try",
          step: {
            type: "api",
            method: "POST",
            endpoint: "/api/users/reconcile",
          },
          catch: {
            type: "toast",
            message: "Reconcile failed",
          },
        },
        "users.fetch-current": {
          type: "capture",
          action: {
            type: "api",
            method: "GET",
            endpoint: { resource: "users.list" },
          },
          as: "current.users",
        },
      },
      routes: [
        {
          id: "dashboard",
          path: "/dashboard",
          title: "Dashboard",
          preload: [
            {
              resource: "users.list",
              params: {
                page: 2,
              },
            },
          ],
          refreshOnEnter: ["users.list"],
          invalidateOnLeave: ["users.list"],
          content: [{ type: "heading", text: "Dashboard" }],
        },
      ],
    });

    const compiled = compileManifest(manifest);

    expect(compiled.app.home).toBe("/dashboard");
    expect(compiled.state?.user?.data).toBe("GET /api/me");
    expect(compiled.workflows?.["users.after-save"]).toMatchObject({
      type: "toast",
      message: "Saved",
    });
    expect(compiled.workflows?.["users.sync"]).toMatchObject({
      type: "retry",
      attempts: 2,
      onFailure: {
        type: "toast",
        message: "Sync failed",
      },
    });
    expect(compiled.workflows?.["users.reconcile"]).toMatchObject({
      type: "try",
      catch: {
        type: "toast",
        message: "Reconcile failed",
      },
    });
    expect(compiled.workflows?.["users.fetch-current"]).toMatchObject({
      type: "capture",
      as: "current.users",
    });
    expect(compiled.resources?.["users.list"]?.refetchOnMount).toBe(true);
    expect(compiled.resources?.["users.list"]?.refetchOnWindowFocus).toBe(true);
    expect(compiled.routes[0]?.preload).toEqual([
      {
        resource: "users.list",
        params: {
          page: 2,
        },
      },
    ]);
    expect(compiled.routes[0]?.refreshOnEnter).toEqual(["users.list"]);
    expect(compiled.routes[0]?.invalidateOnLeave).toEqual(["users.list"]);
    expect(compiled.firstRoute?.id).toBe("dashboard");
    expect(compiled.routeMap["/dashboard"]?.page.title).toBe("Dashboard");
  });

  it("preserves auth screen options and redirects", () => {
    const compiled = compileManifest({
      auth: {
        screens: ["login"],
        redirects: {
          afterLogin: "/reports",
        },
        screenOptions: {
          login: {
            title: "Welcome back",
            submitLabel: "Continue",
            sections: ["providers", "form"],
            providers: [
              {
                provider: "google",
                label: "Use Google Workspace",
                autoRedirect: true,
              },
            ],
            providerMode: "auto",
            passkey: {
              enabled: true,
              autoPrompt: true,
            },
          },
        },
      },
      routes: [
        {
          id: "login",
          path: "/login",
          content: [{ type: "heading", text: "Login" }],
        },
      ],
    });

    expect(compiled.auth?.redirects?.afterLogin).toBe("/reports");
    expect(compiled.auth?.screenOptions?.login?.title).toBe("Welcome back");
    expect(compiled.auth?.screenOptions?.login?.sections).toEqual([
      "providers",
      "form",
    ]);
    expect(compiled.auth?.screenOptions?.login?.providers).toEqual([
      {
        provider: "google",
        label: "Use Google Workspace",
        autoRedirect: true,
      },
    ]);
    expect(compiled.auth?.screenOptions?.login?.providerMode).toBe("auto");
    expect(compiled.auth?.screenOptions?.login?.passkey).toEqual({
      enabled: true,
      autoPrompt: true,
    });
  });

  it("rejects auth screens without matching route ids", () => {
    const result = safeCompileManifest({
      auth: {
        screens: ["login"],
      },
      routes: [
        {
          id: "sign-in",
          path: "/sign-in",
          content: [{ type: "heading", text: "Login" }],
        },
      ],
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'Auth screen "login" is enabled but no route has id "login". Add { "id": "login", "path": "/your-path", ... } to routes.',
      );
    }
  });

  it("defaults app.home to the first route when omitted", () => {
    const compiled = compileManifest({
      routes: [
        {
          id: "home",
          path: "/",
          content: [{ type: "heading", text: "Home" }],
        },
      ],
    });

    expect(compiled.app.home).toBe("/");
  });

  it("returns zod errors from safeCompileManifest", () => {
    const result = safeCompileManifest({
      routes: [
        {
          id: "home",
          path: "home",
          content: [{ type: "heading", text: "Home" }],
        },
      ],
    });

    expect(result.success).toBe(false);
  });
});
