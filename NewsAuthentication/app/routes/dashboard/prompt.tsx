import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../../components/sidebar'; 
import AppContent from '../../components/appContent'; 
import { Bars3Icon, UserCircleIcon as UserIconSolid } from '@heroicons/react/24/solid';
import verifactLogo from '../../assets/images/verifact-logo.png'; 

// Not sure of using React Router for navigation in dropdown and sidebar:
// import { Link, useLocation } from 'react-router-dom';

// If using Remix, import MetaFunction:
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "Verify A Claim - Verifact" },
  { name: "description", content: "You can Verify your rumours here" },
];

const PromptPage = () => {
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // User dropdown state (from AppNavbar logic)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userMenuButtonRef = useRef<HTMLButtonElement>(null);

  // --- Current Path Logic (Replace with your router's method) ---
  // Example: const location = useLocation(); const currentPath = location.pathname;
  const [currentPath, setCurrentPath] = useState('/dashboard/prompt'); // Placeholder for active link
  // --- End Current Path Logic ---

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isUserMenuOpen &&
        userMenuRef.current && !userMenuRef.current.contains(event.target as Node) &&
        userMenuButtonRef.current && !userMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserMenuOpen]);

  const userMenuItems = [
    { name: "User Profile", href: "/dashboard/profile" }, // Example
    { name: "Logout", href: "/logout" }, // Example
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-100">
      {/* Global Top Bar */}
      <header className="flex-shrink-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-30">
        <div className="flex items-center">
          <button
            type="button"
            className="lg:hidden -ml-1.5 mr-3 p-2 rounded-md text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
          {/* Verifact Logo and Name */}
          <a href="/" className="flex items-center gap-2 group">
            <img className="h-8 w-auto" src={verifactLogo} alt="Verifact Logo" />
            <span className="text-xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors hidden sm:inline">
              Verifact
            </span>
          </a>
        </div>

        <div className="relative">
          <button
            ref={userMenuButtonRef}
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            type="button"
            className="flex items-center p-1 rounded-full text-slate-500 hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-500"
            // aria-expanded={isUserMenuOpen}
            aria-haspopup="true"
          >
            <span className="sr-only">Open user menu</span>
            <UserIconSolid className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
          </button>
          {isUserMenuOpen && (
            <div
              ref={userMenuRef}
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-40"
              role="menu" aria-orientation="vertical"
            >
              <ul role="none">
                {userMenuItems.map((item) => (
                  <li key={item.name} role="none">
                    <a // Replace with <Link to={item.href}> if I'll be using React Router
                      href={item.href}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-sky-600 transition-colors"
                      role="menuitem"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Main Area below Top Bar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
        {/* Sidebar Panel */}
        <div
          className={`
            fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
            lg:static lg:inset-auto lg:translate-x-0 lg:block
            h-[calc(100vh-4rem)] /* Full height minus top bar */
            ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <Sidebar
            currentPath={currentPath}
            isSidebarCollapsed={isDesktopSidebarCollapsed && !isMobileSidebarOpen}
            setIsSidebarCollapsed={setIsDesktopSidebarCollapsed}
            className="h-[calc(100vh-4rem)]" // This ensures sidebar component takes full height of its container - navabar height
          />
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto focus:outline-none bg-slate-100">
          <AppContent />
        </main>
      </div>
    </div>
  );
};

export default PromptPage;