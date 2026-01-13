'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useChat, Message } from './chat-provider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Parse markdown links and render as clickable elements
 * Converts [text](url) to clickable links
 */
function parseMessageContent(content: string): React.ReactNode[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let keyIndex = 0;

  while ((match = linkRegex.exec(content)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }
    
    // Add the link
    const [, linkText, linkUrl] = match;
    parts.push(
      <a
        key={keyIndex++}
        href={linkUrl}
        className="text-blue-400 hover:text-blue-300 underline"
        target={linkUrl.startsWith('http') ? '_blank' : undefined}
        rel={linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {linkText}
      </a>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }
  
  return parts.length > 0 ? parts : [content];
}

/**
 * Chat message bubble component
 */
function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  
  return (
    <div
      className={cn(
        'flex w-full',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-2 text-sm',
          isUser
            ? 'bg-white text-zinc-900 rounded-br-sm'
            : 'bg-zinc-800 text-white rounded-bl-sm'
        )}
      >
        <p className="whitespace-pre-wrap break-words">
          {isUser ? message.content : parseMessageContent(message.content)}
        </p>
      </div>
    </div>
  );
}

/**
 * Loading indicator component
 */
function LoadingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-zinc-800 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}

/**
 * Chat icon SVG component
 */
function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Close icon SVG component
 */
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Send icon SVG component
 */
function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
  );
}

/**
 * ChatWidget component - Floating chat button and expandable chat panel
 * Implements Requirements: 1.1, 1.2, 1.3, 1.5, 3.3
 */
export function ChatWidget() {
  const { messages, isOpen, isLoading, error, sendMessage, toggleChat, clearError } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  /**
   * Handle message submission
   */
  const handleSubmit = async () => {
    const trimmed = inputValue.trim();
    if (trimmed.length === 0 || isLoading) return;
    
    setInputValue('');
    await sendMessage(trimmed);
  };

  /**
   * Handle keyboard events
   * Requirement 1.5: Keyboard accessibility
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  /**
   * Handle retry after error
   */
  const handleRetry = () => {
    clearError();
  };

  return (
    <>
      {/* Floating Action Button - Requirement 1.1 */}
      <button
        onClick={toggleChat}
        className={cn(
          'fixed bottom-6 right-6 z-50 flex items-center justify-center',
          'w-14 h-14 rounded-full shadow-lg transition-all duration-300',
          'bg-white text-zinc-900 hover:bg-zinc-100',
          'focus:outline-none focus:ring-2 focus:ring-white/50',
          isOpen && 'scale-0 opacity-0'
        )}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <ChatIcon className="w-6 h-6" />
      </button>

      {/* Chat Panel - Requirement 1.2, 1.3 */}
      <div
        className={cn(
          'fixed bottom-6 right-6 z-50 flex flex-col',
          'w-[360px] h-[500px] max-h-[80vh]',
          'bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl',
          'transition-all duration-300 origin-bottom-right',
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none',
          // Mobile responsive - Requirement 1.5
          'max-sm:w-[calc(100vw-48px)] max-sm:h-[calc(100vh-120px)] max-sm:bottom-4 max-sm:right-4'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <ChatIcon className="w-4 h-4 text-zinc-900" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">RD Realty Assistant</h3>
              <p className="text-xs text-zinc-400">Ask me about our properties</p>
            </div>
          </div>
          {/* Close button - Requirement 1.3 */}
          <button
            onClick={toggleChat}
            className="p-1.5 rounded-full hover:bg-zinc-800 transition-colors"
            aria-label="Close chat"
          >
            <CloseIcon className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <div className="text-center text-zinc-500 text-sm py-8">
              <p>👋 Hi! I&apos;m here to help you find the perfect space.</p>
              <p className="mt-2">Ask me about our properties, leasing process, or anything else!</p>
            </div>
          )}
          
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          
          {/* Loading indicator - Requirement 3.3 */}
          {isLoading && <LoadingIndicator />}
          
          {/* Error message with retry */}
          {error && (
            <div className="flex flex-col items-center gap-2 py-2">
              <p className="text-red-400 text-sm text-center">{error}</p>
              <Button
                onClick={handleRetry}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Try again
              </Button>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-zinc-800">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              className={cn(
                'flex-1 bg-zinc-900 border border-zinc-700 rounded-full',
                'px-4 py-2 text-sm text-white placeholder:text-zinc-500',
                'focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-zinc-600',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            />
            <Button
              onClick={handleSubmit}
              disabled={inputValue.trim().length === 0 || isLoading}
              size="icon"
              className="rounded-full bg-white text-zinc-900 hover:bg-zinc-200 disabled:opacity-50"
              aria-label="Send message"
            >
              <SendIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
