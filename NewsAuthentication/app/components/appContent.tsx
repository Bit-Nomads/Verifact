
import React, { useState, useEffect, useRef } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import {
  PaperAirplaneIcon,
  PlusCircleIcon,
  XCircleIcon,
  // PhotoIcon, // Not actively used, can be removed if not planned
  UserCircleIcon,
  CpuChipIcon,
  SparklesIcon, // For a bit of flair
  LightBulbIcon, // For example prompts
  ShieldCheckIcon, // For verify feature
} from '@heroicons/react/24/solid'; // Using solid for more presence
import verifactLogo from '../assets/images/verifact-logo.png'; // Assuming you might want the logo here

interface ChatMessage {
  id: string;
  sender: 'user' | 'verifact';
  text?: string;
  imageUrl?: string;
  imageName?: string;
  timestamp: Date;
}

// Data for the initial screen suggestions
const initialSuggestions = [
  {
    icon: ShieldCheckIcon,
    title: "Verify a Claim",
    text: "Paste a news snippet or upload an image to check its authenticity.",
    examplePrompt: "Is this headline about moon cheese true?",
  },
  {
    icon: LightBulbIcon,
    title: "Explore Topics",
    text: "Ask about common misconceptions or get summaries on debated issues.",
    examplePrompt: "Summarize the arguments for and against artificial sweeteners.",
  },
  {
    icon: SparklesIcon,
    title: "Quick Fact-Check",
    text: "Got a quick question? Verifact can try to find a swift answer.",
    examplePrompt: "What's the current population of Earth?",
  },
];


const AppContent = () => {
  const [hasStartedChat, setHasStartedChat] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
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
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    console.log("Upload image clicked", fileInputRef.current);
    fileInputRef.current?.click(); // This should trigger the file picker
  };

  const handleRemoveImage = () => {
    console.log("Remove image clicked");
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSuggestionClick = (promptText: string) => {
    setInputText(promptText);
    textareaRef.current?.focus(); // Focus the textarea after setting text
  };

  const handleSubmit = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!inputText.trim() && !selectedImage) return;

    if (!hasStartedChat) {
      setHasStartedChat(true);
    }

    const userMessage: ChatMessage = {
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

    setTimeout(() => {
      const verifactResponse: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'verifact',
        text: `Okay, I've received your request regarding "${currentInputText || 'the uploaded image'}${currentSelectedImageName ? ` (${currentSelectedImageName})` : ''}". I'm processing it now... (This is a simulated response)`,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, verifactResponse]);
    }, 1500);
  };

  const canSubmit = inputText.trim() !== '' || selectedImage !== null;

  return (
    <div className="flex flex-col h-full bg-slate-100"> {/* Overall background */}
      {/* Chat Area */}
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
        {!hasStartedChat && (
          <div className="flex flex-col items-center justify-center flex-grow py-8 h-full max-w-3xl mx-auto text-center">
            <img src={verifactLogo} alt="Verifact" className="h-16 w-auto mb-6" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
              Welcome to Verifact!
            </h1>
            <p className="text-lg text-slate-600 mb-10">
              Verify rumors, check information, and explore topics with confidence. How can I help you today?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {initialSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.examplePrompt)}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left flex flex-col items-start h-full focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  <suggestion.icon className="h-7 w-7 text-sky-600 mb-2" />
                  <h3 className="font-semibold text-slate-700 mb-1">{suggestion.title}</h3>
                  <p className="text-sm text-slate-500 flex-grow">{suggestion.text}</p>
                  <p className="text-xs text-sky-600 mt-3 pt-2 border-t border-slate-200 w-full">
                    Try: "{suggestion.examplePrompt}"
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Rendered Messages (same as before) */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'verifact' && (
              <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-sky-500 flex items-center justify-center text-white">
                <CpuChipIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            )}
            <div
              className={`max-w-xs sm:max-w-md md:max-w-lg p-3 rounded-xl shadow-md
                          ${msg.sender === 'user'
                            ? 'bg-sky-600 text-white rounded-br-none'
                            : 'bg-white text-slate-800 rounded-bl-none border border-slate-200'
                          }`}
            >
              {msg.imageUrl && (
                <div className="mb-2">
                  <img src={msg.imageUrl} alt={msg.imageName || 'Uploaded image'} className="max-h-60 rounded-md" />
                  {msg.imageName && <p className="text-xs mt-1 opacity-80">{msg.imageName}</p>}
                </div>
              )}
              {msg.text && <p className="whitespace-pre-wrap break-words">{msg.text}</p>}
              <p className={`text-xs mt-2 opacity-70 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {msg.sender === 'user' && (
              <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-slate-300 flex items-center justify-center text-slate-600">
                <UserCircleIcon className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-3 sm:p-4 border-t ">
        <div className="w-full max-w-3xl mx-auto">
          {/* ... (image preview logic remains the same) ... */}
          {imagePreview && !messages.find(m => m.imageUrl === imagePreview && m.sender === 'user') && (
            <div className="mb-3 p-2 border border-slate-300 rounded-lg bg-slate-100 relative w-fit max-w-xs">
              <img src={imagePreview} alt="Selected preview" className="max-h-32 rounded" />
              <button
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 p-0.5 bg-slate-600 text-white rounded-full hover:bg-red-600 transition-colors"
                aria-label="Remove image"
              >
                <XCircleIcon className="h-5 w-5" />
              </button>
              <p className="text-xs text-slate-500 mt-1 truncate" title={selectedImage?.name}>
                {selectedImage?.name}
              </p>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="relative flex items-end p-1.5 sm:p-2 bg-white border border-slate-300 rounded-xl shadow-md focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500"
          >
            <button
              type="button"
              onClick={handleUploadClick} // This calls fileInputRef.current?.click()
              className="p-2 text-slate-500 hover:text-sky-600 rounded-full focus:outline-none focus:ring-1 focus:ring-sky-500 mr-1 sm:mr-2 group relative"
              aria-label="Upload image"
            >
              <PlusCircleIcon className="h-6 w-6 sm:h-7 sm:w-7 transition-colors" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap px-2 py-1 bg-slate-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity pointer-events-none">
                Upload Image
              </span>
            </button>
            <input
              type="file" ref={fileInputRef} onChange={handleImageChange}
              accept="image/*" // Accepts all image types
              className="hidden" aria-hidden="true"
            />
            {/* ... (textarea and send button remain the same) ... */}
            <textarea
              ref={textareaRef} rows={1} value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (canSubmit) handleSubmit();
                }
              }}
              placeholder="Send a message or upload an image..."
              className="flex-grow p-2 pr-10 sm:pr-12 bg-transparent border-none resize-none focus:outline-none focus:ring-0 text-slate-800 placeholder-slate-400 text-sm sm:text-base max-h-36 sm:max-h-40 overflow-y-auto"
            />
            <button
              type="submit" disabled={!canSubmit}
              className={`absolute right-2 sm:right-3 bottom-2 sm:bottom-3 p-1.5 sm:p-2 rounded-lg transition-colors
                          ${canSubmit ? 'bg-sky-600 text-white hover:bg-sky-700' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}
                          focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-500`}
              aria-label="Send message"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </form>
          <p className="text-xs text-slate-400 text-center mt-2 px-2">
            Verifact can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppContent;