import { z } from 'zod';
import { DateSchema } from '@/shared/api/types';

// ═══════════════════════════════════════════════════════════════
// EXPENSE LIST PARAMS
// ═══════════════════════════════════════════════════════════════

export const ExpenseListParamsSchema = z.object({
    from: DateSchema.optional(),
    to: DateSchema.optional(),
    minAmount: z.number().optional(),
    maxAmount: z.number().optional(),
    page: z.number().int().min(0).default(0),
    size: z.number().int().min(1).default(20),
});

export type ExpenseListParams = z.infer<typeof ExpenseListParamsSchema>;

// ═══════════════════════════════════════════════════════════════
// EXPENSE RESPONSE
// ═══════════════════════════════════════════════════════════════

export const ExpenseSchema = z.object({
    id: z.number().int().positive(),
    seasonId: z.number().int().positive().nullable().optional(),
    seasonName: z.string().nullable().optional(),
    userName: z.string().nullable().optional(),
    itemName: z.string().max(255),
    unitPrice: z.number().positive(),
    quantity: z.number().int().min(1),
    totalCost: z.number().nullable().optional(),
    expenseDate: DateSchema,
    createdAt: z.string().nullable().optional(),
});

export type Expense = z.infer<typeof ExpenseSchema>;

// ═══════════════════════════════════════════════════════════════
// EXPENSE CREATE REQUEST
// ═══════════════════════════════════════════════════════════════

export const ExpenseCreateRequestSchema = z.object({
    itemName: z.string().min(1, 'Item name is required').max(255),
    unitPrice: z.number().positive('Unit price must be positive'),
    quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    expenseDate: DateSchema,
});

export type ExpenseCreateRequest = z.infer<typeof ExpenseCreateRequestSchema>;

// ═══════════════════════════════════════════════════════════════
// EXPENSE UPDATE REQUEST
// ═══════════════════════════════════════════════════════════════

export const ExpenseUpdateRequestSchema = ExpenseCreateRequestSchema;

export type ExpenseUpdateRequest = z.infer<typeof ExpenseUpdateRequestSchema>;
