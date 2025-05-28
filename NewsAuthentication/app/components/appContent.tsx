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
import verifactLogo from '../assets/images/verifact-logo.png';

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
  { icon: ShieldCheckIcon, title: "Verify a Claim", text: "Paste a news snippet or upload an image to check its authenticity.", examplePrompt: "Is this headline about moon cheese true?", },
  { icon: LightBulbIcon, title: "Explore Topics", text: "Ask about common misconceptions or get summaries on debated issues.", examplePrompt: "Summarize the arguments for and against artificial sweeteners.", },
  { icon: SparklesIcon, title: "Quick Fact-Check", text: "Got a quick question? Verifact can try to find a swift answer.", examplePrompt: "What's the current population of Earth?", },
];

// --- Helper: Status Icon and Border Color ---
const getStatusStyles = (status: VerificationStatus) => {
  switch (status) {
    case 'verified':
      return { Icon: StatusVerifiedIcon, borderColor: 'border-green-500', textColor: 'text-green-600',bgColor:'bg-green-50' };
    case 'debunked':
      return { Icon: StatusDebunkedIcon, borderColor: 'border-red-500', textColor: 'text-red-600', bgColor:'bg-red-50' };
    case 'inconclusive':
      return { Icon: StatusInconclusiveIcon, borderColor: 'border-yellow-500', textColor: 'text-yellow-600',bgColor:'bg-yellow-50' };
    case 'pending':
    default:
      return { Icon: StatusPendingIcon, borderColor: 'border-sky-500', textColor: 'text-sky-600', bgColor:'bg-sky-50' };
  }
};


const AppContent = () => {
  const [hasStartedChat, setHasStartedChat] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]); // Use the union type
  const [inputText, setInputText] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { /* ... textarea resize ... */
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [inputText]);

  useEffect(() => { /* ... scroll to bottom ... */
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => { /* ... same ... */
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => { setImagePreview(reader.result as string); };
      reader.readAsDataURL(file);
    }
  };
  const handleUploadClick = () => { fileInputRef.current?.click(); };
  const handleRemoveImage = () => { /* ... same ... */
    setSelectedImage(null); setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSuggestionClick = (promptText: string) => { /* ... same ... */
    setInputText(promptText); textareaRef.current?.focus();
  };

  const handleSubmit = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!inputText.trim() && !selectedImage) return;

    if (!hasStartedChat) {
      setHasStartedChat(true);
    }

    const userMessage: UserChatMessage = { // Explicitly type as UserChatMessage
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
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    // Simulate API call and Verifact's structured response
    setTimeout(() => {
      // Simulate getting a status and details from your backend
      const mockStatuses: VerificationStatus[] = ['verified', 'debunked', 'inconclusive', 'pending'];
      const randomStatus = mockStatuses[Math.floor(Math.random() * mockStatuses.length)];

      const verifactResponse: VerifactResponseMessage = { // Explicitly type
        id: crypto.randomUUID(),
        sender: 'verifact',
        status: randomStatus,
        summary: `The claim about "${currentInputText || currentSelectedImageName || 'your query'}" has been analyzed. Our initial findings suggest it is ${randomStatus}.`,
        details: `Further investigation reveals several key points supporting this assessment. For instance, [Dummy Detail 1 related to ${currentInputText || currentSelectedImageName}]. \nAdditionally, [Dummy Detail 2 pointing towards the ${randomStatus} status]. \nWe cross-referenced multiple sources, including [Source A] and [Report B], to arrive at this conclusion. More information can be found in our comprehensive analysis document.`,
        originalQuery: {
          text: currentInputText || undefined,
          imageName: currentSelectedImageName || undefined,
        },
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, verifactResponse]);
    }, 2000); // Increased delay for better UX simulation sha. you'll have to modify this, i think.
  };

  const canSubmit = inputText.trim() !== '' || selectedImage !== null;

  return (
    <div className="flex flex-col h-full bg-slate-100">
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
        {!hasStartedChat && (
          <div className="flex flex-col items-center justify-center flex-grow py-8 h-full max-w-3xl mx-auto text-center">
            <img src={verifactLogo} alt="Verifact" className="h-16 w-auto mb-6" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">Welcome to Verifact!</h1>
            <p className="text-lg text-slate-600 mb-10">Verify rumors, check information, and explore topics with confidence. How can I help you today?</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full ">
              {initialSuggestions.map((suggestion, index) => (
                <button key={index} onClick={() => handleSuggestionClick(suggestion.examplePrompt)}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center flex flex-col items-center h-full focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                  <suggestion.icon className="h-7 w-7 text-sky-600 mb-2" />
                  <h3 className="font-semibold text-slate-700 mb-1">{suggestion.title}</h3>
                  <p className="text-sm text-slate-500 flex-grow">{suggestion.text}</p>
                  <p className="text-xs text-sky-600 mt-3 pt-2 border-t border-slate-200 w-full">Try: "{suggestion.examplePrompt}"</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- Rendered Messages --- */}
        {messages.map((msg) => {
          if (msg.sender === 'user') {
            // --- User Message ---
            return (
              <div key={msg.id} className="flex justify-end ml-10 sm:ml-20"> {/* Push user messages more to the right */}
                <div className="flex items-start gap-3">
                    <div className="max-w-sm sm:max-w-md md:max-w-lg p-3.5 rounded-xl rounded-br-none shadow-md bg-sky-600 text-white border border-sky-700">
                        {msg.imageUrl && (
                        <div className="mb-2 rounded overflow-hidden">
                            <img src={msg.imageUrl} alt={msg.imageName || 'Uploaded image'} className="max-h-60 w-auto" />
                        </div>
                        )}
                        {msg.text && <p className="whitespace-pre-wrap break-words">{msg.text}</p>}
                        <p className="text-xs mt-2 opacity-70 text-right">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                    <UserCircleIcon className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 text-slate-400 mt-1" />
                </div>
              </div>
            );
          } else {
            // --- Verifact Structured Response ---
            const { Icon: StatusIcon, borderColor, textColor, bgColor } = getStatusStyles(msg.status);
            return (
              <div key={msg.id} className="flex justify-start mr-10 sm:mr-20"> {/* Push Verifact messages more to the left */}
                <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full ${bgColor} flex items-center justify-center border ${borderColor} mt-1`}>
                        <CpuChipIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${textColor}`} />
                    </div>
                    <div className={`max-w-sm sm:max-w-md md:max-w-lg p-4 rounded-xl rounded-bl-none shadow-lg bg-white border-l-4 ${borderColor}`}>
                        <div className="mb-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${bgColor} ${textColor} border ${borderColor}`}>
                                <StatusIcon className="w-4 h-4 mr-1.5" />
                                Status: {msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}
                            </span>
                        </div>

                        {/* Displaying the original query this response is for */}
                        {(msg.originalQuery.text || msg.originalQuery.imageName) && (
                            <div className="mb-3 p-2 bg-slate-50 rounded text-xs text-slate-500 border border-slate-200">
                                Regarding your query:
                                {msg.originalQuery.text && <em className="block mt-1">"{msg.originalQuery.text}"</em>}
                                {msg.originalQuery.imageName && <em className="block mt-1">Image: {msg.originalQuery.imageName}</em>}
                            </div>
                        )}
                        
                        <div className="mb-3">
                            <h4 className={`font-semibold ${textColor} mb-1`}>Summary:</h4>
                            <p className="text-sm text-slate-700 whitespace-pre-wrap break-words">{msg.summary}</p>
                        </div>
                        
                        <div>
                            <h4 className={`font-semibold ${textColor} mb-1`}>Details:</h4>
                            <div className="prose prose-sm max-w-none text-slate-600">
                                {msg.details.split('\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        <p className="text-xs mt-3 pt-2 border-t border-slate-200 text-slate-500">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div className="flex-shrink-0 p-3 sm:p-4 border-t">
        <div className="w-full max-w-3xl mx-auto">
          {imagePreview && !messages.find(m => m.sender === 'user' && m.imageUrl === imagePreview) && (
            <div className="mb-3 p-2 border border-slate-300 rounded-lg bg-slate-100 relative w-fit max-w-xs">
              <img src={imagePreview} alt="Selected preview" className="max-h-32 rounded" />
              <button onClick={handleRemoveImage} className="absolute -top-2 -right-2 p-0.5 bg-slate-600 text-white rounded-full hover:bg-red-600 transition-colors" aria-label="Remove image">
                <XCircleIcon className="h-5 w-5" />
              </button>
              <p className="text-xs text-slate-500 mt-1 truncate" title={selectedImage?.name}>{selectedImage?.name}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="relative flex items-end p-1.5 sm:p-2 bg-white border border-slate-300 rounded-xl shadow-md focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500">
            <button type="button" onClick={handleUploadClick} className="p-2 text-slate-500 hover:text-sky-600 rounded-full focus:outline-none focus:ring-1 focus:ring-sky-500 mr-1 sm:mr-2 group relative" aria-label="Upload image">
              <PlusCircleIcon className="h-6 w-6 sm:h-7 sm:w-7 transition-colors" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap px-2 py-1 bg-slate-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity pointer-events-none">Upload Image</span>
            </button>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" aria-hidden="true" />
            <textarea ref={textareaRef} rows={1} value={inputText} onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (canSubmit) handleSubmit(); } }}
              placeholder="Send a message or upload an image..."
              className="flex-grow p-2 pr-10 sm:pr-12 bg-transparent border-none resize-none focus:outline-none focus:ring-0 text-slate-800 placeholder-slate-400 text-sm sm:text-base max-h-36 sm:max-h-40 overflow-y-auto" />
            <button type="submit" disabled={!canSubmit}
              className={`absolute right-2 sm:right-3 bottom-2 sm:bottom-3 p-1.5 sm:p-2 rounded-lg transition-colors ${canSubmit ? 'bg-sky-600 text-white hover:bg-sky-700' : 'bg-slate-300 text-slate-500 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-500`}
              aria-label="Send message">
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </form>
          <p className="text-xs text-slate-400 text-center mt-2 px-2">Verifact can make mistakes. Consider checking important information.</p>
        </div>
      </div>
    </div>
  );
};

export default AppContent;