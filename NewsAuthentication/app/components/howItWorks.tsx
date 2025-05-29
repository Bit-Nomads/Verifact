import React from 'react';
import {
  ClipboardDocumentCheckIcon, // Icon for submitting claims
  CpuChipIcon,                // Icon for AI-powered analysis
  CheckBadgeIcon,             // Icon for receiving clear results
} from '@heroicons/react/24/outline'; 

// Define the steps data
const stepsData = [
  {
    id: 1,
    name: 'Submit Your Claim',
    description: 'Easily paste text, upload a document, or enter a URL. Verifact accepts various input formats to start the verification process.',
    IconComponent: ClipboardDocumentCheckIcon,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100', // Light background for the icon circle
    borderColor: 'border-blue-200', 
  },
  {
    id: 2,
    name: 'AI-Powered Analysis',
    description: 'Our advanced AI meticulously cross-references your claim against a vast database of news articles, academic papers, and verified reports.',
    IconComponent: CpuChipIcon,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-200',
  },
  {
    id: 3,
    name: 'Receive Clear Results',
    description: 'Get a straightforward verdict—verified, disputed, or unconfirmed—along with supporting evidence and source links for full transparency.',
    IconComponent: CheckBadgeIcon,
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-200',
  },
];

const HowItWorksSection = () => {
  return (
    <div className="bg-slate-50 py-16 sm:py-24" id='how-it-works'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
            Simple & Effective
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How Verifact Works
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Understanding the truth behind any claim is just three simple steps away.
          </p>
        </div>

        <div className="relative">
          {/* Desktop connecting line (drawn behind the cards) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-0 left-0 right-0 h-0.5 bg-slate-300/70"
            style={{ top: '2rem', zIndex: 0 }}
          />

          <div className="grid grid-cols-1 gap-y-16 md:grid-cols-3 md:gap-x-8 relative">
            {stepsData.map((step, stepIdx) => (
              <div key={step.id} className="flex flex-col items-center text-center">
                {/* Icon Container - positioned relative to allow z-index */}
                <div className="relative z-10"> {/* z-10 to ensure icon circle is above the line */}
                  <span
                    className={`flex items-center justify-center h-16 w-16 rounded-full ${step.bgColor} shadow-lg border-4 border-slate-50`}
                  >
                    <step.IconComponent className={`h-8 w-8 ${step.iconColor}`} aria-hidden="true" />
                  </span>
                </div>

                {/* Step Number */}
                <div className="mt-6 text-xs font-bold text-slate-400 tracking-wider">
                  STEP {String(step.id).padStart(2, '0')}
                </div>

                {/* Step Name */}
                <h3 className="mt-1 text-xl font-semibold text-slate-800">
                  {step.name}
                </h3>

                {/* Step Description */}
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;