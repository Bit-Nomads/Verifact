import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  CheckBadgeIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  UserCircleIcon as UserIconOutline,
  ShieldCheckIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';
import verifactLogo from '../assets/images/verifact-logo.png';

const Username = 'Bola A. Tinubu';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

const navigationConfig: NavSection[] = [
  {
    items: [
      { name: 'Verify New Claim', href: '/chat', icon: CheckBadgeIcon },
      { name: 'History', href: '/history', icon: DocumentTextIcon },
    ],
  },
  {
    title: 'ACCOUNT',
    items: [
      { name: 'Profile', href: '/profile', icon: UserIconOutline },
      { name: 'Settings', href: 'settings', icon: Cog6ToothIcon },
      { name: 'Security', href: '/security', icon: ShieldCheckIcon, disabled: true },
    ],
  },
];

interface SidebarProps {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  onNavigate?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  className = '',
  onNavigate,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (href: string) => {
    if (href === '/chat') {
      return currentPath === '/chat' || currentPath.startsWith('/chat/');
    }
    return currentPath === href || currentPath.startsWith(href + '/');
  };

  const handleToggleSidebar = (e: React.MouseEvent) => {
    setIsSidebarCollapsed(prev => !prev);
  };

  return (
    <div
      className={`
        relative h-full flex-shrink-0 
        transition-all duration-300 ease-in-out
        bg-gradient-to-br from-slate-50 to-white
        border-r border-slate-200/80 shadow-sm
        ${isSidebarCollapsed ? 'w-20' : 'w-64'}
        ${className}
      `}
    >
      <aside className="flex flex-col h-full w-full overflow-hidden">
        <div className="flex items-center justify-end h-16 px-3 border-b border-slate-200/60 flex-shrink-0 bg-white/70 backdrop-blur-sm">
          <button
            onClick={handleToggleSidebar}
            className="p-2 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-400 hidden lg:block ml-2 flex-shrink-0 transition-all duration-200"
            title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!isSidebarCollapsed ? 'false' : 'true'}
            aria-controls="sidebar-nav"
          >
            <span className="sr-only">{isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}</span>
            {isSidebarCollapsed ? (
              <ChevronDoubleRightIcon className="h-5 w-5" />
            ) : (
              <ChevronDoubleLeftIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav id="sidebar-nav" className="flex-1 overflow-y-auto overflow-x-hidden pt-6 pb-4">
          {navigationConfig.map((section, sectionIdx) => (
            <div
              key={section.title || `section-${sectionIdx}`}
              className={`${section.title === 'ACCOUNT' ? 'mt-8' : 'mb-4 last:mb-0'}`}
            >
              {section.title && (
                <h3
                  className={`
                    mb-3 px-4 text-xs font-bold uppercase tracking-widest text-slate-500
                    transition-opacity duration-300
                    ${isSidebarCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'}
                  `}
                  aria-hidden={isSidebarCollapsed}
                >
                  {section.title}
                </h3>
              )}
              <ul role="list" className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.name} className="px-3">
                    <Link
                      to={item.disabled ? '#' : item.href}
                      title={isSidebarCollapsed ? item.name : undefined}
                      className={`
                        group flex items-center rounded-xl py-3 text-sm font-medium
                        transition-all duration-200 ease-in-out transform hover:scale-[1.02]
                        ${isSidebarCollapsed ? 'px-3 justify-center' : 'px-4'}
                        ${item.disabled ? 'cursor-not-allowed text-slate-400' : ''}
                        ${isActive(item.href) 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30' 
                          : 'text-slate-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-700 hover:shadow-md'
                        }
                      `}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      onClick={() => {
                        if (item.disabled) return;
                        if (onNavigate) onNavigate();
                        if (window.innerWidth < 1024) {
                          setIsSidebarCollapsed(true);
                        }
                      }}
                    >
                      <item.icon
                        className={`
                          h-5 w-5 flex-shrink-0
                          ${isSidebarCollapsed ? '' : 'mr-3'}
                          ${item.disabled ? 'text-slate-300' : ''}
                          ${isActive(item.href) 
                            ? 'text-white drop-shadow-sm' 
                            : 'text-slate-500 group-hover:text-emerald-600'
                          }
                        `}
                        aria-hidden="true"
                      />
                      {!isSidebarCollapsed && <span className="truncate font-medium">{item.name}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className={`flex-shrink-0 border-t border-slate-200/60 p-4 bg-gradient-to-r from-slate-50/50 to-emerald-50/30 ${isSidebarCollapsed ? 'h-[70px] flex items-center justify-center' : 'h-auto'}`}>
          <Link 
            to="/profile" 
            className={`group block transition-all duration-200 hover:scale-105 ${isSidebarCollapsed ? 'p-2 rounded-lg hover:bg-emerald-100' : 'flex-shrink-0 overflow-hidden'}`}
            title="User Profile"
          >
            {isSidebarCollapsed ? (
              <UserIconOutline className="h-7 w-7 text-slate-500 hover:text-emerald-600 transition-colors" />
            ) : (
              <div className="flex items-center p-2 rounded-xl hover:bg-white/70 transition-all duration-200">
                <div className="relative">
                  <UserIconOutline className="h-10 w-10 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="ml-3 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 truncate">
                    {Username}
                  </p>
                  <p className="text-xs font-medium text-emerald-600 group-hover:text-emerald-700 truncate">
                    View Profile
                  </p>
                </div>
              </div>
            )}
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;