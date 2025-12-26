import { useMemo, useState } from 'react';
import { useAuth } from '@/features/auth';
import { useProfileMe } from '@/entities/user';
import { useFarms } from '@/entities/farm';
import { usePlots } from '@/entities/plot';
import { useSeasons } from '@/entities/season';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  User, Calendar, Clock, Mail, Phone, MapPin, 
  Sprout, TrendingUp, Grid3x3, CalendarCheck,
  CheckCircle2, FileText, Package, BookOpen,
  Lock, Bell, KeyRound, ArrowRight, Shield,
  ChevronRight
} from 'lucide-react';
import { EditProfileDialog } from './EditProfileDialog';
import { ChangePasswordDialog } from './ChangePasswordDialog';
import type { 
  FarmerProfileData, 
  FarmOverviewStats, 
  RecentActivity,
  NotificationPreferences 
} from '../types';

/**
 * FarmerProfile Component
 * 
 * Main profile display component showing:
 * - Profile header with avatar, name, status
 * - Contact information
 * - Farm overview statistics
 * - Recent activity feed
 * - Security & notification settings
 */
export function FarmerProfile() {
  const { user } = useAuth();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationPreferences>({
    taskReminders: true,
    incidentAlerts: true,
  });

  const { data: profile, isLoading: profileLoading } = useProfileMe();
  const { data: farmsData } = useFarms();
  const { data: plotsData } = usePlots();
  const { data: seasonsData } = useSeasons();

  const farms = farmsData?.content ?? [];
  const plots = plotsData ?? [];
  const seasons = seasonsData?.items ?? [];

  const profileData: FarmerProfileData = useMemo(() => {
    const username = profile?.username || user?.username || 'farmer';
    return {
      id: Number(profile?.id ?? user?.id ?? 0),
      username,
      displayName: username,
      email: user?.email || 'Not available',
      phone: 'Not available',
      address: 'Not available',
      bio: undefined,
      role: 'farmer',
      status: 'active',
      joinedDate: 'Not available',
      lastLogin: 'Not available',
    };
  }, [profile, user]);

  const farmStats: FarmOverviewStats = useMemo(() => {
    const totalFarms = farms.length;
    const totalArea = farms.reduce((sum, farm) => {
      const areaValue = typeof farm.area === 'string' ? parseFloat(farm.area) : farm.area ?? 0;
      return sum + (Number.isFinite(areaValue) ? areaValue : 0);
    }, 0);
    const totalPlots = plots.length;
    const activeSeasons = seasons.filter((season) => season.status === 'ACTIVE').length;

    return {
      totalFarms,
      totalArea,
      totalPlots,
      activeSeasons,
    };
  }, [farms, plots, seasons]);

  const recentActivities: RecentActivity[] = [];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'task':
        return <CheckCircle2 className="w-4 h-4 text-[#3BA55D]" />;
      case 'field_log':
        return <BookOpen className="w-4 h-4 text-[#3BA55D]" />;
      case 'season':
        return <CalendarCheck className="w-4 h-4 text-[#3BA55D]" />;
      case 'plot':
        return <Grid3x3 className="w-4 h-4 text-[#3BA55D]" />;
      case 'harvest':
        return <Package className="w-4 h-4 text-[#3BA55D]" />;
      default:
        return <FileText className="w-4 h-4 text-[#3BA55D]" />;
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-[#777777]">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-[1280px] mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-base font-normal text-[#333333]">Farmer Profile</h1>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setPasswordDialogOpen(true)}
            className="border-[#E0E0E0] bg-[#F8F8F4] text-[#333333] hover:bg-[#F3EFE6]"
          >
            <KeyRound className="w-4 h-4 mr-2" />
            Change Password
          </Button>
          <Button
            onClick={() => setEditDialogOpen(true)}
            className="bg-[#3BA55D] hover:bg-[#2F9E44] text-white"
          >
            <User className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Profile Header Card */}
      <Card className="border-[#E0E0E0] shadow-sm">
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Avatar and Basic Info */}
            <div className="flex items-start gap-8">
              <Avatar className="w-24 h-24 border-4 border-[#3BA55D]/10">
                <AvatarFallback className="bg-[#3BA55D] text-white text-2xl">
                  {getInitials(profileData.displayName)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold text-[#333333]">
                    {profileData.displayName}
                  </h2>
                  <p className="text-base text-[#777777]">@{profileData.username}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-[#F3EFE6] text-[#333333]">
                    <Sprout className="w-3 h-3 mr-1" />
                    Farmer
                  </Badge>
                  <Badge className="bg-[#3BA55D]/10 text-[#3BA55D] border-[#3BA55D]/20">
                    <div className="w-2 h-2 rounded-full bg-[#3BA55D] mr-1.5" />
                    Active
                  </Badge>
                </div>

                {profileData.bio && (
                  <p className="text-base text-[#333333]/80 max-w-md">
                    {profileData.bio}
                  </p>
                )}
              </div>
            </div>

            <Separator className="bg-[#E0E0E0]" />

            {/* Metadata Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#777777] uppercase tracking-wide">
                  <User className="w-4 h-4" />
                  User ID
                </div>
                <p className="text-base font-mono text-[#333333]">#{profileData.id}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#777777] uppercase tracking-wide">
                  <Calendar className="w-4 h-4" />
                  Joined Date
                </div>
                <p className="text-base text-[#333333]">{profileData.joinedDate}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#777777] uppercase tracking-wide">
                  <Clock className="w-4 h-4" />
                  Last Login
                </div>
                <p className="text-base text-[#333333]">{profileData.lastLogin}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information Card */}
      <Card className="border-[#E0E0E0] shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-2 text-base font-normal text-[#333333]">
            <Mail className="w-5 h-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#777777] uppercase tracking-wide">
                <Mail className="w-5 h-5" />
                Email
              </div>
              <p className="text-base text-[#333333]">{profileData.email}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#777777] uppercase tracking-wide">
                <Phone className="w-5 h-5" />
                Phone
              </div>
              <p className="text-base font-mono text-[#333333]">{profileData.phone}</p>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-[#777777] uppercase tracking-wide">
              <MapPin className="w-5 h-5" />
              Address
            </div>
            <p className="text-base text-[#333333]">{profileData.address}</p>
          </div>
        </CardContent>
      </Card>

      {/* Farm Overview Card */}
      <Card className="border-[#E0E0E0] shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-2 text-base font-normal text-[#333333]">
            <Sprout className="w-5 h-5" />
            Farm Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-4 gap-6">
            {/* Total Farms */}
            <div className="bg-[#F3EFE6]/30 border border-[#E0E0E0] rounded-2xl p-4 flex items-center gap-4">
              <div className="bg-[#4A90E2]/10 rounded-2xl p-3">
                <Sprout className="w-6 h-6 text-[#4A90E2]" />
              </div>
              <div>
                <p className="text-2xl font-mono text-[#333333]">{farmStats.totalFarms}</p>
                <p className="text-sm text-[#777777]">Total Farms</p>
              </div>
            </div>

            {/* Total Area */}
            <div className="bg-[#F3EFE6]/30 border border-[#E0E0E0] rounded-2xl p-4 flex items-center gap-4">
              <div className="bg-[#3BA55D]/10 rounded-2xl p-3">
                <TrendingUp className="w-6 h-6 text-[#3BA55D]" />
              </div>
              <div>
                <p className="text-2xl font-mono text-[#333333]">{farmStats.totalArea} ha</p>
                <p className="text-sm text-[#777777]">Total Area</p>
              </div>
            </div>

            {/* Plots */}
            <div className="bg-[#F3EFE6]/30 border border-[#E0E0E0] rounded-2xl p-4 flex items-center gap-4">
              <div className="bg-[#F4C542]/10 rounded-2xl p-3">
                <Grid3x3 className="w-6 h-6 text-[#F4C542]" />
              </div>
              <div>
                <p className="text-2xl font-mono text-[#333333]">{farmStats.totalPlots}</p>
                <p className="text-sm text-[#777777]">Plots</p>
              </div>
            </div>

            {/* Active Seasons */}
            <div className="bg-[#3BA55D]/5 border-2 border-[#3BA55D]/20 rounded-2xl p-4 flex items-center gap-4">
              <div className="bg-[#3BA55D]/10 rounded-2xl p-3">
                <CalendarCheck className="w-6 h-6 text-[#3BA55D]" />
              </div>
              <div>
                <p className="text-2xl font-mono text-[#3BA55D]">{farmStats.activeSeasons}</p>
                <p className="text-sm text-[#3BA55D]/80">Active Seasons</p>
              </div>
            </div>
          </div>

          <Separator className="bg-[#E0E0E0]" />

          <Button 
            variant="ghost" 
            className="text-[#3BA55D] hover:text-[#2F9E44] hover:bg-[#3BA55D]/5"
          >
            View Farm Details
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity Card */}
      <Card className="border-[#E0E0E0] shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-2 text-base font-normal text-[#333333]">
            <Clock className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {recentActivities.length === 0 ? (
              <p className="text-sm text-[#777777]">No recent activity yet.</p>
            ) : (
              recentActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`flex items-start gap-4 py-4 ${
                    index !== recentActivities.length - 1 ? 'border-b border-[#E0E0E0]' : ''
                  }`}
                >
                  <div className="bg-[#3BA55D]/10 rounded-2xl p-2 mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-[#777777]">{activity.date}</p>
                    <p className="text-base text-[#333333]">{activity.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Security & Account Card */}
      <Card className="border-[#E0E0E0] shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-2 text-base font-normal text-[#333333]">
            <Shield className="w-5 h-5" />
            Security & Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password Section */}
          <div className="bg-[#F3EFE6]/30 border border-[#E0E0E0] rounded-2xl p-4 flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Lock className="w-5 h-5 text-[#333333] mt-0.5" />
              <div className="space-y-1">
                <p className="text-base text-[#333333]">Password Set</p>
                <p className="text-sm text-[#777777]">
                  Recommended to update password every 3-6 months.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPasswordDialogOpen(true)}
              className="border-[#E0E0E0] bg-[#F8F8F4] text-[#333333] hover:bg-[#F3EFE6]"
            >
              <KeyRound className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          </div>

          {/* Notification Preferences */}
          <div className="space-y-4">
            <h4 className="text-base text-[#333333]">Notification Preferences</h4>
            
            <div className="space-y-4">
              <div className="bg-[#F8F8F4] border border-[#E0E0E0] rounded-2xl p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="task-reminders" className="text-sm font-medium text-[#333333]">
                    Receive Task Reminders
                  </Label>
                  <p className="text-xs text-[#777777]">
                    Get notified about upcoming tasks and deadlines
                  </p>
                </div>
                <Switch
                  id="task-reminders"
                  checked={notifications.taskReminders}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, taskReminders: checked }))
                  }
                  className="data-[state=checked]:bg-[#3BA55D]"
                />
              </div>

              <div className="bg-[#F8F8F4] border border-[#E0E0E0] rounded-2xl p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="incident-alerts" className="text-sm font-medium text-[#333333]">
                    Receive Incident Alerts
                  </Label>
                  <p className="text-xs text-[#777777]">
                    Get immediate alerts for farm incidents and issues
                  </p>
                </div>
                <Switch
                  id="incident-alerts"
                  checked={notifications.incidentAlerts}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, incidentAlerts: checked }))
                  }
                  className="data-[state=checked]:bg-[#3BA55D]"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <EditProfileDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        profileData={profileData}
      />
      <ChangePasswordDialog
        open={passwordDialogOpen}
        onOpenChange={setPasswordDialogOpen}
      />
    </div>
  );
}

