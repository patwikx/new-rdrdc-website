/**
 * Locations Dashboard Feature
 * Main entry point for the locations dashboard feature
 */

// Export all types
export * from './types';

// Export all utilities
export * from './utils';

// Export constants
export * from './constants';

// Export components (only MapLibre and MapControls are used)
export { Map, MapControls } from './components';

// Export loading state components
export {
  Skeleton,
  LoadingSpinner,
  LoadingOverlay,
  PropertyCardSkeleton,
  PropertyListSkeleton,
  MapLoadingSkeleton,
  SearchSuggestionsSkeleton,
  InlineLoader,
  ErrorDisplay,
  EmptyState,
} from './components/LoadingStates';

// Export providers
export { QueryProvider } from './providers/QueryProvider';

// Export hooks
export { useProperties, usePropertiesInBounds, useProperty } from './hooks/useProperties';
export { useFullscreen } from './hooks/useFullscreen';
export { useGeolocation } from './hooks/useGeolocation';

// Export store
export * from './store';
