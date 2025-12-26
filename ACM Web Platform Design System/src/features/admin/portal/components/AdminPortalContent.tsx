import type { AdminView } from '../types';
import { getAdminViewTitle } from '../constants';
import { UnderConstruction } from './UnderConstruction';

// Feature Imports
// Note: Ensure these paths match your tsconfig aliases and directory structure
import { AdminDashboard } from '@/features/admin';
import { DocumentManagement } from '@/features/admin/document-management';
import { ReportsAnalytics } from '@/features/admin/reports-analytics';

// Placeholder Pages
import { UsersRolesPage } from '@/pages/admin/UsersRolesPage';
import { FarmsPlotsPage } from '@/pages/admin/FarmsPlotsPage';
import { CropsVarietiesPage } from '@/pages/admin/CropsVarietiesPage';
import { SeasonsTasksPage } from '@/pages/admin/SeasonsTasksPage';
import { InventorySuppliersPage } from '@/pages/admin/InventorySuppliersPage';
import { IncidentsPage } from '@/pages/admin/IncidentsPage';
import { AiChatsPage } from '@/pages/admin/AiChatsPage';

type AdminPortalContentProps = {
  currentView: AdminView;
};

export function AdminPortalContent({ currentView }: AdminPortalContentProps) {
  switch (currentView) {
    case 'dashboard':
      return <AdminDashboard />;
    case 'users-roles':
      return <UsersRolesPage />;
    case 'farms-plots':
      return <FarmsPlotsPage />;
    case 'crops-varieties':
      return <CropsVarietiesPage />;
    case 'seasons-tasks':
      return <SeasonsTasksPage />;
    case 'inventory-suppliers':
      return <InventorySuppliersPage />;
    case 'documents':
      return <DocumentManagement />;
    case 'incidents':
      return <IncidentsPage />;
    case 'reports':
      return <ReportsAnalytics />;
    case 'ai-chats':
      return <AiChatsPage />;
    default:
      return <UnderConstruction title={getAdminViewTitle(currentView)} />;
  }
}
