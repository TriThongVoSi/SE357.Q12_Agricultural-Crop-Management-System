// User Entity - Public API
// Handles user profile and account management

// Types
export type {
    ProfileResponse,
    ProfileUpdateRequest,
    ProfileChangePasswordRequest,
} from './model/types';

// Schemas (for external validation needs)
export {
    ProfileResponseSchema,
    ProfileUpdateRequestSchema,
    ProfileChangePasswordRequestSchema,
} from './model/schemas';

// Keys
export { userKeys } from './model/keys';

// API Client
export { userApi } from './api/client';

// Hooks
export {
    useProfileMe,
    useProfileUpdate,
    useProfileChangePassword,
} from './api/hooks';
