import React, { useState, useEffect, useRef } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline"; 
import verifactLogo from "../assets/images/verifact-logo.png"; 

import { Link } from 'react-router-dom';



const AppNavbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userMenuButtonRef = useRef<HTMLButtonElement>(null);

  // Close user menu when clicking outside
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleMenuLinkClick = () => {
    setIsUserMenuOpen(false); // Close menu when a link is clicked
  };

  // Define links for the dropdown. Adjust hrefs if using React Router (e.g., to="/")
  const userMenuItems = [
    { name: "Back to Home Page", href: "/" }, // Link to the landing page
    { name: "Verify a New Claim", href: "./routes/dashboard/verify" }, // Link to verification page
    // Will probably add more links like "Profile", "Settings", "Logout" as needed
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16"> {/* Simplified height */}
          {/* Logo and Verifact */}
          <div className="flex items-center">
            {/* If using React Router: <Link to="/" className="..."> */}
            <a href="/" className="flex-shrink-0 flex items-center gap-2 group">
              <img
                className="h-8 w-auto"
                src={verifactLogo}
                alt="Verifact Logo"
              />
              <span className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors flex-shrink-0">
                Verifact
              </span>
            </a>
            {/* End if using React Router */}
          </div>

          {/* User Menu Dropdown */}
          <div className="relative">
            <button
              ref={userMenuButtonRef}
              onClick={toggleUserMenu}
              type="button"
              className="flex items-center p-1 rounded-full text-slate-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-expanded={isUserMenuOpen ? "true" : "false"}
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              <UserCircleIcon className="h-8 w-8" aria-hidden="true" />
            </button>

            {/* Dropdown Panel */}
            {isUserMenuOpen && (
              <div
                ref={userMenuRef}
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button" // Ensure button has id="user-menu-button" if using this
              >
                <ul role="none"> {/* Use role="none" on ul if li items have role="menuitem" */}
                  {userMenuItems.map((item) => (
                    <li key={item.name} role="none">
                      {/* Using React Router  */}
                      <Link
                        to={item.href}
                        onClick={handleMenuLinkClick}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                        role="menuitem"
                      >
                        {item.name}
                      </Link>
                     
                       {/* <a
                        href={item.href}
                        onClick={handleMenuLinkClick}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                        role="menuitem"
                      >
                        {item.name}
                      </a> */}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppNavbar;