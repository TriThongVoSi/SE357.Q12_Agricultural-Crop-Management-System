// AI Entity - Public API
// Handles AI features for Farmer, Admin, and Buyer roles

// Types
export type {
    AiSuggestionParams,
    AiSuggestion,
    YieldPredictionParams,
    YieldPrediction,
    CostOptimizationParams,
    CostOptimization,
    AiQaRequest,
    AiQaResponse,
} from './model/types';

// Schemas
export {
    AiSuggestionParamsSchema,
    AiSuggestionSchema,
    YieldPredictionParamsSchema,
    YieldPredictionSchema,
    CostOptimizationParamsSchema,
    CostOptimizationSchema,
    AiQaRequestSchema,
    AiQaResponseSchema,
} from './model/schemas';

// Keys
export { aiKeys } from './model/keys';

// API Client
export { aiApi } from './api/client';

// Farmer AI Hooks
export {
    useAiSuggestions,
    useYieldPrediction,
    useCostOptimization,
} from './api/hooks';

// Admin/Buyer AI Hooks
export { useAiQa } from './api/hooks';
