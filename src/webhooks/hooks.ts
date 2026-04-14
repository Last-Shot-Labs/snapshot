import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import type { ApiClient } from "../api/client";
import type { ApiError } from "../api/error";
import type {
  WebhookEndpointResponse,
  CreateWebhookEndpointBody,
  UpdateWebhookEndpointBody,
  WebhookDeliveryResponse,
  ListWebhookDeliveriesParams,
  TestWebhookBody,
} from "./types";
import type { PaginatedResponse } from "../community/types";

// ── Cache key helpers ──────────────────────────────────────────────────────────

const keys = {
  endpoints: () => ["webhooks", "endpoints"] as const,
  endpoint: (endpointId: string) =>
    ["webhooks", "endpoints", endpointId] as const,
  deliveries: (endpointId: string) =>
    ["webhooks", "deliveries", endpointId] as const,
  deliveryDetail: (deliveryId: string) =>
    ["webhooks", "deliveries", "detail", deliveryId] as const,
};

// ── Factory ───────────────────────────────────────────────────────────────────

/**
 * Creates a set of React hooks for managing webhook endpoints, deliveries, and testing.
 *
 * @param options - Factory configuration.
 * @param options.api - The API client used to make HTTP requests.
 * @param options.queryClient - The TanStack Query client for cache management.
 * @returns An object containing all webhook-related query and mutation hooks.
 */
export function createWebhookHooks({
  api,
  queryClient: _qc,
}: {
  api: ApiClient;
  queryClient: QueryClient;
}) {
  // ── Endpoints ─────────────────────────────────────────────────────────────────

  /** Fetch all webhook endpoints for the current account. */
  function useWebhookEndpoints() {
    return useQuery<WebhookEndpointResponse[], ApiError>({
      queryKey: keys.endpoints(),
      queryFn: () => api.get<WebhookEndpointResponse[]>("/webhooks/endpoints"),
    });
  }

  /** Fetch a single webhook endpoint by its ID. */
  function useWebhookEndpoint(endpointId: string) {
    return useQuery<WebhookEndpointResponse, ApiError>({
      queryKey: keys.endpoint(endpointId),
      queryFn: () =>
        api.get<WebhookEndpointResponse>(`/webhooks/endpoints/${endpointId}`),
      enabled: !!endpointId,
    });
  }

  /** Create a new webhook endpoint and invalidate the endpoints cache. */
  function useCreateWebhookEndpoint() {
    const queryClient = useQueryClient();
    return useMutation<
      WebhookEndpointResponse,
      ApiError,
      CreateWebhookEndpointBody
    >({
      mutationFn: (body) =>
        api.post<WebhookEndpointResponse>("/webhooks/endpoints", body),
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: keys.endpoints() });
      },
    });
  }

  /** Update an existing webhook endpoint and invalidate related caches. */
  function useUpdateWebhookEndpoint() {
    const queryClient = useQueryClient();
    return useMutation<
      WebhookEndpointResponse,
      ApiError,
      { endpointId: string } & UpdateWebhookEndpointBody
    >({
      mutationFn: ({ endpointId, ...body }) =>
        api.patch<WebhookEndpointResponse>(
          `/webhooks/endpoints/${endpointId}`,
          body,
        ),
      onSuccess: (_data, { endpointId }) => {
        void queryClient.invalidateQueries({ queryKey: keys.endpoints() });
        void queryClient.invalidateQueries({
          queryKey: keys.endpoint(endpointId),
        });
      },
    });
  }

  /** Delete a webhook endpoint and invalidate the endpoints cache. */
  function useDeleteWebhookEndpoint() {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, { endpointId: string }>({
      mutationFn: ({ endpointId }) =>
        api.delete<void>(`/webhooks/endpoints/${endpointId}`),
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: keys.endpoints() });
      },
    });
  }

  // ── Deliveries ────────────────────────────────────────────────────────────────

  /** List webhook deliveries for a given endpoint with pagination. */
  function useWebhookDeliveries({
    endpointId,
    page,
    pageSize,
  }: ListWebhookDeliveriesParams) {
    const query = `?page=${page ?? 1}&pageSize=${pageSize ?? 20}`;
    return useQuery<PaginatedResponse<WebhookDeliveryResponse>, ApiError>({
      queryKey: keys.deliveries(endpointId),
      queryFn: () =>
        api.get<PaginatedResponse<WebhookDeliveryResponse>>(
          `/webhooks/endpoints/${endpointId}/deliveries${query}`,
        ),
      enabled: !!endpointId,
    });
  }

  /** Fetch a single webhook delivery by its ID. */
  function useWebhookDelivery(deliveryId: string) {
    return useQuery<WebhookDeliveryResponse, ApiError>({
      queryKey: keys.deliveryDetail(deliveryId),
      queryFn: () =>
        api.get<WebhookDeliveryResponse>(`/webhooks/deliveries/${deliveryId}`),
      enabled: !!deliveryId,
    });
  }

  // ── Test ──────────────────────────────────────────────────────────────────────

  /** Send a test event to a webhook endpoint and refresh its deliveries. */
  function useTestWebhookEndpoint() {
    const queryClient = useQueryClient();
    return useMutation<
      void,
      ApiError,
      { endpointId: string } & TestWebhookBody
    >({
      mutationFn: ({ endpointId, ...body }) =>
        api.post<void>(`/webhooks/endpoints/${endpointId}/test`, body),
      onSuccess: (_data, { endpointId }) => {
        void queryClient.invalidateQueries({
          queryKey: keys.deliveries(endpointId),
        });
      },
    });
  }

  // ── Return all hooks ──────────────────────────────────────────────────────────

  return {
    useWebhookEndpoints,
    useWebhookEndpoint,
    useCreateWebhookEndpoint,
    useUpdateWebhookEndpoint,
    useDeleteWebhookEndpoint,
    useWebhookDeliveries,
    useWebhookDelivery,
    useTestWebhookEndpoint,
  };
}

/**
 * Hook surface returned by `createWebhookHooks()`.
 */
export type WebhookHooks = ReturnType<typeof createWebhookHooks>;
