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
      { name: 'Verify New Claim', href: 'chat', icon: CheckBadgeIcon },
      { name: 'History', href: 'history', icon: DocumentTextIcon },
    ],
  },
  {
    title: 'ACCOUNT',
    items: [
      { name: 'Profile', href: 'profile', icon: UserIconOutline },
      { name: 'Settings', href: 'settings', icon: Cog6ToothIcon },
      { name: 'Security', href: 'security', icon: ShieldCheckIcon, disabled: true },
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
    if (href === '/dashboard/prompt') {
      return currentPath.startsWith(href);
    }
    return currentPath.startsWith(href);
  };

  const handleToggleSidebar = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSidebarCollapsed(prev => !prev);
  };

  return (
    <div
      className={`
        relative h-full flex-shrink-0 
        transition-all duration-300 ease-in-out
        bg-white 
        ${isSidebarCollapsed ? 'w-20' : 'w-64'}
        ${className}
      `}
    >
      <aside className="flex flex-col h-full border-r border-slate-200 w-full overflow-hidden">
        {/* Header with logo and toggle */}
        <div className="flex items-center justify-end h-16 px-3 border-b border-slate-200 flex-shrink-0">
          {/* <div className={`flex-1 min-w-0 ${isSidebarCollapsed ? 'flex justify-center' : ''}`}>
            <Link to="/" className="inline-flex items-center gap-2 group" aria-label="Verifact Home">
              <img
                className="h-8 w-auto flex-shrink-0"
                src={verifactLogo}
                alt="Verifact Logo"
              />
              {!isSidebarCollapsed && (
                <span className="text-xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors truncate">
                  Verifact
                </span>
              )}
            </Link>
          </div> */}
          <button
            onClick={handleToggleSidebar}
            className="p-1.5 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-500 hidden lg:block ml-2 flex-shrink-0"
            title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!isSidebarCollapsed}
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

        {/* Navigation */}
        <nav id="sidebar-nav" className="flex-1 overflow-y-auto overflow-x-hidden pt-4 pb-4">
          {navigationConfig.map((section, sectionIdx) => (
            <div
              key={section.title || `section-${sectionIdx}`}
              className={`${section.title === 'ACCOUNT' ? 'mt-6' : 'mb-2 last:mb-0'}`}
            >
              {section.title && (
                <h3
                  className={`
                    mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500
                    transition-opacity duration-300
                    ${isSidebarCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'}
                  `}
                  aria-hidden={isSidebarCollapsed}
                >
                  {section.title}
                </h3>
              )}
              <ul role="list" className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.name} className="px-2">
                    <Link
                      to={item.disabled ? '#' : item.href}
                      title={isSidebarCollapsed ? item.name : undefined}
                      className={`
                        group flex items-center rounded-md py-2.5 text-sm font-medium
                        transition-colors duration-150 ease-in-out
                        ${isSidebarCollapsed ? 'px-3 justify-center' : 'px-3'}
                        ${item.disabled ? 'cursor-not-allowed text-slate-400' : ''}
                        ${isActive(item.href) ? 'bg-sky-100 text-sky-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
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
                          ${isActive(item.href) ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-500'}
                        `}
                        aria-hidden="true"
                      />
                      {!isSidebarCollapsed && <span className="truncate">{item.name}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className={`flex-shrink-0 border-t border-slate-200 p-3 ${isSidebarCollapsed ? 'h-[60px] flex items-center justify-center' : 'h-auto'}`}>
          <Link 
            to="/dashboard/profile" 
            className={`group block ${isSidebarCollapsed ? 'p-1' : 'flex-shrink-0 overflow-hidden'}`}
            title="User Profile"
          >
            {isSidebarCollapsed ? (
              <UserIconOutline className="h-7 w-7 text-slate-500 hover:text-slate-700 transition-colors" />
            ) : (
              <div className="flex items-center">
                <UserIconOutline className="h-9 w-9 rounded-full text-slate-400 group-hover:text-slate-500 transition-colors" />
                <div className="ml-3 min-w-0">
                  <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 truncate">
                    {Username}
                  </p>
                  <p className="text-xs font-medium text-slate-500 group-hover:text-slate-700 truncate">
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