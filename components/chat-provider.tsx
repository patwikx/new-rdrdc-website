'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

/**
 * Message interface representing a single chat message
 */
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

/**
 * Chat context value interface
 */
export interface ChatContextValue {
  messages: Message[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  toggleChat: () => void;
  clearError: () => void;
}

/**
 * Session storage key for persisting messages
 */
const STORAGE_KEY = 'rd-realty-chat-messages';
const LAST_ACTIVITY_KEY = 'rd-realty-chat-last-activity';

/**
 * Inactivity timeout in milliseconds (5 minutes)
 */
const INACTIVITY_TIMEOUT = 5 * 60 * 1000;

/**
 * Generate a unique ID for messages
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Serialize messages for storage (convert Date to ISO string)
 */
function serializeMessages(messages: Message[]): string {
  return JSON.stringify(
    messages.map((msg) => ({
      ...msg,
      timestamp: msg.timestamp.toISOString(),
    }))
  );
}

/**
 * Deserialize messages from storage (convert ISO string back to Date)
 */
function deserializeMessages(data: string): Message[] {
  try {
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((msg: { id: string; role: 'user' | 'assistant'; content: string; timestamp: string }) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }));
  } catch {
    return [];
  }
}

// Create context with undefined default
const ChatContext = createContext<ChatContextValue | undefined>(undefined);

/**
 * Chat Provider Props
 */
interface ChatProviderProps {
  children: ReactNode;
}

/**
 * ChatProvider component that manages chat state and provides context
 * Implements Requirements: 2.1, 2.2, 2.3, 2.4, 3.1, 3.3, 3.4, 3.5
 */
export function ChatProvider({ children }: ChatProviderProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  /**
   * Clear all messages and reset chat
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(LAST_ACTIVITY_KEY);
    }
  }, []);

  /**
   * Update last activity timestamp
   */
  const updateLastActivity = useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
    }
  }, []);

  /**
   * Check if chat should be cleared due to inactivity
   */
  const checkInactivity = useCallback(() => {
    if (typeof window !== 'undefined') {
      const lastActivity = sessionStorage.getItem(LAST_ACTIVITY_KEY);
      if (lastActivity) {
        const elapsed = Date.now() - parseInt(lastActivity, 10);
        if (elapsed >= INACTIVITY_TIMEOUT) {
          clearMessages();
        }
      }
    }
  }, [clearMessages]);

  // Load messages from sessionStorage on mount and check for inactivity
  // Requirement 2.2, 2.3, 2.4: Maintain conversation history within session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check inactivity first
      checkInactivity();
      
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const loadedMessages = deserializeMessages(stored);
        setMessages(loadedMessages);
      }
      setIsHydrated(true);
    }
  }, [checkInactivity]);

  // Set up inactivity timer - check every minute
  useEffect(() => {
    if (!isHydrated) return;

    const intervalId = setInterval(() => {
      checkInactivity();
    }, 60 * 1000); // Check every minute

    return () => clearInterval(intervalId);
  }, [isHydrated, checkInactivity]);

  // Persist messages to sessionStorage whenever they change
  // Requirement 2.3: Preserve messages during page navigation
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, serializeMessages(messages));
    }
  }, [messages, isHydrated]);

  /**
   * Toggle chat widget open/closed state
   * Requirement 1.2: Expand/collapse chat interface
   */
  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  /**
   * Clear error state
   * Used when user retries after an error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Send a message to the chatbot API
   * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5
   */
  const sendMessage = useCallback(async (content: string) => {
    // Requirement 3.2: Prevent empty or whitespace-only messages
    const trimmedContent = content.trim();
    if (trimmedContent.length === 0) {
      return;
    }

    // Update last activity timestamp
    updateLastActivity();

    // Clear any previous error
    setError(null);

    // Create user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: trimmedContent,
      timestamp: new Date(),
    };

    // Add user message to history
    // Requirement 3.1: Transmit message to API
    setMessages((prev) => [...prev, userMessage]);

    // Set loading state
    // Requirement 3.3: Display loading indicator
    setIsLoading(true);

    try {
      // Build history for API (exclude the message we just added)
      const history = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Call chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmedContent,
          history,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        // Requirement 3.5: Display user-friendly error message
        throw new Error(data.error || 'Unable to process your request');
      }

      // Requirement 3.4: Display response in chat interface
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      // Requirement 3.5: Handle API errors gracefully
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Something went wrong. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [messages, updateLastActivity]);

  const value: ChatContextValue = {
    messages,
    isOpen,
    isLoading,
    error,
    sendMessage,
    toggleChat,
    clearError,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

/**
 * Custom hook to use chat context
 * Throws error if used outside of ChatProvider
 */
export function useChat(): ChatContextValue {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
