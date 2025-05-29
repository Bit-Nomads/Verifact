import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import verifactLogo from "../assets/images/verifact-logo.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Why Us?", href: "#reason" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out
                  ${
                    isScrolled
                      ? "bg-white/80 backdrop-blur-lg shadow-md"
                      : "bg-transparent"
                  }
                  border-b ${
                    isScrolled ? "border-slate-200" : "border-transparent"
                  }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Verifact */}
          <div className="flex items-center">
            <a href="chat" className="flex-shrink-0 flex items-center gap-2 group">
              <img
                className="h-8 w-auto sm:h-9"
                src={verifactLogo}
                alt="Verifact Logo"
              />
              <span className="text-xl sm:text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                Verifact
              </span>
            </a>
          </div>

          {/* Desktop Navigation(Hidden on Mobile) */}
          <nav className="hidden md:flex md:items-center md:space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="chat" // To be linked to verification page
              className="inline-flex items-center justify-center rounded-lg h-10 px-5 bg-blue-600 text-white font-semibold text-sm shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get Started
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu, show/hide based on menu state. */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg pb-4"
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 pb-2 px-4 border-t border-slate-200">
            <a
              href="chat" // To be linked to verification page
              className="block w-full text-center rounded-lg py-2.5 px-4 bg-blue-600 text-white font-semibold text-sm shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
            >
              Verify a Claim
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
