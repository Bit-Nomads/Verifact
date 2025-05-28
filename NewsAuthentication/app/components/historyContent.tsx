// src/components/HistoryComponent.tsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  CheckCircleIcon,
  XCircleIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
  LinkIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArchiveBoxXMarkIcon,
} from '@heroicons/react/24/solid';

// --- Types (ensure 'inconclusive' is a valid status if used in mock data) ---
type VerificationStatus = 'verified' | 'debunked' | 'pending' | 'inconclusive'; // Added inconclusive to match detail

interface ClaimHistoryItem {
  id: string;
  claimText: string;
  originalSource?: string;
  imageUrl?: string;
  verificationDate: Date;
  status: VerificationStatus;
  summary?: string;
}

// --- Mock Data (ensure statuses match the updated type) ---
const mockHistoryData: ClaimHistoryItem[] = [
  {
    id: '1',
    claimText: "Scientists discover that cats can actually photosynthesize...",
    originalSource: 'Fictional News Today',
    verificationDate: new Date(2023, 10, 15, 10, 30),
    status: 'debunked',
    summary: "No scientific evidence..."
  },
  {
    id: '2',
    claimText: "A new study shows that drinking coffee can increase your lifespan...",
    imageUrl: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlfGVufDB8fDB8fHww&auto=format&fit=crop&w=300&q=60",
    verificationDate: new Date(2023, 9, 22, 14, 0),
    status: 'verified',
    summary: "Multiple studies suggest..."
  },
  {
    id: '3',
    claimText: "Is it true that the Great Wall of China is the only man-made structure...",
    verificationDate: new Date(2023, 8, 5, 9, 15),
    status: 'inconclusive', // Changed to inconclusive to match type
    summary: "This is a common misconception..."
  },
  {
    id: '4',
    claimText: "Image claim: A dolphin was seen swimming in the canals of Venice...",
    imageUrl: "https://images.unsplash.com/photo-1570481662207-eda411065908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9scGhpbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60",
    verificationDate: new Date(2023, 11, 1, 12, 45),
    status: 'pending',
    summary: "Verification is currently in progress..."
  }
];

// --- Helper Components (StatusBadge updated for 'inconclusive') ---
const StatusBadge: React.FC<{ status: VerificationStatus }> = ({ status }) => {
  let bgColor = 'bg-slate-100';
  let textColor = 'text-slate-700';
  let Icon = QuestionMarkCircleIcon; // Default

  switch (status) {
    case 'verified':
      bgColor = 'bg-green-100'; textColor = 'text-green-700'; Icon = CheckCircleIcon; break;
    case 'debunked':
      bgColor = 'bg-red-100'; textColor = 'text-red-700'; Icon = XCircleIcon; break;
    case 'pending':
      bgColor = 'bg-sky-100'; textColor = 'text-sky-700'; Icon = ClockIcon; break;
    case 'inconclusive': // Added inconclusive
      bgColor = 'bg-yellow-100'; textColor = 'text-yellow-700'; Icon = QuestionMarkCircleIcon; break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      <Icon className="w-4 h-4 mr-1.5" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};


// --- Main History Component ---
const HistoryComponent = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<VerificationStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedHistory = useMemo(() => {
    // ... (filtering and sorting logic remains the same)
    let items = [...mockHistoryData];
    if (searchTerm) {
      items = items.filter(item =>
        item.claimText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterStatus !== 'all') {
      items = items.filter(item => item.status === filterStatus);
    }
    items.sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc'
          ? a.verificationDate.getTime() - b.verificationDate.getTime()
          : b.verificationDate.getTime() - a.verificationDate.getTime();
      }
      if (sortBy === 'status') {
        return sortOrder === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
      return 0;
    });
    return items;
  }, [searchTerm, filterStatus, sortBy, sortOrder]);


  const handleViewDetails = (itemId: string) => {
    // Use navigate to go to the detail page
    // Ensure your route is set up like '/dashboard/history/:claimId'
    navigate(`/dashboard/history/${itemId}`);
  };

  const handleGoToVerifyPage = () => {
    navigate('/dashboard/prompt'); // Or whatever your prompt page route is
  };


  return (
    <div className="h-full flex flex-col bg-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header and Controls (same) */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Verification History</h1>
        <p className="text-sm text-slate-600">
          Review all your past verified claims and their outcomes.
        </p>
      </div>

      {/* Search and Filter Bar (same) */}
      <div className="mb-6 p-4 bg-white rounded-xl shadow-sm flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full sm:w-auto">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search claims..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow text-sm"
          />
        </div>
        <div className="flex gap-3 items-center w-full sm:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as VerificationStatus | 'all')}
            className="p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm flex-grow sm:flex-grow-0"
            aria-label="Filter by status"
          >
            <option value="all">All Statuses</option>
            <option value="verified">Verified</option>
            <option value="debunked">Debunked</option>
            <option value="pending">Pending</option>
            <option value="inconclusive">Inconclusive</option> {/* Added to filter */}
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 focus:ring-2 focus:ring-sky-500 text-slate-600"
            title={`Sort by date ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
          >
            {sortOrder === 'asc' ? <ArrowUpIcon className="h-5 w-5" /> : <ArrowDownIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* History List / Empty State */}
      {filteredAndSortedHistory.length > 0 ? (
        <div className="flex-grow overflow-y-auto space-y-4 pr-1 -mr-1">
          {filteredAndSortedHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden flex flex-col sm:flex-row"
            >
              {item.imageUrl && (
                <div className="sm:w-1/4 flex-shrink-0">
                  <img src={item.imageUrl} alt="Claim image" className="w-full h-32 sm:h-full object-cover" />
                </div>
              )}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-sm sm:text-base font-medium text-slate-700 mb-2 line-clamp-2 hover:line-clamp-none transition-all">
                    {item.claimText}
                  </p>
                  {item.summary && (
                    <p className="text-xs text-slate-500 mb-3 line-clamp-1 hover:line-clamp-none transition-all">
                      {item.summary}
                    </p>
                  )}
                </div>
                <div className="mt-auto pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                    <div className="flex items-center">
                      <ClockIcon className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      {item.verificationDate.toLocaleDateString()}
                    </div>
                    {item.originalSource && (
                      <div className="flex items-center">
                        <LinkIcon className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        <span className="truncate max-w-[100px] sm:max-w-[150px]">{item.originalSource}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-2 sm:mt-0">
                    <StatusBadge status={item.status} />
                    <button
                      onClick={() => handleViewDetails(item.id)} // onClick calls handleViewDetails
                      className="inline-flex items-center text-xs font-medium text-sky-600 hover:text-sky-700 hover:underline focus:outline-none focus:ring-1 focus:ring-sky-500 focus:ring-offset-1 rounded-sm px-1 py-0.5"
                    >
                      View Details
                      <ChevronRightIcon className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center text-center p-10 bg-white rounded-xl shadow-sm">
          <ArchiveBoxXMarkIcon className="w-16 h-16 text-slate-300 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No History Yet</h3>
          <p className="text-slate-500 text-sm">
            Once you start verifying claims, they will appear here.
          </p>
          <button
            onClick={handleGoToVerifyPage} // Updated to use navigate
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Verify Your First Claim
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryComponent;