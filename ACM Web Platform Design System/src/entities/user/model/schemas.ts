import { z } from 'zod';

// ═══════════════════════════════════════════════════════════════
// PROFILE RESPONSE
// ═══════════════════════════════════════════════════════════════

export const ProfileRoleSchema = z.object({
    id: z.number().int().positive().optional(),
    code: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional().nullable(),
});

export const ProfileResponseSchema = z.object({
    id: z.union([z.string(), z.number()]),
    username: z.string().min(1),
    roles: z.array(ProfileRoleSchema).optional(),
});

export type ProfileResponse = z.infer<typeof ProfileResponseSchema>;

// ═══════════════════════════════════════════════════════════════
// PROFILE UPDATE
// ═══════════════════════════════════════════════════════════════

export const ProfileUpdateRequestSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
}).strict();

export type ProfileUpdateRequest = z.infer<typeof ProfileUpdateRequestSchema>;

// ═══════════════════════════════════════════════════════════════
// CHANGE PASSWORD
// ═══════════════════════════════════════════════════════════════

export const ProfileChangePasswordRequestSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    roles: z.array(z.string()).optional(),
}).strict();

export type ProfileChangePasswordRequest = z.infer<typeof ProfileChangePasswordRequestSchema>;
