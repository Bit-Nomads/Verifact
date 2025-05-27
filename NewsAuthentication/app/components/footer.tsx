// React Component of the Footer 

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Importing brand icons from FontAwesome
import {
  faTwitter,
  faGithub,
  faLinkedin,
  faFacebook, 
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/yourprofile', // To be replaced with actual link
      icon: faTwitter,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/yourprofile', // To be replaced with actual link
      icon: faGithub,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/yourprofile', // To be replaced with actual link
      icon: faLinkedin,
    },
  ];

  const footerNavLinks = [
    { name: 'About Verifact', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300"> {/* Slightly darker background */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        {/* Top section: Logo/Brand and Nav Links */}
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <a href="/" className="text-3xl font-bold text-white hover:text-sky-400 transition-colors">
              Verifact
            </a>
            <p className="text-slate-400 text-base">
              Empowering you with verified information, instantly.
            </p>
            <div className="flex space-x-5">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-400 hover:text-sky-400 transition-colors"
                  aria-label={item.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <FontAwesomeIcon icon={item.icon} className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">
                  Solutions
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li><a href="#" className="text-base text-slate-400 hover:text-sky-400 transition-colors">Fact-Checking API</a></li>
                  <li><a href="#" className="text-base text-slate-400 hover:text-sky-400 transition-colors">Browser Extension</a></li>
                  <li><a href="#" className="text-base text-slate-400 hover:text-sky-400 transition-colors">For Developers</a></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">
                  Company
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavLinks.slice(0, 2).map((link) => ( // Example: first two links
                     <li key={link.name}>
                       <a href={link.href} className="text-base text-slate-400 hover:text-sky-400 transition-colors">
                         {link.name}
                       </a>
                     </li>
                   ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">
                  Legal
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavLinks.slice(2).map((link) => ( 
                    <li key={link.name}>
                      <a href={link.href} className="text-base text-slate-400 hover:text-sky-400 transition-colors">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                 <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">
                  Support
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li><a href="/contact" className="text-base text-slate-400 hover:text-sky-400 transition-colors">Contact Us</a></li>
                  <li><a href="/faq" className="text-base text-slate-400 hover:text-sky-400 transition-colors">FAQ</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section: Copyright Section */}
        <div className="mt-12 border-t border-slate-700 pt-8">
          <p className="text-base text-slate-400 text-center xl:text-left">
            © {currentYear} Verifact. All rights reserved.
          </p>
        </div>
         <div className="mt-8 text-center text-xs text-slate-500">
            <p> Built by <a href="https://your-portfolio-or-company.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 underline">BitNomads</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;