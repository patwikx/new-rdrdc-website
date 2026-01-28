/**
 * useFullscreen Hook - Manage fullscreen mode for map container
 * 
 * This hook provides functionality to:
 * - Enter and exit fullscreen mode
 * - Track fullscreen state
 * - Handle browser compatibility
 * 
 * Requirements: 5.2
 */

import { useState, useEffect, useCallback, RefObject } from 'react';

/**
 * Fullscreen API types for cross-browser compatibility
 */
interface FullscreenDocument extends Document {
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitFullscreenElement?: Element;
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
  webkitExitFullscreen?: () => Promise<void>;
}

interface FullscreenElement extends HTMLElement {
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
}

/**
 * Hook to manage fullscreen mode for a given element
 * 
 * @param elementRef - Reference to the element to make fullscreen
 * @returns Object with fullscreen state and toggle function
 */
export function useFullscreen(elementRef: RefObject<HTMLElement | null>) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  /**
   * Check if currently in fullscreen mode
   */
  const checkFullscreen = useCallback(() => {
    const doc = document as FullscreenDocument;
    const fullscreenElement =
      doc.fullscreenElement ||
      doc.mozFullScreenElement ||
      doc.webkitFullscreenElement ||
      doc.msFullscreenElement;

    setIsFullscreen(!!fullscreenElement);
  }, []);

  /**
   * Enter fullscreen mode
   */
  const enterFullscreen = useCallback(async () => {
    const element = elementRef.current as FullscreenElement | null;
    if (!element) return;

    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        await element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        await element.msRequestFullscreen();
      }
    } catch (error) {
      console.error('Error entering fullscreen:', error);
    }
  }, [elementRef]);

  /**
   * Exit fullscreen mode
   */
  const exitFullscreen = useCallback(async () => {
    const doc = document as FullscreenDocument;

    try {
      if (doc.exitFullscreen) {
        await doc.exitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        await doc.mozCancelFullScreen();
      } else if (doc.webkitExitFullscreen) {
        await doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) {
        await doc.msExitFullscreen();
      }
    } catch (error) {
      console.error('Error exiting fullscreen:', error);
    }
  }, []);

  /**
   * Toggle fullscreen mode
   */
  const toggleFullscreen = useCallback(async () => {
    if (isFullscreen) {
      await exitFullscreen();
    } else {
      await enterFullscreen();
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  /**
   * Listen for fullscreen change events
   */
  useEffect(() => {
    const events = [
      'fullscreenchange',
      'mozfullscreenchange',
      'webkitfullscreenchange',
      'msfullscreenchange',
    ];

    events.forEach((event) => {
      document.addEventListener(event, checkFullscreen);
    });

    // Initial check
    checkFullscreen();

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, checkFullscreen);
      });
    };
  }, [checkFullscreen]);

  return {
    isFullscreen,
    toggleFullscreen,
    enterFullscreen,
    exitFullscreen,
  };
}
