import type { QueryClient } from "@tanstack/react-query";
import type { ApiClient } from "../api/client";
import type { ApiError } from "../api/error";
import type { WebhookEndpointResponse, CreateWebhookEndpointBody, UpdateWebhookEndpointBody, WebhookDeliveryResponse, ListWebhookDeliveriesParams, TestWebhookBody } from "./types";
import type { PaginatedResponse } from "../community/types";
export declare function createWebhookHooks({ api, queryClient: _qc, }: {
    api: ApiClient;
    queryClient: QueryClient;
}): {
    useWebhookEndpoints: () => import("@tanstack/react-query").UseQueryResult<WebhookEndpointResponse[], ApiError>;
    useWebhookEndpoint: (endpointId: string) => import("@tanstack/react-query").UseQueryResult<WebhookEndpointResponse, ApiError>;
    useCreateWebhookEndpoint: () => import("@tanstack/react-query").UseMutationResult<WebhookEndpointResponse, ApiError, CreateWebhookEndpointBody, unknown>;
    useUpdateWebhookEndpoint: () => import("@tanstack/react-query").UseMutationResult<WebhookEndpointResponse, ApiError, {
        endpointId: string;
    } & UpdateWebhookEndpointBody, unknown>;
    useDeleteWebhookEndpoint: () => import("@tanstack/react-query").UseMutationResult<void, ApiError, {
        endpointId: string;
    }, unknown>;
    useWebhookDeliveries: ({ endpointId, page, pageSize, }: ListWebhookDeliveriesParams) => import("@tanstack/react-query").UseQueryResult<PaginatedResponse<WebhookDeliveryResponse>, ApiError>;
    useWebhookDelivery: (deliveryId: string) => import("@tanstack/react-query").UseQueryResult<WebhookDeliveryResponse, ApiError>;
    useTestWebhookEndpoint: () => import("@tanstack/react-query").UseMutationResult<void, ApiError, {
        endpointId: string;
    } & TestWebhookBody, unknown>;
};
export type WebhookHooks = ReturnType<typeof createWebhookHooks>;
