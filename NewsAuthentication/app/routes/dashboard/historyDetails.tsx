import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
  LinkIcon,
  PaperClipIcon, // For evidence/attachments
  ChatBubbleBottomCenterTextIcon, // For summary/explanation
  PhotoIcon, // If image is present
  ArrowPathIcon, // Loading
  ExclamationTriangleIcon, // Error
} from '@heroicons/react/24/solid'; 

// --- Types (should match or extend from HistoryComponent) ---
type VerificationStatus = 'verified' | 'debunked' | 'pending';

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "History - Verifact" },
  { name: "description", content: "You can check your history here" },
];

interface ClaimDetail {
  id: string;
  claimText: string;
  originalSource?: string;
  imageUrl?: string;
  verificationDate: string; // API might return date as string
  status: VerificationStatus;
  detailedExplanation: string; // More detailed than summary
  evidenceLinks?: Array<{ title: string; url: string }>; // Optional evidence links
}

// --- Mock Data for a single claim (to be replaced with actual data fetching) ---
const mockClaimDetail: ClaimDetail = {
  id: '2', // Corresponds to an ID from the history list
  claimText: "A new study shows that drinking coffee can increase your lifespan by an average of 5 years, as reported by multiple news outlets and supported by preliminary findings from the Institute of Longevity.",
  originalSource: 'Global Health Times',
  imageUrl: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80",
  verificationDate: new Date(2023, 9, 22, 14, 0).toISOString(),
  status: 'verified',
  detailedExplanation: "Multiple peer-reviewed epidemiological studies have indeed found a correlation between regular coffee consumption (typically 2-4 cups per day) and a reduced risk of mortality from various causes, including heart disease, stroke, and some cancers. While these studies are largely observational and don't definitively prove causation, the consistency of findings across large populations is significant.\n\nThe claim of an 'average of 5 years' increase is likely an oversimplification or an optimistic interpretation of some specific study's findings. The actual impact on lifespan is complex and varies based on individual genetics, lifestyle, and the type of coffee consumed. However, the general consensus is that moderate coffee consumption is associated with health benefits for most adults.\n\nIt's important to note that excessive coffee intake can have negative side effects, and individuals with certain health conditions should consult their doctor.",
  evidenceLinks: [
    { title: 'Harvard T.H. Chan: Coffee and Health', url: '#' },
    { title: 'BMJ Meta-Analysis on Coffee Consumption', url: '#' },
  ]
};

// --- Helper Components (StatusBadge can be reused or redefined if styles differ) ---
const StatusBadge: React.FC<{ status: VerificationStatus; large?: boolean }> = ({ status, large = false }) => {
  let bgColor = 'bg-slate-100';
  let textColor = 'text-slate-700';
  let Icon = QuestionMarkCircleIcon;

  switch (status) {
    case 'verified': bgColor = 'bg-green-100'; textColor = 'text-green-700'; Icon = CheckCircleIcon; break;
    case 'debunked': bgColor = 'bg-red-100'; textColor = 'text-red-700'; Icon = XCircleIcon; break;
    case 'pending': bgColor = 'bg-sky-100'; textColor = 'text-sky-700'; Icon = ClockIcon; break;
  }

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${bgColor} ${textColor} ${large ? 'px-4 py-1.5 text-sm' : 'px-2.5 py-0.5 text-xs'}`}>
      <Icon className={`mr-1.5 ${large ? 'w-5 h-5' : 'w-4 h-4'}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};


// --- Main Claim Detail Component ---
// Props would typically include claimId if you're not using useParams
// interface ClaimDetailComponentProps {
//   claimId: string;
// }

const ClaimDetailComponent = () => {
  // --- React Router hooks (uncomment and use) ---
  // const { claimId } = useParams<{ claimId: string }>();
  // const navigate = useNavigate();
  const claimId = mockClaimDetail.id; // Using mock ID for now
  const navigate = (path: string) => console.log("Navigate to:", path); // Mock navigate


  const [claimData, setClaimData] = useState<ClaimDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!claimId) {
      setError("Claim ID is missing.");
      setIsLoading(false);
      return;
    }

    const fetchClaimDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // --- Simulating API Call ---
        // const response = await fetch(`/api/claims/history/${claimId}`);
        // if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        // const data: ClaimDetail = await response.json();
        // setClaimData(data);
        // --- End API Call ---

        // Using mock data for now:
        await new Promise(resolve => setTimeout(resolve, 700)); // Simulate delay
        if (claimId === mockClaimDetail.id) {
          setClaimData(mockClaimDetail);
        } else {
          throw new Error("Claim not found.");
        }

      } catch (e: any) {
        console.error("Failed to fetch claim details:", e);
        setError(e.message || "Failed to load claim details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClaimDetail();
  }, [claimId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-6 bg-slate-100">
        <ArrowPathIcon className="w-12 h-12 text-sky-500 animate-spin mb-4" />
        <p className="text-lg text-slate-600">Loading claim details...</p>
      </div>
    );
  }

  if (error || !claimData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-6 bg-red-50 rounded-xl border border-red-200">
        <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-red-700 mb-2">Error Loading Claim</h3>
        <p className="text-red-600 text-sm mb-6">{error || "The requested claim could not be found."}</p>
        <button
          onClick={() => navigate('/dashboard/history')} // Navigate back to history
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to History
        </button>
      </div>
    );
  }

  const {
    claimText,
    imageUrl,
    originalSource,
    verificationDate,
    status,
    detailedExplanation,
    evidenceLinks,
  } = claimData;

  const formattedDate = new Date(verificationDate).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="min-h-full bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard/history')} // Adjust path if needed
            className="inline-flex items-center text-sm font-medium text-sky-600 hover:text-sky-800 group"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2 text-sky-500 group-hover:text-sky-700 transition-colors" />
            Back to Verification History
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Optional Image Header */}
          {imageUrl && (
            <div className="bg-slate-200">
              <img
                src={imageUrl}
                alt="Claim related image"
                className="w-full h-60 sm:h-80 md:h-96 object-contain p-2 bg-slate-50" // object-contain to show full image
              />
            </div>
          )}

          <div className="p-6 sm:p-8">
            {/* Status and Date */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 pb-5 border-b border-slate-200">
              <StatusBadge status={status} large />
              <div className="flex items-center text-sm text-slate-500 mt-3 sm:mt-0">
                <ClockIcon className="w-5 h-5 mr-1.5 text-slate-400" />
                Verified on: {formattedDate}
              </div>
            </div>

            {/* Claim Text Section */}
            <section className="mb-8">
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Original Claim</h2>
              <p className="text-lg sm:text-xl text-slate-800 leading-relaxed whitespace-pre-wrap">
                {claimText}
              </p>
              {originalSource && (
                <div className="mt-3 flex items-center text-sm text-slate-500">
                  <LinkIcon className="w-4 h-4 mr-1.5 text-slate-400" />
                  Source: <span className="ml-1 font-medium text-slate-600 truncate">{originalSource}</span>
                </div>
              )}
            </section>

            {/* Detailed Explanation Section */}
            <section className="mb-8">
              <div className="flex items-center mb-3">
                <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-sky-600 mr-2" />
                <h2 className="text-xl font-semibold text-slate-800">Verification Details</h2>
              </div>
              <div className="prose prose-sm sm:prose-base max-w-none text-slate-700 leading-relaxed">
                {/* Split explanation by newlines to render as paragraphs */}
                {detailedExplanation.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Evidence/Sources Section (Optional) */}
            {evidenceLinks && evidenceLinks.length > 0 && (
              <section>
                <div className="flex items-center mb-3">
                  <PaperClipIcon className="w-6 h-6 text-sky-600 mr-2" />
                  <h2 className="text-xl font-semibold text-slate-800">Supporting Evidence</h2>
                </div>
                <ul className="space-y-2">
                  {evidenceLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-sky-600 hover:text-sky-800 hover:underline group"
                      >
                        <LinkIcon className="w-4 h-4 mr-1.5 opacity-70 group-hover:opacity-100" />
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimDetailComponent;