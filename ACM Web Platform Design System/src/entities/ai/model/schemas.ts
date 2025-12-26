import { z } from 'zod';

// ═══════════════════════════════════════════════════════════════
// AI SUGGESTION PARAMS (Farmer)
// ═══════════════════════════════════════════════════════════════

export const AiSuggestionParamsSchema = z.object({
    seasonId: z.number().int().positive('Season ID is required'),
    context: z.string().optional(),
});

export type AiSuggestionParams = z.infer<typeof AiSuggestionParamsSchema>;

// ═══════════════════════════════════════════════════════════════
// AI SUGGESTION RESPONSE
// ═══════════════════════════════════════════════════════════════

export const AiSuggestionSchema = z.object({
    category: z.string(),
    title: z.string(),
    description: z.string(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    actionable: z.boolean().optional(),
});

export type AiSuggestion = z.infer<typeof AiSuggestionSchema>;

// ═══════════════════════════════════════════════════════════════
// YIELD PREDICTION PARAMS
// ═══════════════════════════════════════════════════════════════

export const YieldPredictionParamsSchema = z.object({
    seasonId: z.number().int().positive('Season ID is required'),
});

export type YieldPredictionParams = z.infer<typeof YieldPredictionParamsSchema>;

// ═══════════════════════════════════════════════════════════════
// YIELD PREDICTION RESPONSE
// ═══════════════════════════════════════════════════════════════

export const YieldPredictionSchema = z.object({
    seasonId: z.number().int(),
    predictedYieldKg: z.number(),
    confidencePercent: z.number().min(0).max(100).optional(),
    factors: z.array(z.string()).optional(),
});

export type YieldPrediction = z.infer<typeof YieldPredictionSchema>;

// ═══════════════════════════════════════════════════════════════
// COST OPTIMIZATION PARAMS
// ═══════════════════════════════════════════════════════════════

export const CostOptimizationParamsSchema = z.object({
    seasonId: z.number().int().positive('Season ID is required'),
});

export type CostOptimizationParams = z.infer<typeof CostOptimizationParamsSchema>;

// ═══════════════════════════════════════════════════════════════
// COST OPTIMIZATION RESPONSE
// ═══════════════════════════════════════════════════════════════

export const CostOptimizationSchema = z.object({
    seasonId: z.number().int(),
    currentCost: z.number(),
    suggestedSavings: z.number(),
    recommendations: z.array(z.object({
        category: z.string(),
        description: z.string(),
        potentialSavings: z.number(),
    })),
});

export type CostOptimization = z.infer<typeof CostOptimizationSchema>;

// ═══════════════════════════════════════════════════════════════
// AI Q&A REQUEST (Admin/Buyer)
// ═══════════════════════════════════════════════════════════════

export const AiQaRequestSchema = z.object({
    question: z.string().min(1, 'Question is required'),
    context: z.string().optional(),
});

export type AiQaRequest = z.infer<typeof AiQaRequestSchema>;

// ═══════════════════════════════════════════════════════════════
// AI Q&A RESPONSE
// ═══════════════════════════════════════════════════════════════

export const AiQaResponseSchema = z.object({
    answer: z.string(),
    sources: z.array(z.string()).optional(),
    confidence: z.number().min(0).max(1).optional(),
});

export type AiQaResponse = z.infer<typeof AiQaResponseSchema>;
