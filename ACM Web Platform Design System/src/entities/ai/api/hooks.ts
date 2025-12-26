import {
    useMutation,
    useQuery,
    type UseMutationOptions,
    type UseQueryOptions,
} from '@tanstack/react-query';
import { aiKeys } from '../model/keys';
import { aiApi } from './client';
import type {
    AiSuggestion,
    AiSuggestionParams,
    YieldPrediction,
    YieldPredictionParams,
    CostOptimization,
    CostOptimizationParams,
    AiQaRequest,
    AiQaResponse,
} from '../model/types';

// ═══════════════════════════════════════════════════════════════
// FARMER AI HOOKS
// ═══════════════════════════════════════════════════════════════

export const useAiSuggestions = (
    params: AiSuggestionParams,
    options?: Omit<UseQueryOptions<AiSuggestion[], Error>, 'queryKey' | 'queryFn'>
) => useQuery({
    queryKey: aiKeys.suggestions(params),
    queryFn: () => aiApi.getSuggestions(params),
    enabled: params.seasonId > 0,
    staleTime: 10 * 60 * 1000, // AI suggestions cache for 10 minutes
    ...options,
});

export const useYieldPrediction = (
    params: YieldPredictionParams,
    options?: Omit<UseQueryOptions<YieldPrediction, Error>, 'queryKey' | 'queryFn'>
) => useQuery({
    queryKey: aiKeys.yieldPrediction(params),
    queryFn: () => aiApi.predictYield(params),
    enabled: params.seasonId > 0,
    staleTime: 30 * 60 * 1000, // Yield predictions cache for 30 minutes
    ...options,
});

export const useCostOptimization = (
    params: CostOptimizationParams,
    options?: Omit<UseQueryOptions<CostOptimization, Error>, 'queryKey' | 'queryFn'>
) => useQuery({
    queryKey: aiKeys.costOptimization(params),
    queryFn: () => aiApi.optimizeCost(params),
    enabled: params.seasonId > 0,
    staleTime: 30 * 60 * 1000, // Cost optimization cache for 30 minutes
    ...options,
});

// ═══════════════════════════════════════════════════════════════
// ADMIN/BUYER AI HOOKS
// ═══════════════════════════════════════════════════════════════

export const useAiQa = (
    options?: UseMutationOptions<AiQaResponse, Error, AiQaRequest>
) => useMutation({
    mutationFn: aiApi.askQuestion,
    ...options,
});
