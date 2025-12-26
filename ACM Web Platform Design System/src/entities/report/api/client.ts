import httpClient from '@/shared/api/http';
import { parseApiResponse, parsePageResponse, type PageResponse } from '@/shared/api/types';
import {
    ReportListParamsSchema,
    ReportSchema,
    ReportDetailSchema,
    ReportCreateRequestSchema,
    ReportUpdateRequestSchema,
} from '../model/schemas';
import type {
    ReportListParams,
    Report,
    ReportDetail,
    ReportCreateRequest,
    ReportUpdateRequest,
} from '../model/types';

export const reportApi = {
    /** GET /api/v1/reports - List reports (Admin/Buyer) */
    list: async (params?: ReportListParams): Promise<PageResponse<Report>> => {
        const validatedParams = params ? ReportListParamsSchema.parse(params) : undefined;
        const response = await httpClient.get('/api/v1/reports', { params: validatedParams });
        return parsePageResponse(response.data, ReportSchema);
    },

    /** GET /api/v1/reports/{id} - Get report detail */
    getById: async (id: number): Promise<ReportDetail> => {
        const response = await httpClient.get(`/api/v1/reports/${id}`);
        return parseApiResponse(response.data, ReportDetailSchema);
    },

    /** POST /api/v1/admin/reports - Create report (Admin) */
    create: async (data: ReportCreateRequest): Promise<ReportDetail> => {
        const validatedPayload = ReportCreateRequestSchema.parse(data);
        const response = await httpClient.post('/api/v1/admin/reports', validatedPayload);
        return parseApiResponse(response.data, ReportDetailSchema);
    },

    /** PUT /api/v1/admin/reports/{id} - Update report (Admin) */
    update: async (id: number, data: ReportUpdateRequest): Promise<ReportDetail> => {
        const validatedPayload = ReportUpdateRequestSchema.parse(data);
        const response = await httpClient.put(`/api/v1/admin/reports/${id}`, validatedPayload);
        return parseApiResponse(response.data, ReportDetailSchema);
    },

    /** DELETE /api/v1/admin/reports/{id} - Delete report (Admin) */
    delete: async (id: number): Promise<void> => {
        await httpClient.delete(`/api/v1/admin/reports/${id}`);
    },
};
