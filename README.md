# react-native-etf-table

A highly customizable, performant ETF table component for React Native with horizontal and vertical scrolling support.

## Features

- ✅ Horizontal and vertical scrolling
- ✅ Fixed first column with scrollable data columns
- ✅ Fully customizable styling (colors, sizes, themes)
- ✅ Auto-sizing columns based on content
- ✅ Light and dark theme support
- ✅ Custom cell rendering
- ✅ Column sorting with customizable icons
- ✅ TypeScript support
- ✅ Zero dependencies (only React Native peer dependencies)

## Installation

```bash
npm install react-native-etf-table
```

or

```bash
yarn add react-native-etf-table
```

## Basic Usage

```jsx
import React from 'react';
import ETFTableNative from 'react-native-etf-table';

const App = () => {
  const data = [
    { name: 'SPY', '1d': 0.45, '1w': 1.23, '1m': 3.45, volume: '85M' },
    { name: 'QQQ', '1d': 0.82, '1w': 2.15, '1m': 5.67, volume: '52M' },
  ];

  const columns = [
    { key: 'name', label: 'ETF', width: 80 },
    { key: '1d', label: '1D %', width: 80, isReturn: true },
    { key: '1w', label: '1W %', width: 80, isReturn: true },
    { key: '1m', label: '1M %', width: 80, isReturn: true },
    { key: 'volume', label: 'Volume', width: 80 },
  ];

  return (
    <ETFTableNative
      data={data}
      columns={columns}
    />
  );
};

export default App;
```

## Props

### Data Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `array` | `[]` | Array of row data objects |
| `columns` | `array` | `[]` | Array of column configuration objects |

### Column Configuration

Each column object should have:
- `key` (string, required): The key to access data from row objects
- `label` (string, required): The header label for the column
- `width` (number, optional): Minimum width for the column
- `isReturn` (boolean, optional): If true, values will be formatted as percentages with color coding
- `sortable` (boolean, optional): If false, column won't be sortable (default: true)

### Header Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headerTitle` | `string` | `'ETF Performance'` | Main header title |
| `headerSubtitle` | `string \| null` | `null` | Header subtitle (null = auto-generated from data length) |
| `showHeader` | `boolean` | `true` | Show/hide the header section |
| `headerHeight` | `number \| null` | `null` | Custom header height (null = auto) |
| `headerBackgroundColor` | `string` | `'#2563eb'` | Header background color |
| `headerTitleColor` | `string` | `'#ffffff'` | Header title text color |
| `headerSubtitleColor` | `string` | `'#bfdbfe'` | Header subtitle text color |
| `headerTitleSize` | `number` | `20` | Header title font size |
| `headerSubtitleSize` | `number` | `14` | Header subtitle font size |

### Table Header Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showTableHeader` | `boolean` | `true` | Show/hide the table header row |
| `tableHeaderHeight` | `number` | `50` | Height of table header cells |
| `tableHeaderBackgroundColor` | `string` | `'#1f2937'` | Table header background color |
| `tableHeaderTextColor` | `string` | `'#ffffff'` | Table header text color |
| `tableHeaderTextSize` | `number` | `11` | Table header font size |
| `tableHeaderFontWeight` | `string` | `'600'` | Table header font weight |
| `tableHeaderBorderColor` | `string` | `'#4b5563'` | Table header border color |

### Cell Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cellHeight` | `number` | `50` | Height of data cells |
| `cellMinWidth` | `number` | `80` | Minimum width for cells |
| `cellPadding` | `number` | `12` | Padding inside cells |
| `cellBackgroundColor` | `string` | `'#ffffff'` | Cell background color |
| `cellTextColor` | `string` | `'#374151'` | Cell text color |
| `cellTextSize` | `number` | `14` | Cell text font size |
| `cellBorderColor` | `string` | `'#e5e7eb'` | Cell border color |

### Fixed Column Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fixedColumnBackgroundColor` | `string` | `'#1f2937'` | Fixed column background color |
| `fixedColumnTextColor` | `string` | `'#111827'` | Fixed column text color |
| `fixedColumnTextSize` | `number` | `14` | Fixed column font size |
| `fixedColumnFontWeight` | `string` | `'600'` | Fixed column font weight |
| `fixedColumnBorderColor` | `string` | `'#e5e7eb'` | Fixed column border color |

### Return Value Colors

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `positiveReturnColor` | `string` | `'#16a34a'` | Color for positive return values |
| `negativeReturnColor` | `string` | `'#dc2626'` | Color for negative return values |
| `neutralReturnColor` | `string` | `'#4b5563'` | Color for zero/neutral return values |

### Theme Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'light' \| 'dark'` | `'light'` | Theme preset (overrides individual colors) |
| `backgroundColor` | `string` | `'#f9fafb'` | Main container background color |

### Footer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showFooter` | `boolean` | `true` | Show/hide the footer |
| `footerText` | `string` | `'↕️ Scroll vertically • ↔️ Scroll horizontally'` | Footer text |
| `footerBackgroundColor` | `string` | `'#f3f4f6'` | Footer background color |
| `footerTextColor` | `string` | `'#6b7280'` | Footer text color |
| `footerTextSize` | `number` | `11` | Footer font size |
| `footerBorderColor` | `string` | `'#e5e7eb'` | Footer border color |

### Status Bar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `statusBarStyle` | `'default' \| 'light-content' \| 'dark-content'` | `'light-content'` | Status bar style |
| `statusBarHeight` | `number \| null` | `null` | Custom status bar height (null = auto) |

### Auto-sizing Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoSizeColumns` | `boolean` | `true` | Enable automatic column width adjustment |
| `minColumnWidth` | `number` | `80` | Minimum column width when auto-sizing |

### Scroll Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showsHorizontalScrollIndicator` | `boolean` | `false` | Show horizontal scroll indicator |
| `showsVerticalScrollIndicator` | `boolean` | `true` | Show vertical scroll indicator |
| `scrollEventThrottle` | `number` | `16` | Scroll event throttle (ms) |
| `bounces` | `boolean` | `false` | Enable scroll bouncing |

### Custom Styles

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `containerStyle` | `ViewStyle` | `{}` | Custom container styles |
| `headerStyle` | `ViewStyle` | `{}` | Custom header styles |
| `tableHeaderStyle` | `ViewStyle` | `{}` | Custom table header styles |
| `tableBodyStyle` | `ViewStyle` | `{}` | Custom table body styles |
| `footerStyle` | `ViewStyle` | `{}` | Custom footer styles |
| `cellStyle` | `ViewStyle` | `{}` | Custom cell styles |
| `headerCellStyle` | `ViewStyle` | `{}` | Custom header cell styles |
| `fixedColumnStyle` | `ViewStyle` | `{}` | Custom fixed column styles |

### Formatting Functions

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `formatValue` | `(value: any) => string` | `null` | Custom formatter for non-return values |
| `formatReturn` | `(value: number) => string` | `null` | Custom formatter for return values |

### Custom Render Functions

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `renderCell` | `(value, column, rowData) => ReactNode` | `null` | Custom cell renderer |
| `renderHeaderCell` | `(column, isSorted, sortDirection) => ReactNode` | `null` | Custom header cell renderer (receives sort state) |
| `renderFixedCell` | `(value, column, rowData) => ReactNode` | `null` | Custom fixed column cell renderer |

### Sorting Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableSorting` | `boolean` | `true` | Enable/disable sorting functionality |
| `initialSortColumn` | `string \| null` | `null` | Column key to sort by initially |
| `initialSortDirection` | `'asc' \| 'desc'` | `'asc'` | Initial sort direction |
| `onSort` | `(columnKey, direction) => void` | `null` | Callback fired when column is sorted |
| `customSortFunction` | `(a, b, columnKey, direction, column) => number` | `null` | Custom sort function (returns -1, 0, or 1) |

### Sort Icon Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sortAscIcon` | `ReactNode \| (props) => ReactNode` | `null` | Custom ascending sort icon (default: ▲) |
| `sortDescIcon` | `ReactNode \| (props) => ReactNode` | `null` | Custom descending sort icon (default: ▼) |
| `sortUnsortedIcon` | `ReactNode \| (props) => ReactNode` | `null` | Custom unsorted icon (default: ⇅) |
| `sortIconSize` | `number` | `12` | Size of sort icons |
| `sortIconColor` | `string \| null` | `null` | Color of sort icons (null = uses tableHeaderTextColor) |
| `sortIconPosition` | `'left' \| 'right'` | `'right'` | Position of sort icon relative to label |
| `showSortIcon` | `boolean` | `true` | Show/hide sort icons |

## Examples

### Dark Theme

```jsx
<ETFTableNative
  data={data}
  columns={columns}
  theme="dark"
/>
```

### Custom Colors

```jsx
<ETFTableNative
  data={data}
  columns={columns}
  headerBackgroundColor="#8b5cf6"
  cellBackgroundColor="#faf5ff"
  positiveReturnColor="#10b981"
  negativeReturnColor="#ef4444"
/>
```

### Custom Cell Sizes

```jsx
<ETFTableNative
  data={data}
  columns={columns}
  cellHeight={60}
  cellMinWidth={100}
  cellPadding={16}
  tableHeaderHeight={60}
/>
```

### Custom Cell Rendering

```jsx
<ETFTableNative
  data={data}
  columns={columns}
  renderCell={(value, column, rowData) => {
    if (column.key === 'volume') {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="chart" size={16} />
          <Text>{value}</Text>
        </View>
      );
    }
    return <Text>{value}</Text>;
  }}
/>
```

### Custom Formatting

```jsx
<ETFTableNative
  data={data}
  columns={columns}
  formatReturn={(value) => {
    return `${value >= 0 ? '↑' : '↓'} ${Math.abs(value).toFixed(2)}%`;
  }}
  formatValue={(value) => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  }}
/>
```

### Disable Auto-sizing

```jsx
<ETFTableNative
  data={data}
  columns={columns}
  autoSizeColumns={false}
/>
```

### Sorting

#### Basic Sorting (Enabled by Default)

```jsx
<ETFTableNative
  data={data}
  columns={columns}
  // Sorting is enabled by default
/>
```

#### Initial Sort

```jsx
<ETFTableNative
  data={data}
  columns={columns}
  initialSortColumn="1d"
  initialSortDirection="desc"
/>
```

#### Disable Sorting for Specific Columns

```jsx
const columns = [
  { key: 'name', label: 'ETF', width: 80, sortable: false }, // Not sortable
  { key: '1d', label: '1D %', width: 80, isReturn: true }, // Sortable (default)
  { key: 'volume', label: 'Volume', width: 80, sortable: false }, // Not sortable
];
```

#### Custom Sort Callback

```jsx
<ETFTableNative
  data={data}
  columns={columns}
  onSort={(columnKey, direction) => {
    console.log(`Sorted by ${columnKey} in ${direction} order`);
    // You can handle external sorting here
  }}
/>
```

#### Custom Sort Function

```jsx
<ETFTableNative
  data={data}
  columns={columns}
  customSortFunction={(a, b, columnKey, direction, column) => {
    // Custom sorting logic
    if (columnKey === 'volume') {
      // Parse volume strings like "85M" to numbers
      const parseVolume = (val) => {
        if (typeof val === 'string') {
          const num = parseFloat(val);
          if (val.includes('M')) return num * 1000000;
          if (val.includes('K')) return num * 1000;
          return num;
        }
        return val;
      };
      const aVal = parseVolume(a[columnKey]);
      const bVal = parseVolume(b[columnKey]);
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    // Default sorting for other columns
    return 0;
  }}
/>
```

#### Custom Sort Icons

```jsx
import { Icon } from 'react-native-vector-icons/Ionicons';

<ETFTableNative
  data={data}
  columns={columns}
  sortAscIcon={<Icon name="arrow-up" size={12} color="#fff" />}
  sortDescIcon={<Icon name="arrow-down" size={12} color="#fff" />}
  sortUnsortedIcon={<Icon name="swap-vertical" size={12} color="#fff" />}
/>
```

#### Custom Sort Icons with Function

```jsx
<ETFTableNative
  data={data}
  columns={columns}
  sortAscIcon={({ size, color }) => (
    <Icon name="arrow-up" size={size} color={color} />
  )}
  sortDescIcon={({ size, color }) => (
    <Icon name="arrow-down" size={size} color={color} />
  )}
  sortUnsortedIcon={({ size, color }) => (
    <Icon name="swap-vertical" size={size} color={color} />
  )}
/>
```

#### Customize Sort Icon Position and Style

```jsx
<ETFTableNative
  data={data}
  columns={columns}
  sortIconPosition="left" // Icons appear on the left side
  sortIconSize={14}
  sortIconColor="#10b981" // Custom icon color
  showSortIcon={true}
/>
```

#### Disable Sorting

```jsx
<ETFTableNative
  data={data}
  columns={columns}
  enableSorting={false}
/>
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

