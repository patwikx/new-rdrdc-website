# Dashboard Component

The Dashboard component is the main container for the locations dashboard feature. It provides a responsive layout with a sidebar and map section.

## Features

- **Responsive Layout**: Automatically adapts between desktop (two-column) and mobile (single-column) layouts
- **Sidebar Integration**: Uses shadcn/ui Sidebar component with collapse/expand functionality
- **State Management**: Manages sidebar state, active view, selected property, and map viewport
- **Modern Styling**: Built with shadcn/ui components for consistent, modern aesthetics

## Requirements Satisfied

- **Requirement 1.1**: Dashboard displays sidebar panel on left and interactive map on right
- **Requirement 1.2**: Desktop layout maintains two-column layout with sidebar minimum 320px width
- **Requirement 1.3**: Mobile layout collapses to single-column responsive layout
- **Requirement 1.4**: Uses shadcn/ui components for consistent modern styling

## Usage

```tsx
import { Dashboard } from '@/features/locations-dashboard';
import { DEFAULT_MAP_CONFIG } from '@/features/locations-dashboard/constants';

function MyPage() {
  const properties = [
    {
      id: "1",
      title: "Sample Property",
      address: "123 Main St",
      coordinates: { lat: 6.1164, lng: 125.1716 },
      price: 5000000,
      type: "residential",
      features: [],
      images: [],
      description: "A sample property",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <Dashboard
      initialProperties={properties}
      mapConfig={DEFAULT_MAP_CONFIG}
    />
  );
}
```

## Props

### `DashboardProps`

| Prop | Type | Description |
|------|------|-------------|
| `initialProperties` | `Property[]` | Array of property objects to display on the map |
| `mapConfig` | `MapConfiguration` | Configuration object for map settings (center, zoom, tile layers, etc.) |

## Component Structure

```
Dashboard
├── SidebarProvider (shadcn/ui)
│   ├── Sidebar
│   │   ├── SidebarHeader
│   │   │   ├── Title
│   │   │   └── SidebarTrigger
│   │   └── SidebarContent
│   │       └── [Placeholder for future sidebar components]
│   └── SidebarInset
│       └── Map Section
│           ├── Header (with mobile trigger)
│           └── Main Content Area
│               └── [Placeholder for future map component]
```

## State Management

The Dashboard component manages the following state:

- `sidebarCollapsed`: Boolean indicating if sidebar is collapsed
- `activeView`: Current active view in sidebar ('search' | 'favorites' | 'recents' | 'filters')
- `selectedProperty`: Currently selected property (or null)
- `mapViewport`: Current map viewport (center, zoom, bounds)

## Responsive Behavior

### Desktop (≥768px)
- Two-column layout with sidebar on left and map on right
- Sidebar has minimum width of 320px
- Sidebar can be collapsed to icon-only mode
- Sidebar trigger in header

### Mobile (<768px)
- Single-column layout
- Sidebar becomes a slide-out sheet overlay
- Sidebar trigger visible in map header
- Full-width map when sidebar is closed

## Keyboard Shortcuts

- `Cmd/Ctrl + B`: Toggle sidebar (provided by shadcn/ui Sidebar component)

## Future Enhancements

The following features will be added in subsequent tasks:

- Sidebar content components (search, filters, favorites, recents)
- Interactive map with Leaflet integration
- Property markers and clustering
- Property selection and popup display
- Map controls (zoom, fullscreen, layers, location)

## Examples

See `features/locations-dashboard/examples/dashboard-example.tsx` for complete usage examples including:

- Basic usage with sample properties
- Empty state handling
- Custom map configuration

## Dependencies

- React 19+
- shadcn/ui components (Sidebar, SidebarProvider, etc.)
- Tailwind CSS for styling
- TypeScript for type safety
