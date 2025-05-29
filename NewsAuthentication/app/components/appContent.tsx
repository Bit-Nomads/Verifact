import React, { useState, useEffect, useRef } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import {
  PaperAirplaneIcon,
  PlusCircleIcon,
  XCircleIcon,
  UserCircleIcon,
  CpuChipIcon,
  SparklesIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  CheckCircleIcon as StatusVerifiedIcon,
  XCircleIcon as StatusDebunkedIcon,
  QuestionMarkCircleIcon as StatusInconclusiveIcon,
  ClockIcon as StatusPendingIcon,
} from '@heroicons/react/24/solid';

// --- Types ---
type VerificationStatus = 'verified' | 'debunked' | 'pending' | 'inconclusive';

interface UserChatMessage {
  id: string;
  sender: 'user';
  text?: string;
  imageUrl?: string;
  imageName?: string;
  timestamp: Date;
}

interface VerifactResponseMessage {
  id: string;
  sender: 'verifact';
  status: VerificationStatus;
  summary: string;
  details: string;
  originalQuery: {
    text?: string;
    imageName?: string;
  };
  timestamp: Date;
}

type Message = UserChatMessage | VerifactResponseMessage;

const initialSuggestions = [
  { 
    icon: ShieldCheckIcon, 
    title: "Verify a Claim", 
    text: "Paste a news snippet or upload an image to check its authenticity.", 
    examplePrompt: "Is this headline about moon cheese true?",
    color: "from-emerald-500 to-teal-600"
  },
  { 
    icon: LightBulbIcon, 
    title: "Explore Topics", 
    text: "Ask about common misconceptions or get summaries on debated issues.", 
    examplePrompt: "Summarize the arguments for and against artificial sweeteners.",
    color: "from-amber-500 to-orange-600"
  },
  { 
    icon: SparklesIcon, 
    title: "Quick Fact-Check", 
    text: "Got a quick question? Verifact can try to find a swift answer.", 
    examplePrompt: "What's the current population of Earth?",
    color: "from-purple-500 to-indigo-600"
  },
];

// --- Helper: Status Icon and Border Color ---
const getStatusStyles = (status: VerificationStatus) => {
  switch (status) {
    case 'verified':
      return { 
        Icon: StatusVerifiedIcon, 
        borderColor: 'border-emerald-400', 
        textColor: 'text-emerald-700',
        bgColor: 'bg-emerald-50',
        accent: 'bg-gradient-to-r from-emerald-500 to-teal-600'
      };
    case 'debunked':
      return { 
        Icon: StatusDebunkedIcon, 
        borderColor: 'border-rose-400', 
        textColor: 'text-rose-700', 
        bgColor: 'bg-rose-50',
        accent: 'bg-gradient-to-r from-rose-500 to-pink-600'
      };
    case 'inconclusive':
      return { 
        Icon: StatusInconclusiveIcon, 
        borderColor: 'border-amber-400', 
        textColor: 'text-amber-700',
        bgColor: 'bg-amber-50',
        accent: 'bg-gradient-to-r from-amber-500 to-orange-600'
      };
    case 'pending':
    default:
      return { 
        Icon: StatusPendingIcon, 
        borderColor: 'border-sky-400', 
        textColor: 'text-sky-700', 
        bgColor: 'bg-sky-50',
        accent: 'bg-gradient-to-r from-sky-500 to-blue-600'
      };
  }
};

const AppContent = () => {
  const [hasStartedChat, setHasStartedChat] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 160)}px`;
    }
  }, [inputText]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => { setImagePreview(reader.result as string); };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => { fileInputRef.current?.click(); };
  
  const handleRemoveImage = () => {
    setSelectedImage(null); 
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  
  const handleSuggestionClick = (promptText: string) => {
    setInputText(promptText); 
    textareaRef.current?.focus();
  };

  const handleSubmit = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!inputText.trim() && !selectedImage) return;

    if (!hasStartedChat) {
      setHasStartedChat(true);
    }

    const userMessage: UserChatMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: inputText.trim() || undefined,
      imageUrl: imagePreview || undefined,
      imageName: selectedImage?.name || undefined,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const currentInputText = inputText.trim();
    const currentSelectedImageName = selectedImage?.name;

    setInputText('');
    setSelectedImage(null);
    setImagePreview(null);
    setIsLoading(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    // Simulate API call
    setTimeout(() => {
      const mockStatuses: VerificationStatus[] = ['verified', 'debunked', 'inconclusive', 'pending'];
      const randomStatus = mockStatuses[Math.floor(Math.random() * mockStatuses.length)];

      const verifactResponse: VerifactResponseMessage = {
        id: crypto.randomUUID(),
        sender: 'verifact',
        status: randomStatus,
        summary: `The claim about "${currentInputText || currentSelectedImageName || 'your query'}" has been analyzed. Our initial findings suggest it is ${randomStatus}.`,
        details: `Further investigation reveals several key points supporting this assessment. For instance, [Dummy Detail 1 related to ${currentInputText || currentSelectedImageName}]. \n\nAdditionally, [Dummy Detail 2 pointing towards the ${randomStatus} status]. \n\nWe cross-referenced multiple sources, including [Source A] and [Report B], to arrive at this conclusion. More information can be found in our comprehensive analysis document.`,
        originalQuery: {
          text: currentInputText || undefined,
          imageName: currentSelectedImageName || undefined,
        },
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, verifactResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const canSubmit = inputText.trim() !== '' || selectedImage !== null;

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 sm:p-6 pt-8 sm:pt-6 space-y-6 sm:space-y-8">
        {!hasStartedChat && (
          <div className="flex flex-col items-center justify-center flex-grow py-8 sm:py-12 h-full max-w-4xl mx-auto text-center">
            {/* Logo with gradient background */}
            <div className="relative mb-6 sm:mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full blur-xl opacity-20 scale-110"></div>
              <div className="relative bg-gradient-to-r from-sky-500 to-blue-600 p-3 sm:p-4 rounded-2xl shadow-2xl">
                <CpuChipIcon className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
              </div>
            </div>
            
            <div className="mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                Welcome to Verifact
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
                Verify rumors, check information, and explore topics with confidence. 
                <span className="block mt-2 text-base sm:text-lg text-slate-500">How can I help you today?</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl px-4">
              {initialSuggestions.map((suggestion, index) => (
                <button 
                  key={index} 
                  onClick={() => handleSuggestionClick(suggestion.examplePrompt)}
                  className="group relative bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center flex flex-col items-center h-full focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 hover:-translate-y-1 border border-white/50"
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${suggestion.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <suggestion.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2 text-base sm:text-lg">{suggestion.title}</h3>
                  <p className="text-slate-600 flex-grow leading-relaxed text-sm sm:text-base">{suggestion.text}</p>
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-200 w-full">
                    <p className="text-xs sm:text-sm text-slate-500 italic">Try: "{suggestion.examplePrompt}"</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex justify-end ml-12 sm:ml-24 animate-fade-in-up">
                <div className="flex items-start gap-4 max-w-2xl">
                  <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-4 rounded-2xl rounded-br-md shadow-lg text-white">
                    {msg.imageUrl && (
                      <div className="mb-3 rounded-lg overflow-hidden">
                        <img src={msg.imageUrl} alt={msg.imageName || 'Uploaded image'} className="max-h-60 w-auto rounded-lg" />
                      </div>
                    )}
                    {msg.text && <p className="whitespace-pre-wrap break-words leading-relaxed">{msg.text}</p>}
                    <p className="text-xs mt-3 opacity-80 text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-2 rounded-full shadow-lg">
                    <UserCircleIcon className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            );
          } else {
            const { Icon: StatusIcon, borderColor, textColor, bgColor, accent } = getStatusStyles(msg.status);
            return (
              <div key={msg.id} className="flex justify-start mr-12 sm:mr-24 animate-fade-in-up">
                <div className="flex items-start gap-4 max-w-2xl">
                  <div className={`p-2 rounded-full shadow-lg ${accent}`}>
                    <CpuChipIcon className="h-8 w-8 text-white" />
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl rounded-bl-md shadow-xl border-l-4 border-0" style={{borderLeftColor: `var(--${msg.status}-color)`}}>
                    <div className="mb-4">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${bgColor} ${textColor} border ${borderColor} shadow-sm`}>
                        <StatusIcon className="w-4 h-4 mr-2" />
                        {msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}
                      </span>
                    </div>

                    {(msg.originalQuery.text || msg.originalQuery.imageName) && (
                      <div className="mb-4 p-3 bg-slate-50/80 rounded-xl text-sm text-slate-600 border border-slate-200/50">
                        <span className="font-medium text-slate-700">Regarding your query:</span>
                        {msg.originalQuery.text && <em className="block mt-1 text-slate-600">"{msg.originalQuery.text}"</em>}
                        {msg.originalQuery.imageName && <em className="block mt-1 text-slate-600">Image: {msg.originalQuery.imageName}</em>}
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <h4 className={`font-bold ${textColor} mb-2 text-lg`}>Summary</h4>
                      <p className="text-slate-700 whitespace-pre-wrap break-words leading-relaxed">{msg.summary}</p>
                    </div>
                    
                    <div>
                      <h4 className={`font-bold ${textColor} mb-2 text-lg`}>Details</h4>
                      <div className="prose prose-slate max-w-none text-slate-600">
                        {msg.details.split('\n').filter(p => p.trim()).map((paragraph, index) => (
                          <p key={index} className="mb-3 leading-relaxed">{paragraph}</p>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs mt-4 pt-3 border-t border-slate-200/50 text-slate-500">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
        })}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start mr-12 sm:mr-24 animate-fade-in-up">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-r from-slate-400 to-slate-500 p-2 rounded-full shadow-lg">
                <CpuChipIcon className="h-8 w-8 text-white animate-pulse" />
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl rounded-bl-md shadow-xl">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-slate-500 text-sm">Analyzing...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-6 border-t border-slate-200/50 bg-white/50 backdrop-blur-sm">
        <div className="w-full max-w-4xl mx-auto">
          {imagePreview && !messages.find(m => m.sender === 'user' && m.imageUrl === imagePreview) && (
            <div className="mb-4 p-3 border border-slate-300 rounded-2xl bg-white/80 backdrop-blur-sm relative w-fit max-w-xs shadow-lg">
              <img src={imagePreview} alt="Selected preview" className="max-h-32 rounded-xl" />
              <button 
                onClick={handleRemoveImage} 
                className="absolute -top-2 -right-2 p-1 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors shadow-lg hover:scale-110 transform" 
                aria-label="Remove image"
              >
                <XCircleIcon className="h-4 w-4" />
              </button>
              <p className="text-xs text-slate-500 mt-2 truncate font-medium" title={selectedImage?.name}>
                {selectedImage?.name}
              </p>
            </div>
          )}
          
          <div className="relative flex items-end p-2 bg-white/80 backdrop-blur-sm border border-slate-300/50 rounded-2xl shadow-xl focus-within:ring-2 focus-within:ring-sky-500/50 focus-within:border-sky-400 transition-all duration-200">
            <button 
              type="button" 
              onClick={handleUploadClick} 
              className="p-3 text-slate-500 hover:text-sky-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/50 mr-2 group relative hover:bg-slate-50 transition-all duration-200" 
              aria-label="Upload image"
            >
              <PlusCircleIcon className="h-6 w-6 transition-all duration-200 group-hover:scale-110" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap px-3 py-1.5 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity pointer-events-none shadow-lg">
                Upload Image
              </span>
            </button>
            
            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" aria-hidden="true" />
            
            <textarea 
              ref={textareaRef} 
              rows={1} 
              value={inputText} 
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => { 
                if (e.key === 'Enter' && !e.shiftKey) { 
                  e.preventDefault(); 
                  if (canSubmit) handleSubmit(); 
                } 
              }}
              placeholder="Send a message or upload an image..."
              className="flex-grow p-3 pr-14 bg-transparent border-none resize-none focus:outline-none focus:ring-0 text-slate-800 placeholder-slate-500 text-base max-h-40 overflow-y-auto leading-relaxed"
              disabled={isLoading}
            />
            
            <button 
              onClick={() => canSubmit && !isLoading && handleSubmit()} 
              disabled={!canSubmit || isLoading}
              className={`absolute right-2 bottom-2 p-2.5 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-500 ${
                canSubmit && !isLoading 
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700 shadow-lg hover:shadow-xl hover:scale-105' 
                  : 'bg-slate-300 text-slate-500'
              }`}
              aria-label="Send message"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
                      </div>
          
          <p className="text-xs text-slate-500 text-center mt-3 px-2">
            Verifact can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }
        
        :root {
          --verified-color: rgb(52 211 153);
          --debunked-color: rgb(244 63 94);
          --inconclusive-color: rgb(245 158 11);
          --pending-color: rgb(14 165 233);
        }
      `}</style>
    </div>
  );
};

export default AppContent;