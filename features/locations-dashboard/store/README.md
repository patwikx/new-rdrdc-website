# Zustand Store Documentation

## Overview

This directory contains the Zustand state management implementation for the Locations Dashboard feature. The store is organized into multiple focused stores that handle different aspects of the application state.

## Store Architecture

The state management is split into the following stores:

### 1. Properties Store (`usePropertiesStore`)
Manages property data and filtered results.

**State:**
- `all`: All properties loaded in the application
- `filtered`: Properties after applying filters and search
- `loading`: Loading state for property data
- `error`: Error message if data loading fails

**Actions:**
- `setProperties(properties)`: Set all properties
- `setLoading(loading)`: Set loading state
- `setError(error)`: Set error state
- `updateFiltered()`: Recalculate filtered properties based on current filters and search

### 2. Filters Store (`useFiltersStore`)
Manages property filtering criteria with persistence.

**State:**
- `filters`: Current filter configuration (type, price range, features, location)

**Actions:**
- `setFilters(filters)`: Set all filters at once
- `updateTypeFilter(types)`: Update property type filter
- `updatePriceRange(min, max)`: Update price range filter
- `updateFeatures(features)`: Update features filter
- `updateLocationFilter(center, radius)`: Set location-based filter
- `clearLocationFilter()`: Remove location filter
- `resetFilters()`: Reset all filters to defaults

**Persistence:** Filters are persisted to localStorage automatically.

### 3. Favorites Store (`useFavoritesStore`)
Manages user's favorite properties.

**State:**
- `items`: Array of favorite properties
- `loading`: Loading state

**Actions:**
- `loadFavorites()`: Load favorites from localStorage
- `addFavorite(property)`: Add property to favorites
- `removeFavorite(propertyId)`: Remove property from favorites
- `isFavorite(propertyId)`: Check if property is favorited
- `clearFavorites()`: Remove all favorites

**Persistence:** Favorites are persisted to localStorage.

### 4. UI Store (`useUIStore`)
Manages UI state including sidebar and map configuration.

**State:**
- `sidebar`: Sidebar state (collapsed, activeView)
- `map`: Map state (viewport, style, fullscreen)
- `selectedProperty`: Currently selected property

**Actions:**
- `setSidebarCollapsed(collapsed)`: Set sidebar collapsed state
- `toggleSidebar()`: Toggle sidebar collapsed state
- `setActiveView(view)`: Set active sidebar view
- `setMapViewport(viewport)`: Update map viewport
- `setMapStyle(style)`: Change map style
- `setFullscreen(fullscreen)`: Set fullscreen mode
- `toggleFullscreen()`: Toggle fullscreen mode
- `setSelectedProperty(property)`: Set selected property

**Persistence:** Sidebar state and map style are persisted to localStorage.

### 5. Search Store (`useSearchStore`)
Manages search functionality and history.

**State:**
- `query`: Current search query
- `suggestions`: Autocomplete suggestions
- `loading`: Loading state for suggestions
- `history`: Search history items

**Actions:**
- `setQuery(query)`: Set search query
- `setSuggestions(suggestions)`: Set autocomplete suggestions
- `setLoading(loading)`: Set loading state
- `loadHistory()`: Load search history from localStorage
- `addToHistory(item)`: Add search to history
- `clearHistory()`: Clear search history

**Persistence:** Search history is persisted to localStorage.

### 6. Recent Locations Store (`useRecentsStore`)
Manages recently viewed locations and properties.

**State:**
- `locations`: Array of recent location activities

**Actions:**
- `loadRecents()`: Load recent locations from localStorage
- `addRecent(location)`: Add recent location
- `clearRecents()`: Clear all recent locations

**Persistence:** Recent locations are persisted to localStorage (max 10 items).

## Usage Examples

### Basic Usage

```typescript
import {
  usePropertiesStore,
  useFiltersStore,
  useFavoritesStore,
  useUIStore,
  useSearchStore,
  useRecentsStore,
} from '@/features/locations-dashboard/store';

// In a component
function MyComponent() {
  // Get state and actions
  const properties = usePropertiesStore((state) => state.filtered);
  const setProperties = usePropertiesStore((state) => state.setProperties);
  
  const filters = useFiltersStore((state) => state.filters);
  const updateTypeFilter = useFiltersStore((state) => state.updateTypeFilter);
  
  const favorites = useFavoritesStore((state) => state.items);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  
  // Use in component...
}
```

### Utility Hooks

The store also exports utility hooks for common use cases:

```typescript
import {
  useFilteredPropertyCount,
  useIsFavorite,
  useMapViewport,
  useMapStyle,
  useSidebarState,
} from '@/features/locations-dashboard/store';

function MyComponent({ propertyId }) {
  // Get filtered property count
  const count = useFilteredPropertyCount();
  
  // Check if property is favorite
  const isFav = useIsFavorite(propertyId);
  
  // Get map viewport
  const viewport = useMapViewport();
  
  // Get map style
  const style = useMapStyle();
  
  // Get sidebar state
  const sidebar = useSidebarState();
}
```

### Store Initialization

Initialize all stores when the application starts:

```typescript
import { initializeStores } from '@/features/locations-dashboard/store';

// In your app initialization (e.g., _app.tsx or layout.tsx)
useEffect(() => {
  initializeStores();
}, []);
```

This will:
- Load favorites from localStorage
- Load search history from localStorage
- Load recent locations from localStorage
- Load saved filters from localStorage
- Load saved map style from localStorage

## Store Interactions

The stores are designed to work together:

1. **Filters + Properties**: When filters change, the properties store automatically recalculates filtered properties
2. **Search + Properties**: When search query changes, the properties store automatically recalculates filtered properties
3. **Favorites + Properties**: Favorites are stored separately but can be checked against any property
4. **UI + All Stores**: UI state coordinates with other stores for user interactions

## Data Flow

```
User Action
    ↓
Store Action
    ↓
State Update
    ↓
localStorage Sync (if applicable)
    ↓
Dependent Store Updates (if applicable)
    ↓
Component Re-render
```

## Persistence Strategy

The following data is persisted to localStorage:

- **Favorites**: Full property objects
- **Recent Locations**: Last 10 location activities
- **Search History**: Last 10 search queries
- **Filters**: Current filter configuration
- **Map Style**: Selected map style
- **Sidebar State**: Collapsed state and active view

Data is automatically loaded on initialization and saved on updates.

## Error Handling

All stores include error handling for:
- localStorage quota exceeded
- localStorage unavailable
- Data corruption
- Invalid data formats

Errors are logged to console and the application continues with default values.

## DevTools

The stores are configured with Zustand DevTools for debugging in development:

1. Install Redux DevTools browser extension
2. Open DevTools
3. Navigate to Redux tab
4. View store state and actions

Each store is named for easy identification:
- `properties-store`
- `filters-store`
- `favorites-store`
- `ui-store`
- `search-store`
- `recents-store`

## Testing

Unit tests are provided in `__tests__/store.test.ts` covering:
- State updates
- Action execution
- Store interactions
- Persistence
- Error handling

Run tests with:
```bash
npm test
```

## Requirements Validation

This implementation validates:
- **Requirement 8.1**: Asynchronous data loading with proper state management
- **Requirement 8.4**: Data caching through localStorage persistence

## Performance Considerations

- **Selective Updates**: Use Zustand's selector pattern to prevent unnecessary re-renders
- **Computed Values**: Filtered properties are computed only when dependencies change
- **Persistence**: localStorage operations are batched and optimized
- **DevTools**: Only enabled in development mode

## Future Enhancements

Potential improvements:
- Add middleware for analytics tracking
- Implement undo/redo functionality
- Add optimistic updates for async operations
- Implement data synchronization with backend
- Add store reset functionality for testing
