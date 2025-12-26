import {
    useMutation,
    useQuery,
    useQueryClient,
    type UseMutationOptions,
    type UseQueryOptions,
} from '@tanstack/react-query';
import type { PageResponse } from '@/shared/api/types';
import { reportKeys } from '../model/keys';
import { reportApi } from './client';
import type {
    ReportListParams,
    Report,
    ReportDetail,
    ReportCreateRequest,
    ReportUpdateRequest,
} from '../model/types';

// ═══════════════════════════════════════════════════════════════
// READ HOOKS (Admin/Buyer)
// ═══════════════════════════════════════════════════════════════

export const useReports = (
    params?: ReportListParams,
    options?: Omit<UseQueryOptions<PageResponse<Report>, Error>, 'queryKey' | 'queryFn'>
) => useQuery({
    queryKey: reportKeys.list(params),
    queryFn: () => reportApi.list(params),
    staleTime: 5 * 60 * 1000,
    ...options,
});

export const useReportById = (
    id: number,
    options?: Omit<UseQueryOptions<ReportDetail, Error>, 'queryKey' | 'queryFn'>
) => useQuery({
    queryKey: reportKeys.detail(id),
    queryFn: () => reportApi.getById(id),
    enabled: id > 0,
    staleTime: 5 * 60 * 1000,
    ...options,
});

// ═══════════════════════════════════════════════════════════════
// ADMIN MUTATION HOOKS
// ═══════════════════════════════════════════════════════════════

export const useCreateReport = (
    options?: UseMutationOptions<ReportDetail, Error, ReportCreateRequest>
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: reportApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: reportKeys.lists() });
        },
        ...options,
    });
};

export const useUpdateReport = (
    options?: UseMutationOptions<ReportDetail, Error, { id: number; data: ReportUpdateRequest }>
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => reportApi.update(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: reportKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: reportKeys.lists() });
        },
        ...options,
    });
};

export const useDeleteReport = (
    options?: UseMutationOptions<void, Error, number>
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: reportApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: reportKeys.lists() });
        },
        ...options,
    });
};
