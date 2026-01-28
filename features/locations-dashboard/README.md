# Locations Dashboard Feature

This feature provides a comprehensive, modern dashboard for exploring real estate properties on an interactive map. It transforms the basic "Our Locations" section into a professional-grade property discovery tool.

## Overview

The Locations Dashboard redesign follows the Square UI maps template aesthetic, providing:

- **Modern Dashboard Layout**: Sidebar-based interface with responsive design
- **Interactive Map**: Leaflet-powered map with multiple styles and advanced controls
- **Property Search**: Autocomplete search with location and property filtering
- **Favorites System**: Save and manage favorite properties with local storage persistence
- **Recent Locations**: Track and revisit recently viewed properties and searches
- **Advanced Filtering**: Filter by property type, price range, and features
- **Property Clustering**: Intelligent marker clustering for high-density areas
- **Enhanced Property Display**: Rich property popups with images and details

## Directory Structure

```
features/locations-dashboard/
├── components/          # React components
│   ├── dashboard/      # Main dashboard container
│   ├── sidebar/        # Sidebar components (search, filters, favorites, recents)
│   ├── map/            # Map components (markers, popups, controls)
│   └── shared/         # Shared/common components
├── stores/             # Zustand state management stores
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
│   ├── storage.ts     # Local storage utilities
│   └── filters.ts     # Property filtering utilities
├── types/              # TypeScript type definitions
│   └── index.ts       # All type definitions
├── constants/          # Constants and configurations
│   └── index.ts       # Default configurations
└── README.md          # This file
```

## Technology Stack

- **React 19**: UI framework
- **TypeScript**: Type safety
- **Next.js 16**: Framework and routing
- **shadcn/ui**: Component library
- **Leaflet**: Interactive maps
- **React Leaflet**: React bindings for Leaflet
- **Zustand**: State management
- **React Query**: Data fetching and caching
- **Tailwind CSS**: Styling

## Core Types

All TypeScript interfaces are defined in `types/index.ts`:

- **Property**: Real estate property data model
- **PropertyFilters**: Filter criteria for properties
- **MapViewport**: Map view state (center, zoom, bounds)
- **SearchHistoryItem**: Search history entry
- **RecentLocation**: Recent location activity
- **ApplicationState**: Complete application state structure

## State Management

The application uses Zustand for state management with the following stores:

- **Properties Store**: Manages property data, loading states, and filtering
- **Favorites Store**: Manages favorite properties with local storage persistence
- **Recents Store**: Manages recent locations and search history
- **UI Store**: Manages UI state (sidebar, map viewport, selected property)
- **Filters Store**: Manages filter state and application

## Utilities

### Storage Utilities (`utils/storage.ts`)

Functions for persisting data to local storage:

- `getFavorites()` / `saveFavorites()`: Manage favorites
- `getRecentLocations()` / `saveRecentLocations()`: Manage recent locations
- `getSearchHistory()` / `saveSearchHistory()`: Manage search history
- `getSavedFilters()` / `saveFilters()`: Manage filter preferences
- `getSavedMapStyle()` / `saveMapStyle()`: Manage map style preference

### Filter Utilities (`utils/filters.ts`)

Functions for filtering and manipulating property data:

- `applyFilters()`: Apply all filters to properties
- `searchProperties()`: Search properties by query
- `filterByType()`: Filter by property type
- `filterByPriceRange()`: Filter by price range
- `filterByFeatures()`: Filter by property features
- `filterByLocation()`: Filter by location radius
- `filterByBounds()`: Filter by map bounds
- `calculateDistance()`: Calculate distance between coordinates
- `formatPrice()`: Format price for display
- `formatDistance()`: Format distance for display

## Constants

Default configurations in `constants/index.ts`:

- `DEFAULT_MAP_CONFIG`: Map configuration for General Santos City
- `MAX_RECENT_LOCATIONS`: Maximum recent locations to store (10)
- `MAX_SEARCH_HISTORY`: Maximum search history items (10)
- `STORAGE_KEYS`: Local storage key names
- `DEFAULT_PRICE_RANGE`: Default price range for filters
- `AVAILABLE_FEATURES`: Available property features for filtering
- `SEARCH_DEBOUNCE_DELAY`: Debounce delay for search input (300ms)

## Usage

### Importing Types

```typescript
import { Property, PropertyFilters, MapViewport } from '@/features/locations-dashboard/types';
```

### Using Storage Utilities

```typescript
import { getFavorites, addFavorite, removeFavorite } from '@/features/locations-dashboard/utils';

// Get all favorites
const favorites = getFavorites();

// Add a property to favorites
addFavorite(property);

// Remove a property from favorites
removeFavorite(propertyId);
```

### Using Filter Utilities

```typescript
import { applyFilters, searchProperties, formatPrice } from '@/features/locations-dashboard/utils';

// Apply filters to properties
const filtered = applyFilters(properties, filters);

// Search properties
const results = searchProperties(properties, 'General Santos');

// Format price
const formattedPrice = formatPrice(5000000); // "₱5,000,000"
```

## Development Guidelines

1. **Type Safety**: Always use TypeScript types from `types/index.ts`
2. **State Management**: Use Zustand stores for global state
3. **Local Storage**: Use storage utilities for persistence
4. **Filtering**: Use filter utilities for consistent filtering logic
5. **Components**: Keep components focused and reusable
6. **Testing**: Write both unit tests and property-based tests

## Requirements Mapping

This feature implements the following requirements:

- **Requirement 1**: Dashboard Layout and Structure
- **Requirement 2**: Location Search Functionality
- **Requirement 3**: Favorites System
- **Requirement 4**: Recent Locations Tracking
- **Requirement 5**: Enhanced Interactive Map Controls
- **Requirement 6**: Property Filtering and Categorization
- **Requirement 7**: Enhanced Property Display
- **Requirement 8**: Data Integration and Performance

See `.kiro/specs/locations-dashboard-redesign/requirements.md` for full details.

## Next Steps

The following tasks will build upon this foundation:

1. Implement core dashboard layout and responsive design
2. Set up state management with Zustand stores
3. Create interactive map component with Leaflet
4. Implement property markers and clustering
5. Add location search functionality
6. Build property filtering system
7. Create favorites management UI
8. Implement recent locations tracking
9. Add data loading and performance optimizations
10. Integration and final wiring

See `.kiro/specs/locations-dashboard-redesign/tasks.md` for the complete implementation plan.
