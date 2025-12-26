import {
    useMutation,
    useQuery,
    useQueryClient,
    type UseMutationOptions,
    type UseQueryOptions,
} from '@tanstack/react-query';
import { varietyKeys } from '../model/keys';
import { varietyApi } from './client';
import type {
    Variety,
    VarietyRequest,
} from '../model/types';

// ═══════════════════════════════════════════════════════════════
// VARIETY REACT QUERY HOOKS
// ═══════════════════════════════════════════════════════════════

/**
 * Hook to fetch varieties for a specific crop
 */
export const useVarietiesByCrop = (
    cropId: number,
    options?: Omit<UseQueryOptions<Variety[], Error>, 'queryKey' | 'queryFn'>
) => useQuery({
    queryKey: varietyKeys.listByCrop(cropId),
    queryFn: () => varietyApi.listByCrop(cropId),
    enabled: cropId > 0,
    staleTime: 5 * 60 * 1000,
    ...options,
});

/**
 * Hook to fetch a single variety by ID
 */
export const useVarietyById = (
    id: number,
    options?: Omit<UseQueryOptions<Variety, Error>, 'queryKey' | 'queryFn'>
) => useQuery({
    queryKey: varietyKeys.detail(id),
    queryFn: () => varietyApi.getById(id),
    enabled: id > 0,
    staleTime: 5 * 60 * 1000,
    ...options,
});

/**
 * Hook to create a new variety (ADMIN only)
 */
export const useCreateVariety = (
    options?: UseMutationOptions<Variety, Error, VarietyRequest>
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: varietyApi.create,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: varietyKeys.listByCrop(data.cropId) });
        },
        ...options,
    });
};

/**
 * Hook to update an existing variety (ADMIN only)
 */
export const useUpdateVariety = (
    options?: UseMutationOptions<Variety, Error, { id: number; data: VarietyRequest }>
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => varietyApi.update(id, data),
        onSuccess: (data, { id }) => {
            queryClient.invalidateQueries({ queryKey: varietyKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: varietyKeys.listByCrop(data.cropId) });
        },
        ...options,
    });
};

/**
 * Hook to delete a variety (ADMIN only)
 */
export const useDeleteVariety = (
    cropId: number,
    options?: UseMutationOptions<void, Error, number>
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: varietyApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: varietyKeys.listByCrop(cropId) });
        },
        ...options,
    });
};
