import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole, hasPermission, hasAnyPermission, hasAllPermissions } from '../constants/roles';

interface UsePermissionsReturn {
  userRole: UserRole | null;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
  canView: (requiredRoles: UserRole[]) => boolean;
  canEdit: (requiredRoles: UserRole[]) => boolean;
  canDelete: (requiredRoles: UserRole[]) => boolean;
  isClient: boolean;
  isCashier: boolean;
  isAdmin: boolean;
}

export const usePermissions = (): UsePermissionsReturn => {
  const { user } = useAuth();

  const userRole = user?.role || null;

  const permissions = useMemo(() => {
    if (!userRole) {
      return {
        hasPermission: () => false,
        hasAnyPermission: () => false,
        hasAllPermissions: () => false,
        canView: () => false,
        canEdit: () => false,
        canDelete: () => false,
      };
    }

    return {
      hasPermission: (permission: string) => hasPermission(userRole, permission),
      hasAnyPermission: (permissions: string[]) => hasAnyPermission(userRole, permissions),
      hasAllPermissions: (permissions: string[]) => hasAllPermissions(userRole, permissions),
      canView: (requiredRoles: UserRole[]) => requiredRoles.includes(userRole),
      canEdit: (requiredRoles: UserRole[]) => requiredRoles.includes(userRole),
      canDelete: (requiredRoles: UserRole[]) => requiredRoles.includes(userRole),
    };
  }, [userRole]);

  const roleChecks = useMemo(() => ({
    isClient: userRole === 'cliente',
    isCashier: userRole === 'cajero',
    isAdmin: userRole === 'administrador',
  }), [userRole]);

  return {
    userRole,
    ...permissions,
    ...roleChecks,
  };
}; 