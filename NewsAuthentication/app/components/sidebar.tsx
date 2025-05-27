// src/components/Sidebar.tsx
import React from 'react';
import {
  HomeIcon,
  CheckBadgeIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  UserCircleIcon as UserIconOutline,
  ArrowLeftOnRectangleIcon,
  ShieldCheckIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';

const Username = 'User Name'; // Placeholder

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  current?: boolean;
  disabled?: boolean;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

const navigationConfig: NavSection[] = [
  {
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
      { name: 'Verify New Claim', href: '/dashboard/prompt', icon: CheckBadgeIcon },
      { name: 'My Verified Claims', href: '/dashboard/history', icon: DocumentTextIcon },
    ],
  },
  {
    title: 'ACCOUNT',
    items: [
      { name: 'Profile', href: '/dashboard/profile', icon: UserIconOutline },
      { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
      { name: 'Security', href: '/dashboard/security', icon: ShieldCheckIcon, disabled: true },
    ],
  },
];

interface SidebarProps {
  currentPath: string;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  className = '',
}) => {
  return (
    // Parent div for relative positioning of the collapse button
    <div className={`relative h-full ${className}`}>
      <aside
        className={`
          flex flex-col h-full bg-white border-r border-slate-200
          transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? 'w-20' : 'w-64'}
          
        `}
      >
        <nav className="flex-1 overflow-y-auto overflow-x-hidden pt-5 pb-4">
          {navigationConfig.map((section, sectionIdx) => (
            <div key={section.title || `section-${sectionIdx}`} className="mb-4">
              {section.title && (
                <h3
                  className={`
                    mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500
                    transition-opacity duration-300
                    ${isSidebarCollapsed ? 'opacity-0 h-0 text-center overflow-hidden pointer-events-none' : 'opacity-100 h-auto'}
                  `}
                >
                  {section.title}
                </h3>
              )}
              <ul role="list" className="space-y-1">
                {section.items.map((item) => {
                  const isActive = currentPath === item.href || (item.href !== '/dashboard' && currentPath.startsWith(item.href));
                  return (
                    <li key={item.name} className="px-2">
                      <a
                        href={item.disabled ? undefined : item.href}
                        title={isSidebarCollapsed ? item.name : undefined}
                        className={`
                          group flex items-center rounded-md py-2.5 text-sm font-medium
                          transition-colors duration-150 ease-in-out
                          ${isSidebarCollapsed ? 'px-3 justify-center' : 'px-3'}
                          ${
                            isActive
                              ? 'bg-sky-100 text-sky-700'
                              : item.disabled
                              ? 'cursor-not-allowed text-slate-400'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          }
                        `}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={(e) => item.disabled && e.preventDefault()}
                      >
                        <item.icon
                          className={`
                            h-5 w-5 flex-shrink-0
                            ${isSidebarCollapsed ? '' : 'mr-3'}
                            ${
                              isActive
                                ? 'text-sky-600'
                                : item.disabled
                                ? 'text-slate-300'
                                : 'text-slate-400 group-hover:text-slate-500'
                            }
                          `}
                          aria-hidden="true"
                        />
                        {!isSidebarCollapsed && <span className="truncate">{item.name}</span>}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* User Info Section (Footer) */}
        <div
          className={`
            flex-shrink-0 border-t border-slate-200 p-3
            transition-all duration-300 ease-in-out
            ${isSidebarCollapsed ? 'h-[60px] flex items-center justify-center' : 'h-auto'} 
          `}
        >
          {!isSidebarCollapsed && (
            <a href="#" className="group block flex-shrink-0 overflow-hidden" title="User Options">
              <div className="flex items-center">
                <div>
                  <UserIconOutline className="inline-block h-9 w-9 rounded-full text-slate-400" />
                </div>
                <div className="ml-3 min-w-0">
                  <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 truncate">
                    {Username}
                  </p>
                  <p className="text-xs font-medium text-slate-500 group-hover:text-slate-700 truncate">
                    Logout
                  </p>
                </div>
              </div>
            </a>
          )}
          {isSidebarCollapsed && (
            <a href="#" title="User Options" className="p-1 text-slate-500 hover:text-slate-700">
              <UserIconOutline className="h-7 w-7" />
            </a>
          )}
        </div>
      </aside>

      {/* Collapse/Expand Button - Absolutely Positioned */}
      <button
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className={`
          absolute top-1/2 -translate-y-1/2 
          bg-white hover:bg-slate-50 text-slate-600 hover:text-sky-600
          border border-slate-200 rounded-full shadow-md
          p-1.5 z-10 transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-sky-500
          ${isSidebarCollapsed ? 'right-0 translate-x-[calc(100%-8px)]' : 'right-0 translate-x-1/2'}
          
          hidden lg:flex items-center justify-center /* Only show on desktop */
        `}
        // Adjust the translate-x for collapsed state slightly if needed for perfect centering on the edge
        title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <span className="sr-only">{isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}</span>
        {isSidebarCollapsed ? (
          <ChevronDoubleRightIcon className="h-5 w-5" />
        ) : (
          <ChevronDoubleLeftIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default Sidebar;