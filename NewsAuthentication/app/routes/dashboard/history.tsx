import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../../components/sidebar'; 
import HistoryComponent from '../../components/historyContent'; 
import { Bars3Icon, UserCircleIcon as UserIconSolid } from '@heroicons/react/24/solid';
import verifactLogo from '../../assets/images/verifact-logo.png';
import { useLocation } from 'react-router-dom'; 

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "Check your history - Verifact" },
  { name: "description", content: "You can check your history here" },
];

const HistoryPage = () => {
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userMenuButtonRef = useRef<HTMLButtonElement>(null);

  const location = useLocation();
  const currentPath = location.pathname;
  // const currentPath = '/dashboard/history'; // Placeholder

  useEffect(() => { /* ... (user menu click outside logic) ... */ });
  const userMenuItems = [ /* ... */ ];


  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Global Top Bar (same as in PromptPage) */}
      <header className="flex-shrink-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-30">
        {/* ... (logo, mobile hamburger, user dropdown) ... */}
         <div className="flex items-center">
          <button
            type="button"
            className="lg:hidden -ml-1.5 mr-3 p-2 rounded-md text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            onClick={() => setIsMobileSidebarOpen(true)}
            title="Open sidebar menu"
            aria-label="Open sidebar menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
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
            title="Open user menu"
            aria-label="Open user menu"
            /* ... */
          >
            <UserIconSolid className="h-7 w-7 sm:h-8 sm:w-8" />
          </button>
          {isUserMenuOpen && <div ref={userMenuRef} /* ... dropdown ... */ >{/* ... */}</div>}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (same as in PromptPage) */}
        {isMobileSidebarOpen && <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setIsMobileSidebarOpen(false)} />}
        <div className={`fixed inset-y-0 left-0 z-40 transform ... h-[calc(100vh-4rem)] ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar
            currentPath={currentPath}
            isSidebarCollapsed={isDesktopSidebarCollapsed && !isMobileSidebarOpen}
            setIsSidebarCollapsed={setIsDesktopSidebarCollapsed}
            className="h-full"
          />
        </div>

        {/* History Content Area */}
        <main className="flex-1 overflow-y-auto focus:outline-none"> {/* No bg here, HistoryComponent has it */}
          <HistoryComponent />
        </main>
      </div>
    </div>
  );
};

export default HistoryPage;