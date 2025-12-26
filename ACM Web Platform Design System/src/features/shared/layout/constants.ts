import {
  Home, MapPin, Calendar, CheckSquare, DollarSign, Package,
  ShoppingCart, BarChart3, Settings, Sprout, FileText,
  TrendingUp, Shield, Warehouse, Users, AlertTriangle, MessageSquare
} from 'lucide-react';
import { PortalType, PortalConfig, Notification } from './types';

/**
 * Portal Configurations
 * Defines navigation and styling for each portal type
 */
export const portalConfig: Record<PortalType, PortalConfig> = {
  ADMIN: {
    name: 'Admin Portal',
    color: '#2563EB',
    icon: Shield,
    emoji: '🛡️',
    navigation: [
      { id: 'dashboard', label: 'Admin Dashboard', icon: Home },
      { id: 'users-roles', label: 'Users & Roles / Người dùng & Phân quyền', icon: Users },
      { id: 'farms-plots', label: 'Farms & Plots / Trang trại & Lô đất', icon: Warehouse },
      { id: 'crops-varieties', label: 'Crops & Varieties / Cây trồng & Giống', icon: Sprout },
      { id: 'seasons-tasks', label: 'Seasons & Tasks / Mùa vụ & Công việc', icon: Calendar },
      { id: 'inventory-suppliers', label: 'Inventory & Suppliers / Vật tư & Nhà cung cấp', icon: Package },
      { id: 'documents', label: 'Documents / Tài liệu', icon: FileText },
      { id: 'incidents', label: 'Incidents / Sự cố', icon: AlertTriangle },
      { id: 'reports', label: 'Reports / Báo cáo', icon: BarChart3 },
      { id: 'ai-chats', label: 'AI Chats / Trò chuyện AI', icon: MessageSquare },
    ],
  },
  FARMER: {
    name: 'Farmer Portal',
    color: '#2F9E44',
    icon: Sprout,
    emoji: '🌾',
    navigation: [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'farms-plots', label: 'Farms & Plots', icon: Warehouse },
      { id: 'farms', label: 'Farm Management', icon: Warehouse },
      { id: 'plots', label: 'Plot Management', icon: MapPin },
      { id: 'seasons', label: 'Season Management', icon: Calendar },
      { id: 'tasks', label: 'Tasks Workspace', icon: CheckSquare },
      { id: 'crops', label: 'Crop Management', icon: Sprout },
      { id: 'expenses', label: 'Expense Management', icon: DollarSign },
      { id: 'harvest', label: 'Harvest Management', icon: Package },
      { id: 'suppliers-supplies', label: 'Suppliers & Supplies', icon: Users },
      { id: 'reports', label: 'Reports', icon: BarChart3 },
      { id: 'documents', label: 'Documents', icon: FileText },
    ],
  },
  BUYER: {
    name: 'Buyer Portal',
    color: '#0CA678',
    icon: ShoppingCart,
    emoji: '🛒',
    navigation: [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
      { id: 'orders', label: 'My Orders', icon: Package },
      { id: 'traceability', label: 'Traceability', icon: MapPin },
      { id: 'reports', label: 'Reports', icon: BarChart3 },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
};

/**
 * Language Names Mapping
 */
export const languageNames = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
};

/**
 * Initial Mock Notifications
 */
export const initialNotifications: Notification[] = [
  {
    id: 1,
    type: 'task',
    title: 'Task Due Soon',
    message: 'Apply fertilizer to North Field is due today',
    time: '10 min ago',
    read: false,
  },
  {
    id: 2,
    type: 'weather',
    title: 'Weather Alert',
    message: 'Heavy rain expected tomorrow afternoon',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    type: 'inventory',
    title: 'Low Inventory',
    message: 'Fertilizer stock is running low',
    time: '3 hours ago',
    read: true,
  },
  {
    id: 4,
    type: 'incident',
    title: 'Pest Detection',
    message: 'Unusual pest activity in East Field C',
    time: 'Yesterday',
    read: true,
  },
];

/**
 * Search Debounce Delay (ms)
 */
export const SEARCH_DEBOUNCE_DELAY = 300;

/**
 * Search Minimum Length
 */
export const SEARCH_MIN_LENGTH = 2;
