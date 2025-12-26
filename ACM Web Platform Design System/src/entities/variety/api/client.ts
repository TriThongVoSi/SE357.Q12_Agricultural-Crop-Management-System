import httpClient from '@/shared/api/http';
import { parseApiResponse } from '@/shared/api/types';
import { z } from 'zod';
import {
    VarietySchema,
    VarietyRequestSchema,
} from '../model/schemas';
import type {
    Variety,
    VarietyRequest,
} from '../model/types';

// ═══════════════════════════════════════════════════════════════
// VARIETY API CLIENT
// Pure Axios calls with Zod validation (no React dependencies)
// ═══════════════════════════════════════════════════════════════

export const varietyApi = {
    /**
     * List all varieties belonging to a crop
     * GET /api/v1/varieties/by-crop/{cropId}
     * Auth: ADMIN/FARMER
     */
    listByCrop: async (cropId: number): Promise<Variety[]> => {
        const response = await httpClient.get(`/api/v1/varieties/by-crop/${cropId}`);
        return parseApiResponse(response.data, z.array(VarietySchema));
    },

    /**
     * Get a single variety by ID
     * GET /api/v1/varieties/{id}
     * Auth: ADMIN/FARMER
     */
    getById: async (id: number): Promise<Variety> => {
        const response = await httpClient.get(`/api/v1/varieties/${id}`);
        return parseApiResponse(response.data, VarietySchema);
    },

    /**
     * Create a new crop variety
     * POST /api/v1/varieties
     * Auth: ADMIN only
     */
    create: async (data: VarietyRequest): Promise<Variety> => {
        const validatedPayload = VarietyRequestSchema.parse(data);
        const response = await httpClient.post('/api/v1/varieties', validatedPayload);
        return parseApiResponse(response.data, VarietySchema);
    },

    /**
     * Update crop variety
     * PUT /api/v1/varieties/{id}
     * Auth: ADMIN only
     */
    update: async (id: number, data: VarietyRequest): Promise<Variety> => {
        const validatedPayload = VarietyRequestSchema.parse(data);
        const response = await httpClient.put(`/api/v1/varieties/${id}`, validatedPayload);
        return parseApiResponse(response.data, VarietySchema);
    },

    /**
     * Delete crop variety
     * DELETE /api/v1/varieties/{id}
     * Auth: ADMIN only
     */
    delete: async (id: number): Promise<void> => {
        await httpClient.delete(`/api/v1/varieties/${id}`);
    },
};
