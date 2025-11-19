import { Component } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export interface Column {
  key: string;
  label: string;
  width?: number;
  isReturn?: boolean;
  sortable?: boolean; // If false, column won't be sortable
  [key: string]: any;
}

export interface ETFTableNativeProps {
  // Data props
  data?: any[];
  columns?: Column[];
  
  // Header props
  headerTitle?: string;
  headerSubtitle?: string | null;
  showHeader?: boolean;
  headerHeight?: number | null;
  headerBackgroundColor?: string;
  headerTitleColor?: string;
  headerSubtitleColor?: string;
  headerTitleSize?: number;
  headerSubtitleSize?: number;
  
  // Table header props
  showTableHeader?: boolean;
  tableHeaderHeight?: number;
  tableHeaderBackgroundColor?: string;
  tableHeaderTextColor?: string;
  tableHeaderTextSize?: number;
  tableHeaderFontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  tableHeaderBorderColor?: string;
  
  // Cell props
  cellHeight?: number;
  cellMinWidth?: number;
  cellPadding?: number;
  cellBackgroundColor?: string;
  cellTextColor?: string;
  cellTextSize?: number;
  cellBorderColor?: string;
  
  // Fixed column props
  fixedColumnBackgroundColor?: string;
  fixedColumnTextColor?: string;
  fixedColumnTextSize?: number;
  fixedColumnFontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  fixedColumnBorderColor?: string;
  
  // Return value colors
  positiveReturnColor?: string;
  negativeReturnColor?: string;
  neutralReturnColor?: string;
  
  // Theme props
  theme?: 'light' | 'dark';
  backgroundColor?: string;
  
  // Footer props
  showFooter?: boolean;
  footerText?: string;
  footerBackgroundColor?: string;
  footerTextColor?: string;
  footerTextSize?: number;
  footerBorderColor?: string;
  
  // Status bar props
  statusBarStyle?: 'default' | 'light-content' | 'dark-content';
  statusBarHeight?: number | null;
  
  // Auto-sizing props
  autoSizeColumns?: boolean;
  minColumnWidth?: number;
  
  // Scroll props
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  scrollEventThrottle?: number;
  bounces?: boolean;
  
  // Custom styles
  containerStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  tableHeaderStyle?: ViewStyle;
  tableBodyStyle?: ViewStyle;
  footerStyle?: ViewStyle;
  cellStyle?: ViewStyle;
  headerCellStyle?: ViewStyle;
  fixedColumnStyle?: ViewStyle;
  
  // Formatting functions
  formatValue?: (value: any) => string;
  formatReturn?: (value: number) => string;
  
  // Custom render functions
  renderCell?: (value: any, column: Column, rowData: any) => React.ReactNode;
  renderHeaderCell?: (column: Column, isSorted: boolean, sortDirection: 'asc' | 'desc' | null) => React.ReactNode;
  renderFixedCell?: (value: any, column: Column, rowData: any) => React.ReactNode;
  
  // Sorting props
  enableSorting?: boolean;
  initialSortColumn?: string | null;
  initialSortDirection?: 'asc' | 'desc';
  onSort?: (columnKey: string, direction: 'asc' | 'desc') => void;
  customSortFunction?: (a: any, b: any, columnKey: string, direction: 'asc' | 'desc', column: Column) => number;
  
  // Sort icon props
  sortAscIcon?: React.ReactNode | ((props: { size: number; color: string }) => React.ReactNode);
  sortDescIcon?: React.ReactNode | ((props: { size: number; color: string }) => React.ReactNode);
  sortUnsortedIcon?: React.ReactNode | ((props: { size: number; color: string }) => React.ReactNode);
  sortIconSize?: number;
  sortIconColor?: string | null;
  sortIconPosition?: 'left' | 'right';
  showSortIcon?: boolean;
}

declare class ETFTableNative extends Component<ETFTableNativeProps> {}

export default ETFTableNative;

