# MapControls Component

## Overview

The `MapControls` component provides enhanced map control buttons for the interactive map, including zoom controls, fullscreen toggle, map style switching, and user location centering.

**Requirements:** 5.1, 5.2, 5.5

## Features

### 1. Zoom Controls
- **Zoom In**: Increases map zoom level by 1
- **Zoom Out**: Decreases map zoom level by 1
- **Reset View**: Returns map to default center and zoom level

### 2. Fullscreen Toggle
- **Enter Fullscreen**: Expands map to fill entire viewport
- **Exit Fullscreen**: Returns map to normal size
- **Cross-browser Support**: Works with standard and vendor-prefixed APIs
- **Keyboard Support**: ESC key exits fullscreen

### 3. Map Style Switcher
- **Street Map**: Standard OpenStreetMap tiles
- **Satellite**: Esri satellite imagery
- **Hybrid**: Street map with satellite overlay
- **Dropdown Menu**: Easy style selection with current style highlighted

### 4. User Location Centering
- **Geolocation API**: Uses browser's geolocation to get user position
- **Permission Handling**: Requests and handles location permissions
- **Error States**: Displays appropriate errors for denied/unavailable location
- **Loading Indicator**: Shows loading state while getting location

## Usage

### Basic Usage

```tsx
import { MapControls } from '@/features/locations-dashboard/components/MapControls';

function MyMap() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapStyle, setMapStyle] = useState<MapStyle>('street');

  return (
    <MapControls
      onZoomIn={() => map.zoomIn()}
      onZoomOut={() => map.zoomOut()}
      onResetView={() => map.setView(defaultCenter, defaultZoom)}
      onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
      onToggleStyle={() => cycleMapStyle()}
      onLocateUser={() => centerOnUserLocation()}
      fullscreenActive={isFullscreen}
      currentStyle={mapStyle}
    />
  );
}
```

### Integrated with Map Component

The `MapControls` component is automatically included in the `Map` component:

```tsx
import { Map } from '@/features/locations-dashboard/components/Map';

function Dashboard() {
  const [viewport, setViewport] = useState(defaultViewport);
  const [mapStyle, setMapStyle] = useState<MapStyle>('street');

  return (
    <Map
      properties={properties}
      viewport={viewport}
      onViewportChange={setViewport}
      selectedProperty={selectedProperty}
      onPropertySelect={handlePropertySelect}
      mapStyle={mapStyle}
      onStyleChange={setMapStyle}
    />
  );
}
```

## Props

```typescript
interface MapControlsProps {
  onZoomIn: () => void;           // Handler for zoom in button
  onZoomOut: () => void;          // Handler for zoom out button
  onResetView: () => void;        // Handler for reset view button
  onToggleFullscreen: () => void; // Handler for fullscreen toggle
  onToggleStyle: () => void;      // Handler for style change
  onLocateUser: () => void;       // Handler for user location button
  fullscreenActive: boolean;      // Current fullscreen state
  currentStyle: MapStyle;         // Current map style
}
```

## Hooks

### useFullscreen

Manages fullscreen mode for a given element:

```typescript
import { useFullscreen } from '@/features/locations-dashboard/hooks/useFullscreen';

function MyComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);

  return (
    <div ref={containerRef}>
      <button onClick={toggleFullscreen}>
        {isFullscreen ? 'Exit' : 'Enter'} Fullscreen
      </button>
    </div>
  );
}
```

**Features:**
- Cross-browser compatibility (standard, webkit, moz, ms)
- Automatic state tracking via fullscreen change events
- Enter/exit/toggle methods
- Cleanup on unmount

### useGeolocation

Manages user location with the Geolocation API:

```typescript
import { useGeolocation } from '@/features/locations-dashboard/hooks/useGeolocation';

function MyComponent() {
  const { location, loading, error, getCurrentLocation } = useGeolocation();

  const handleGetLocation = async () => {
    try {
      const position = await getCurrentLocation();
      console.log('User location:', position);
    } catch (err) {
      console.error('Failed to get location:', err);
    }
  };

  return (
    <div>
      <button onClick={handleGetLocation} disabled={loading}>
        {loading ? 'Getting location...' : 'Get My Location'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {location && <p>Lat: {location.lat}, Lng: {location.lng}</p>}
    </div>
  );
}
```

**Features:**
- Promise-based API
- Loading and error states
- Detailed error messages for different error types
- Configurable options (accuracy, timeout, etc.)
- State management (location, loading, error)
- Clear error and reset methods

## Styling

The controls use shadcn/ui components and Tailwind CSS:

- **Position**: Absolute, top-right corner (`top-4 right-4`)
- **Z-index**: 1000 (above map but below modals)
- **Layout**: Vertical stack with 2px gap
- **Buttons**: 40x40px with ghost variant
- **Background**: White with border and shadow
- **Hover**: Accent background on hover

## Accessibility

- **Keyboard Navigation**: All buttons are keyboard accessible
- **ARIA Labels**: Title attributes provide context
- **Focus Indicators**: Visible focus states
- **Screen Readers**: Semantic button elements
- **Disabled States**: Proper disabled attribute when loading

## Browser Compatibility

### Fullscreen API
- Chrome/Edge: ✅ Standard API
- Firefox: ✅ Moz-prefixed API
- Safari: ✅ Webkit-prefixed API
- IE11: ✅ MS-prefixed API

### Geolocation API
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (requires HTTPS)
- Mobile: ✅ Full support on iOS and Android

## Error Handling

### Geolocation Errors

1. **Permission Denied**: User denied location access
   - Message: "Location access denied. Please enable location permissions."
   - Action: Show error, don't retry automatically

2. **Position Unavailable**: Location information unavailable
   - Message: "Location information unavailable."
   - Action: Show error, allow retry

3. **Timeout**: Request took too long
   - Message: "Location request timed out."
   - Action: Show error, allow retry

4. **Not Supported**: Browser doesn't support geolocation
   - Message: "Geolocation is not supported by your browser"
   - Action: Hide location button or show disabled state

### Fullscreen Errors

- Gracefully handles browsers without fullscreen support
- Hides fullscreen button when API is not available
- Logs errors to console without breaking UI

## Performance

- **Lazy Loading**: Controls only render when map is visible
- **Event Debouncing**: Geolocation requests are not debounced (single request)
- **Minimal Re-renders**: Uses React.memo for optimization (if needed)
- **Small Bundle**: ~5KB gzipped including hooks

## Testing

### Unit Tests

Tests are located in `__tests__/MapControls.test.tsx`:

- ✅ Rendering of all control buttons
- ✅ Click handlers for each control
- ✅ Fullscreen toggle behavior
- ✅ Map style switching with dropdown
- ✅ User location functionality
- ✅ Loading states and error handling
- ✅ Disabled states
- ✅ Cross-browser compatibility

### Hook Tests

Tests for `useFullscreen` in `__tests__/useFullscreen.test.ts`:
- ✅ State tracking
- ✅ Enter/exit/toggle methods
- ✅ Cross-browser API support
- ✅ Event listener management
- ✅ Cleanup on unmount

Tests for `useGeolocation` in `__tests__/useGeolocation.test.ts`:
- ✅ Getting current location
- ✅ Loading states
- ✅ Error handling for all error types
- ✅ Permission scenarios
- ✅ State management
- ✅ Multiple concurrent requests

## Examples

See `examples/map-controls-example.tsx` for a complete working example.

## Related Components

- **Map**: Main map component that includes MapControls
- **Dashboard**: Parent component that manages map state

## Future Enhancements

Potential improvements for future iterations:

1. **Compass Control**: Show map orientation and allow rotation
2. **Scale Control**: Display map scale bar
3. **Measure Tool**: Measure distances on the map
4. **Print Control**: Print current map view
5. **Share Control**: Share current map view via URL
6. **Custom Zoom Levels**: Quick zoom to predefined levels
7. **Keyboard Shortcuts**: Hotkeys for common actions
8. **Touch Gestures**: Enhanced mobile controls
