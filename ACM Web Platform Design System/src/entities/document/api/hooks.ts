import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { documentApi } from './client';
import { documentKeys } from '../model/keys';
import type { DocumentCreateRequest, DocumentUpdateRequest, DocumentListParams } from '../model/types';

/**
 * Hook to list documents with pagination, filters, and tab support
 */
export function useDocumentsList(params?: DocumentListParams) {
    return useQuery({
        queryKey: documentKeys.list(params),
        queryFn: () => documentApi.list(params),
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
}

/**
 * Hook to get single document by ID
 */
export function useDocument(id: number, enabled = true) {
    return useQuery({
        queryKey: documentKeys.detail(id),
        queryFn: () => documentApi.getById(id),
        enabled,
    });
}

/**
 * Hook to record document open (for Recent tab)
 */
export function useRecordDocumentOpen() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => documentApi.recordOpen(id),
        onSuccess: () => {
            // Invalidate recent tab queries
            queryClient.invalidateQueries({ queryKey: documentKeys.list({ tab: 'recent' }) });
        },
    });
}

/**
 * Hook to add document to favorites
 */
export function useAddFavorite() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => documentApi.addFavorite(id),
        onSuccess: () => {
            // Invalidate all document lists to refresh isFavorited status
            queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
        },
    });
}

/**
 * Hook to remove document from favorites
 */
export function useRemoveFavorite() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => documentApi.removeFavorite(id),
        onSuccess: () => {
            // Invalidate all document lists to refresh isFavorited status
            queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
        },
    });
}

// ==================== Admin Hooks ====================

/**
 * Hook to create document (admin)
 */
export function useCreateDocument() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: DocumentCreateRequest) => documentApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: documentKeys.all });
        },
    });
}

/**
 * Hook to update document (admin)
 */
export function useUpdateDocument() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: DocumentUpdateRequest }) =>
            documentApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: documentKeys.all });
        },
    });
}

/**
 * Hook to delete document (admin)
 */
export function useDeleteDocument() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => documentApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: documentKeys.all });
        },
    });
}

/**
 * Hook to toggle document active status (admin)
 */
export function useSetDocumentActive() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) =>
            documentApi.setActive(id, isActive),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: documentKeys.all });
        },
    });
}
