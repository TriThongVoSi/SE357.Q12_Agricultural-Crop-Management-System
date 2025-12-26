import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useProfileUpdate } from '@/entities/user';
import { EditProfileFormSchema, type EditProfileFormData, type FarmerProfileData } from '../types';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileData: FarmerProfileData;
}

/**
 * EditProfileDialog Component
 * 
 * Modal dialog for editing farmer profile information:
 * - Display name
 * - Email
 * - Phone
 * - Address
 * - Bio (optional)
 * 
 * Uses react-hook-form with zod validation
 */
export function EditProfileDialog({ open, onOpenChange, profileData }: EditProfileDialogProps) {
  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(EditProfileFormSchema),
    defaultValues: {
      displayName: profileData.displayName,
      email: profileData.email || '',
      phone: profileData.phone || '',
      address: profileData.address || '',
      bio: profileData.bio || '',
    },
  });

  const updateProfile = useProfileUpdate();

  useEffect(() => {
    form.reset({
      displayName: profileData.displayName,
      email: profileData.email || '',
      phone: profileData.phone || '',
      address: profileData.address || '',
      bio: profileData.bio || '',
    });
  }, [form, profileData]);

  const onSubmit = async (data: EditProfileFormData) => {
    try {
      await updateProfile.mutateAsync({
        username: data.displayName,
      });
      
      toast.success('Profile updated successfully!', {
        description: 'Your profile information has been saved.',
      });
      
      onOpenChange(false);
      form.reset(data);
    } catch (error) {
      toast.error('Failed to update profile', {
        description: 'Please try again later.',
      });
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Display Name */}
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormDescription>Updates your login and display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} disabled />
                  </FormControl>
                  <FormDescription>Email updates are managed by administrators.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(+84) 909 123 456" {...field} disabled />
                  </FormControl>
                  <FormDescription>Phone updates are not available yet.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your address" {...field} disabled />
                  </FormControl>
                  <FormDescription>Address updates are not available yet.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself and your farming practices..."
                      className="resize-none"
                      rows={3}
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormDescription>
                    Bio updates are not available yet.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || updateProfile.isPending}
                className="bg-[#3BA55D] hover:bg-[#2F9E44]"
              >
                {form.formState.isSubmitting || updateProfile.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

