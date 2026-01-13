# Implementation Plan: AI Chatbot

## Overview

This implementation plan breaks down the AI chatbot feature into discrete coding tasks. Each task builds incrementally on previous work, ensuring no orphaned code. The implementation uses TypeScript, React, and Next.js API routes, matching the existing codebase.

## Tasks

- [x] 1. Install dependencies and configure environment
  - Install Google Generative AI SDK: `@google/generative-ai`
  - Install fast-check for property-based testing: `fast-check`
  - Add `GOOGLE_GEMINI_API_KEY` to `.env` file
  - _Requirements: 8.1, 8.5_

- [x] 2. Create system prompt builder with property context
  - [x] 2.1 Create `lib/chatbot-prompt.ts` with buildSystemPrompt function
    - Include all property data from `lib/data.ts`
    - Add RD Realty contact information
    - Define conversation boundaries and tone guidelines
    - Include leasing process information
    - _Requirements: 4.1, 5.1, 7.1_
  - [ ]* 2.2 Write property test for system prompt completeness
    - **Property 6: System Prompt Completeness**
    - **Validates: Requirements 4.1, 8.4**

- [ ] 3. Implement chat API route
  - [x] 3.1 Create `app/api/chat/route.ts` with POST handler
    - Validate incoming request (message field required)
    - Initialize Gemini client with API key
    - Build conversation with system prompt and history
    - Call Gemini API and return response
    - _Requirements: 8.1, 8.2, 8.3, 8.4_
  - [ ]* 3.2 Write property test for request validation
    - **Property 7: Request Validation**
    - **Validates: Requirements 8.2**
  - [ ]* 3.3 Write property test for API error handling
    - **Property 5: API Error Handling**
    - **Validates: Requirements 3.5, 8.3**

- [x] 4. Checkpoint - Verify API route works
  - Ensure API route compiles without errors
  - Test manually with curl or API client if needed
  - Ask the user if questions arise

- [x] 5. Create chat context provider for state management
  - [x] 5.1 Create `components/chat-provider.tsx` with ChatContext
    - Define Message interface and ChatContextValue
    - Implement messages state with sessionStorage persistence
    - Implement sendMessage function with API call
    - Handle loading and error states
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 3.1, 3.3, 3.4, 3.5_
  - [ ]* 5.2 Write property test for message history preservation
    - **Property 2: Message History Preservation**
    - **Validates: Requirements 2.2, 2.3, 2.4**
  - [ ]* 5.3 Write property test for empty message rejection
    - **Property 3: Empty Message Rejection**
    - **Validates: Requirements 3.2**
  - [ ]* 5.4 Write property test for message transmission integrity
    - **Property 4: Message Transmission Integrity**
    - **Validates: Requirements 3.1, 3.4**

- [x] 6. Create chat widget UI component
  - [x] 6.1 Create `components/chat-widget.tsx` with floating button and chat panel
    - Render floating action button in bottom-right corner
    - Implement expandable chat panel with message list
    - Add message input with send button
    - Display loading indicator during API calls
    - Show error messages with retry option
    - Style with Tailwind CSS matching site theme
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 3.3_
  - [ ]* 6.2 Write property test for widget toggle state consistency
    - **Property 1: Widget Toggle State Consistency**
    - **Validates: Requirements 1.2**

- [x] 7. Integrate chatbot into application layout
  - [x] 7.1 Update `app/layout.tsx` to include ChatProvider and ChatWidget
    - Wrap children with ChatProvider
    - Add ChatWidget component after main content
    - _Requirements: 1.1, 1.4, 2.3_

- [ ] 8. Checkpoint - Full integration test
  - Ensure all components compile without errors
  - Verify chat widget appears on all pages
  - Test conversation flow end-to-end
  - Ask the user if questions arise

- [ ] 9. Final polish and edge cases
  - [ ] 9.1 Add keyboard accessibility (Enter to send, Escape to close)
    - Handle Enter key in input field
    - Handle Escape key to close widget
    - _Requirements: 1.5_
  - [ ] 9.2 Add welcome message on first open
    - Display initial greeting from assistant
    - _Requirements: 2.1_

- [ ] 10. Final checkpoint - Ensure all tests pass
  - Run all unit tests and property tests
  - Verify no TypeScript errors
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The implementation uses the existing dark theme (zinc-950 background, white text)
