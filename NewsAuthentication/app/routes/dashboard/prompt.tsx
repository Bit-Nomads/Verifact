import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Added useLocation
import Sidebar from '../../components/sidebar';
import AppContent from '../../components/appContent';
import {
  Bars3Icon,
  UserCircleIcon as UserIconSolid,
} from '@heroicons/react/24/solid';
import verifactLogo from '../../assets/images/verifact-logo.png';
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: 'Verify A Claim - Verifact' },
  { name: 'description', content: 'You can Verify your rumours here' },
];

const PromptPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userMenuButtonRef = useRef<HTMLButtonElement>(null);

  // Proper routing with React Router
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isUserMenuOpen &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        userMenuButtonRef.current &&
        !userMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  const userMenuItems = [
    { name: 'User Profile', href: '/dashboard/profile' },
    { name: 'Logout', href: '/logout' },
  ];

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleMobileNavClose = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-100">
      <header className="flex-shrink-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-30">
        <div className="flex items-center">
          <button
            type="button"
            className="lg:hidden -ml-1.5 mr-3 p-2 rounded-md text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            onClick={handleMobileSidebarToggle}
            aria-controls="mobile-sidebar"
            aria-expanded={isMobileSidebarOpen}
          >
            <span className="sr-only">{isMobileSidebarOpen ? 'Close sidebar' : 'Open sidebar'}</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
          <Link to="/" className="flex items-center gap-2 group">
            <img
              className="h-8 w-auto"
              src={verifactLogo}
              alt="Verifact Logo"
            />
            <span className="text-xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors hidden sm:inline">
              Verifact
            </span>
          </Link>
        </div>

        <div className="relative">
          <button
            ref={userMenuButtonRef}
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            type="button"
            className="flex items-center p-1 rounded-full text-slate-500 hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-500"
            aria-expanded={isUserMenuOpen}
            aria-haspopup="true"
          >
            <span className="sr-only">Open user menu</span>
            <UserIconSolid className="h-7 w-7 sm:h-8 sm:w-8" />
          </button>
          
          {isUserMenuOpen && (
            <div
              ref={userMenuRef}
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-40"
            >
              <ul>
                {userMenuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-sky-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/40 lg:hidden"
            onClick={handleMobileNavClose}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out
            lg:relative lg:z-0 lg:translate-x-0
            ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <Sidebar
            // currentPath={currentPath}
            isSidebarCollapsed={isSidebarCollapsed}
            setIsSidebarCollapsed={setIsSidebarCollapsed}
            onNavigate={handleMobileNavClose}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-slate-100">
          <AppContent />
        </main>
      </div>
    </div>
  );
};

export default PromptPage;