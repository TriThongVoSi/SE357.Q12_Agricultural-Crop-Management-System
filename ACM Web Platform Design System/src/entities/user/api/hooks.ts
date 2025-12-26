import {
    useMutation,
    useQuery,
    useQueryClient,
    type UseMutationOptions,
    type UseQueryOptions,
} from '@tanstack/react-query';
import { userKeys } from '../model/keys';
import { userApi } from './client';
import type {
    ProfileResponse,
    ProfileUpdateRequest,
    ProfileChangePasswordRequest,
} from '../model/types';

// ═══════════════════════════════════════════════════════════════
// USER REACT QUERY HOOKS
// ═══════════════════════════════════════════════════════════════

export const useProfileMe = (
    options?: Omit<UseQueryOptions<ProfileResponse, Error>, 'queryKey' | 'queryFn'>
) => useQuery({
    queryKey: userKeys.me(),
    queryFn: userApi.getMe,
    staleTime: 5 * 60 * 1000,
    ...options,
});

export const useProfileUpdate = (
    options?: UseMutationOptions<ProfileResponse, Error, ProfileUpdateRequest, unknown>
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: userKeys.update(),
        mutationFn: async (data: ProfileUpdateRequest) => {
            const result = await userApi.updateProfile(data);
            queryClient.invalidateQueries({ queryKey: userKeys.me() });
            return result;
        },
        ...options,
    });
};

export const useProfileChangePassword = (
    options?: UseMutationOptions<ProfileResponse, Error, ProfileChangePasswordRequest, unknown>
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: userKeys.changePassword(),
        mutationFn: async (data: ProfileChangePasswordRequest) => {
            const result = await userApi.changePassword(data);
            queryClient.invalidateQueries({ queryKey: userKeys.me() });
            return result;
        },
        ...options,
    });
};
