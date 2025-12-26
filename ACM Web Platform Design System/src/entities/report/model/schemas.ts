import { z } from 'zod';
import { DateSchema } from '@/shared/api/types';

// ═══════════════════════════════════════════════════════════════
// REPORT LIST PARAMS
// ═══════════════════════════════════════════════════════════════

export const ReportListParamsSchema = z.object({
    type: z.string().optional(),
    from: DateSchema.optional(),
    to: DateSchema.optional(),
    page: z.number().int().min(0).default(0),
    size: z.number().int().min(1).default(20),
});

export type ReportListParams = z.infer<typeof ReportListParamsSchema>;

// ═══════════════════════════════════════════════════════════════
// REPORT RESPONSE
// ═══════════════════════════════════════════════════════════════

export const ReportSchema = z.object({
    id: z.number().int().positive(),
    title: z.string(),
    reportType: z.string(),
    description: z.string().optional().nullable(),
    generatedAt: z.string().datetime().optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});

export type Report = z.infer<typeof ReportSchema>;

// ═══════════════════════════════════════════════════════════════
// REPORT DETAIL RESPONSE
// ═══════════════════════════════════════════════════════════════

export const ReportDetailSchema = ReportSchema.extend({
    content: z.string().optional().nullable(),
    data: z.record(z.unknown()).optional().nullable(),
});

export type ReportDetail = z.infer<typeof ReportDetailSchema>;

// ═══════════════════════════════════════════════════════════════
// REPORT CREATE REQUEST (Admin)
// ═══════════════════════════════════════════════════════════════

export const ReportCreateRequestSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    reportType: z.string().min(1, 'Report type is required'),
    description: z.string().optional(),
    content: z.string().optional(),
    data: z.record(z.unknown()).optional(),
});

export type ReportCreateRequest = z.infer<typeof ReportCreateRequestSchema>;

// ═══════════════════════════════════════════════════════════════
// REPORT UPDATE REQUEST (Admin)
// ═══════════════════════════════════════════════════════════════

export const ReportUpdateRequestSchema = ReportCreateRequestSchema;

export type ReportUpdateRequest = z.infer<typeof ReportUpdateRequestSchema>;
