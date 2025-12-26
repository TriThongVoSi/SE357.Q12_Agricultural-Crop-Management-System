import { z } from 'zod';

// ═══════════════════════════════════════════════════════════════
// FARMER PROFILE DATA
// ═══════════════════════════════════════════════════════════════

export interface FarmerProfileData {
  // Personal Information
  id: number;
  username: string;
  displayName: string;
  email: string;
  phone: string;
  address: string;
  bio?: string;
  
  // Metadata
  role: 'farmer';
  status: 'active' | 'inactive';
  joinedDate: string;
  lastLogin: string;
  
  // Avatar
  avatarUrl?: string;
}

// ═══════════════════════════════════════════════════════════════
// FARM OVERVIEW STATS
// ═══════════════════════════════════════════════════════════════

export interface FarmOverviewStats {
  totalFarms: number;
  totalArea: number; // in hectares
  totalPlots: number;
  activeSeasons: number;
}

// ═══════════════════════════════════════════════════════════════
// RECENT ACTIVITY
// ═══════════════════════════════════════════════════════════════

export interface RecentActivity {
  id: string;
  type: 'task' | 'season' | 'plot' | 'harvest' | 'field_log';
  date: string;
  description: string;
  icon?: 'check' | 'calendar' | 'map' | 'box' | 'book';
}

// ═══════════════════════════════════════════════════════════════
// NOTIFICATION PREFERENCES
// ═══════════════════════════════════════════════════════════════

export interface NotificationPreferences {
  taskReminders: boolean;
  incidentAlerts: boolean;
}

// ═══════════════════════════════════════════════════════════════
// EDIT PROFILE FORM
// ═══════════════════════════════════════════════════════════════

export const EditProfileFormSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().max(20).optional().or(z.literal("")),
  address: z.string().max(200).optional().or(z.literal("")),
  bio: z.string().max(200, "Bio must be less than 200 characters").optional(),
});

export type EditProfileFormData = z.infer<typeof EditProfileFormSchema>;

// ═══════════════════════════════════════════════════════════════
// CHANGE PASSWORD FORM
// ═══════════════════════════════════════════════════════════════

export const ChangePasswordFormSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ChangePasswordFormData = z.infer<typeof ChangePasswordFormSchema>;

