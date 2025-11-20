import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

const ETFTableNative = ({
  // Data props
  data = [],
  columns = [],
  
  // Header props
  headerTitle = 'ETF Performance',
  headerSubtitle = null,
  showHeader = true,
  headerHeight = null,
  headerBackgroundColor = '#2563eb',
  headerTitleColor = '#ffffff',
  headerSubtitleColor = '#bfdbfe',
  headerTitleSize = 20,
  headerSubtitleSize = 14,
  
  // Table header props
  showTableHeader = true,
  tableHeaderHeight = 50,
  tableHeaderBackgroundColor = '#1f2937',
  tableHeaderTextColor = '#ffffff',
  tableHeaderTextSize = 11,
  tableHeaderFontWeight = '600',
  tableHeaderBorderColor = '#4b5563',
  
  // Cell props
  cellHeight = 50,
  cellMinWidth = 80,
  cellPadding = 12,
  cellBackgroundColor = '#ffffff',
  cellTextColor = '#374151',
  cellTextSize = 14,
  cellBorderColor = '#e5e7eb',
  
  // Fixed column props
  fixedColumnBackgroundColor = '#1f2937',
  fixedColumnTextColor = '#111827',
  fixedColumnTextSize = 14,
  fixedColumnFontWeight = '600',
  fixedColumnBorderColor = '#e5e7eb',
  
  // Return value colors
  positiveReturnColor = '#16a34a',
  negativeReturnColor = '#dc2626',
  neutralReturnColor = '#4b5563',
  
  // Theme props
  theme = 'light', // 'light' or 'dark'
  backgroundColor = '#f9fafb',
  
  // Footer props
  showFooter = true,
  footerText = '↕️ Scroll vertically • ↔️ Scroll horizontally',
  footerBackgroundColor = '#f3f4f6',
  footerTextColor = '#6b7280',
  footerTextSize = 11,
  footerBorderColor = '#e5e7eb',
  
  // Status bar props
  statusBarStyle = 'light-content',
  statusBarHeight = null,
  
  // Auto-sizing props
  autoSizeColumns = true,
  minColumnWidth = 80,
  
  // Scroll props
  showsHorizontalScrollIndicator = false,
  showsVerticalScrollIndicator = true,
  scrollEventThrottle = 16,
  bounces = false,
  
  // Custom styles
  containerStyle = {},
  headerStyle = {},
  tableHeaderStyle = {},
  tableBodyStyle = {},
  footerStyle = {},
  cellStyle = {},
  headerCellStyle = {},
  fixedColumnStyle = {},
  
  // Formatting functions
  formatValue = null,
  formatReturn = null,
  
  // Custom render functions
  renderCell = null,
  renderHeaderCell = null,
  renderFixedCell = null,
  
  // Sorting props
  enableSorting = true,
  initialSortColumn = null,
  initialSortDirection = 'asc', // 'asc' | 'desc'
  onSort = null,
  customSortFunction = null,
  
  // Sort icon props
  sortAscIcon = null, // React component or element
  sortDescIcon = null, // React component or element
  sortUnsortedIcon = null, // React component or element
  sortIconSize = 12,
  sortIconColor = null, // null = uses tableHeaderTextColor
  sortIconPosition = 'right', // 'left' | 'right'
  showSortIcon = true,
}) => {
  const bodyHorizontalScrollRef = useRef(null);
  const headerScrollRef = useRef(null);
  const isScrollingRef = useRef(false);
  const [columnWidths, setColumnWidths] = useState({});
  const cellMeasurements = useRef({});
  const [sortColumn, setSortColumn] = useState(initialSortColumn);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);

  // Theme-based color overrides
  const getThemeColors = () => {
    if (theme === 'dark') {
      return {
        backgroundColor: backgroundColor || '#111827',
        cellBackgroundColor: cellBackgroundColor || '#1f2937',
        cellTextColor: cellTextColor || '#f3f4f6',
        fixedColumnBackgroundColor: fixedColumnBackgroundColor || '#374151',
        fixedColumnTextColor: fixedColumnTextColor || '#ffffff',
        tableHeaderBackgroundColor: tableHeaderBackgroundColor || '#111827',
        tableHeaderTextColor: tableHeaderTextColor || '#ffffff',
        cellBorderColor: cellBorderColor || '#374151',
        fixedColumnBorderColor: fixedColumnBorderColor || '#4b5563',
        footerBackgroundColor: footerBackgroundColor || '#1f2937',
        footerTextColor: footerTextColor || '#9ca3af',
      };
    }
    return {
      backgroundColor: backgroundColor || '#f9fafb',
      cellBackgroundColor: cellBackgroundColor || '#ffffff',
      cellTextColor: cellTextColor || '#374151',
      fixedColumnBackgroundColor: fixedColumnBackgroundColor || '#1f2937',
      fixedColumnTextColor: fixedColumnTextColor || '#111827',
      tableHeaderBackgroundColor: tableHeaderBackgroundColor || '#1f2937',
      tableHeaderTextColor: tableHeaderTextColor || '#ffffff',
      cellBorderColor: cellBorderColor || '#e5e7eb',
      fixedColumnBorderColor: fixedColumnBorderColor || '#e5e7eb',
      footerBackgroundColor: footerBackgroundColor || '#f3f4f6',
      footerTextColor: footerTextColor || '#6b7280',
    };
  };

  const themeColors = getThemeColors();

  const defaultFormatValue = (value, isReturn) => {
    if (value === null || value === undefined) return '-';
    if (isReturn) {
      if (formatReturn) {
        return formatReturn(value);
      }
      const sign = value >= 0 ? '+' : '';
      return `${sign}${value.toFixed(2)}%`;
    }
    if (formatValue) {
      return formatValue(value);
    }
    return value;
  };

  const getReturnColor = (value) => {
    if (value > 0) return positiveReturnColor;
    if (value < 0) return negativeReturnColor;
    return neutralReturnColor;
  };

  const handleCellLayout = (columnKey, width) => {
    if (!autoSizeColumns) return;
    
    if (!cellMeasurements.current[columnKey]) {
      cellMeasurements.current[columnKey] = [];
    }
    cellMeasurements.current[columnKey].push(width);
    
    const maxWidth = Math.max(...cellMeasurements.current[columnKey]);
    
    setColumnWidths(prev => {
      const currentWidth = prev[columnKey];
      const column = columns.find(col => col.key === columnKey);
      const minWidth = column ? (column.width || minColumnWidth) : minColumnWidth;
      
      if (maxWidth > minWidth && (!currentWidth || currentWidth < maxWidth)) {
        return { ...prev, [columnKey]: maxWidth };
      }
      return prev;
    });
  };

  const handleBodyScroll = (event) => {
    if (isScrollingRef.current) return;
    
    const offsetX = event.nativeEvent.contentOffset.x;
    isScrollingRef.current = true;
    
    if (headerScrollRef.current) {
      headerScrollRef.current.scrollTo({ x: offsetX, animated: false });
    }
    
    requestAnimationFrame(() => {
      isScrollingRef.current = false;
    });
  };

  const handleHeaderScroll = (event) => {
    if (isScrollingRef.current) return;
    
    const offsetX = event.nativeEvent.contentOffset.x;
    isScrollingRef.current = true;
    
    if (bodyHorizontalScrollRef.current) {
      bodyHorizontalScrollRef.current.scrollTo({ x: offsetX, animated: false });
    }
    
    requestAnimationFrame(() => {
      isScrollingRef.current = false;
    });
  };

  const getColumnWidth = (column) => {
    if (columnWidths[column.key]) {
      return columnWidths[column.key];
    }
    return column.width || cellMinWidth;
  };

  // Check if column is sortable
  const isColumnSortable = (column) => {
    if (!enableSorting) return false;
    // Column is sortable if sortable is not explicitly set to false
    return column.sortable !== false;
  };

  // Handle sort
  const handleSort = (columnKey) => {
    if (!isColumnSortable(columns.find(col => col.key === columnKey))) {
      return;
    }

    let newDirection = 'asc';
    if (sortColumn === columnKey) {
      // Toggle direction if same column
      newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    }

    setSortColumn(columnKey);
    setSortDirection(newDirection);

    // Call onSort callback if provided
    if (onSort) {
      onSort(columnKey, newDirection);
    }
  };

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn || !enableSorting) {
      return data;
    }

    const column = columns.find(col => col.key === sortColumn);
    if (!column) return data;

    // Use custom sort function if provided
    if (customSortFunction) {
      return [...data].sort((a, b) => {
        return customSortFunction(a, b, sortColumn, sortDirection, column);
      });
    }

    // Default sorting logic
    return [...data].sort((a, b) => {
      let aVal = a[sortColumn];
      let bVal = b[sortColumn];

      // Handle null/undefined
      if (aVal === null || aVal === undefined) aVal = '';
      if (bVal === null || bVal === undefined) bVal = '';

      // Handle numbers
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      // Handle strings
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      
      if (sortDirection === 'asc') {
        return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
      } else {
        return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
      }
    });
  }, [data, sortColumn, sortDirection, enableSorting, customSortFunction, columns]);

  // Get sort icon for column
  const getSortIcon = (columnKey) => {
    if (!showSortIcon || !isColumnSortable(columns.find(col => col.key === columnKey))) {
      return null;
    }

    const isActive = sortColumn === columnKey;
    const iconColor = sortIconColor || themeColors.tableHeaderTextColor;

    if (isActive && sortDirection === 'asc') {
      if (sortAscIcon) {
        return typeof sortAscIcon === 'function' 
          ? sortAscIcon({ size: sortIconSize, color: iconColor })
          : sortAscIcon;
      }
      // Default ascending icon (up arrow)
      return (
        <Text style={{ fontSize: sortIconSize, color: iconColor }}>▲</Text>
      );
    }

    if (isActive && sortDirection === 'desc') {
      if (sortDescIcon) {
        return typeof sortDescIcon === 'function'
          ? sortDescIcon({ size: sortIconSize, color: iconColor })
          : sortDescIcon;
      }
      // Default descending icon (down arrow)
      return (
        <Text style={{ fontSize: sortIconSize, color: iconColor }}>▼</Text>
      );
    }

    // Unsorted icon
    if (sortUnsortedIcon) {
      return typeof sortUnsortedIcon === 'function'
        ? sortUnsortedIcon({ size: sortIconSize, color: iconColor })
        : sortUnsortedIcon;
    }
    // Default unsorted icon (double arrow)
    return (
      <Text style={{ fontSize: sortIconSize, color: iconColor, opacity: 0.5 }}>⇅</Text>
    );
  };

  const renderCellContent = (value, column, rowData) => {
    if (renderCell) {
      return renderCell(value, column, rowData);
    }
    
    return (
      <Text
        style={[
          styles.cellText,
          {
            color: column.isReturn ? getReturnColor(value) : themeColors.cellTextColor,
            fontSize: cellTextSize,
          },
        ]}
        numberOfLines={2}
        adjustsFontSizeToFit={false}
      >
        {defaultFormatValue(value, column.isReturn)}
      </Text>
    );
  };

  const renderHeaderCellContent = (column) => {
    if (renderHeaderCell) {
      return renderHeaderCell(column, sortColumn === column.key, sortDirection);
    }
    
    const isSortable = isColumnSortable(column);
    const sortIcon = getSortIcon(column.key);
    
    const content = (
      <View style={styles.headerCellContent}>
        {sortIconPosition === 'left' && sortIcon && (
          <View style={styles.sortIconContainer}>
            {sortIcon}
          </View>
        )}
        <Text
          style={[
            styles.headerText,
            {
              color: themeColors.tableHeaderTextColor,
              fontSize: tableHeaderTextSize,
              fontWeight: tableHeaderFontWeight,
            },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
        >
          {column.label}
        </Text>
        {sortIconPosition === 'right' && sortIcon && (
          <View style={styles.sortIconContainer}>
            {sortIcon}
          </View>
        )}
      </View>
    );

    if (isSortable) {
      return (
        <TouchableOpacity
          onPress={() => handleSort(column.key)}
          activeOpacity={0.7}
          style={styles.sortableHeader}
        >
          {content}
        </TouchableOpacity>
      );
    }

    return content;
  };

  const renderFixedCellContent = (value, column, rowData) => {
    if (renderFixedCell) {
      return renderFixedCell(value, column, rowData);
    }
    
    return (
      <Text
        style={[
          styles.nameText,
          {
            color: themeColors.fixedColumnTextColor,
            fontSize: fixedColumnTextSize,
            fontWeight: fixedColumnFontWeight,
          },
        ]}
        numberOfLines={2}
      >
        {defaultFormatValue(value, false)}
      </Text>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.backgroundColor,
      ...containerStyle,
    },
    header: {
      backgroundColor: headerBackgroundColor,
      padding: 16,
      paddingTop: statusBarHeight || StatusBar.currentHeight || 40,
      ...headerStyle,
    },
    headerTitle: {
      fontSize: headerTitleSize,
      fontWeight: 'bold',
      color: headerTitleColor,
    },
    headerSubtitle: {
      fontSize: headerSubtitleSize,
      color: headerSubtitleColor,
      marginTop: 4,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: themeColors.tableHeaderBackgroundColor,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      zIndex: 10,
      ...tableHeaderStyle,
    },
    headerRow: {
      flexDirection: 'row',
    },
    headerCell: {
      backgroundColor: themeColors.tableHeaderBackgroundColor,
      padding: cellPadding,
      borderRightWidth: 1,
      borderRightColor: tableHeaderBorderColor,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: cellMinWidth,
      height: tableHeaderHeight,
      flexShrink: 0,
      ...headerCellStyle,
    },
    headerText: {
      color: themeColors.tableHeaderTextColor,
      fontSize: tableHeaderTextSize,
      fontWeight: tableHeaderFontWeight,
    },
    fixedColumn: {
      minWidth: cellMinWidth,
      height: cellHeight,
      backgroundColor: themeColors.fixedColumnBackgroundColor,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.fixedColumnBorderColor,
      flexShrink: 0,
      ...fixedColumnStyle,
    },
    tableBody: {
      flex: 1,
      ...tableBodyStyle,
    },
    tableBodyContainer: {
      flexDirection: 'row',
    },
    fixedColumnsContainer: {
      borderRightWidth: 1,
      borderRightColor: themeColors.cellBorderColor,
    },
    scrollableColumnsContainer: {
      flex: 1,
    },
    scrollableContent: {
      flexDirection: 'column',
    },
    dataRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: themeColors.cellBorderColor,
      height: cellHeight,
    },
    cell: {
      padding: cellPadding,
      borderRightWidth: 1,
      borderRightColor: themeColors.cellBorderColor,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: cellMinWidth,
      height: cellHeight,
      flexShrink: 0,
      backgroundColor: themeColors.cellBackgroundColor,
      ...cellStyle,
    },
    nameCell: {
      backgroundColor: themeColors.cellBackgroundColor,
    },
    nameText: {
      fontSize: fixedColumnTextSize,
      fontWeight: fixedColumnFontWeight,
      color: themeColors.fixedColumnTextColor,
    },
    cellText: {
      fontSize: cellTextSize,
      color: themeColors.cellTextColor,
    },
    footer: {
      backgroundColor: themeColors.footerBackgroundColor,
      padding: 12,
      borderTopWidth: 1,
      borderTopColor: footerBorderColor,
      ...footerStyle,
    },
    footerText: {
      fontSize: footerTextSize,
      color: themeColors.footerTextColor,
      textAlign: 'center',
    },
    headerCellContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    sortIconContainer: {
      marginLeft: 4,
      marginRight: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sortableHeader: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const displaySubtitle = headerSubtitle !== null 
    ? headerSubtitle 
    : `${data.length} ${data.length === 1 ? 'ETF' : 'ETFs'}`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle={statusBarStyle} />
      
      {showHeader && (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
          {displaySubtitle && <Text style={styles.headerSubtitle}>{displaySubtitle}</Text>}
        </View>
      )}
      
      {showTableHeader && columns.length > 0 && (
        <View style={styles.tableHeader}>
          <View 
            style={[
              styles.fixedColumn,
              styles.headerCell,
              {
                width: getColumnWidth(columns[0]),
              },
            ]}
            onLayout={(event) => {
              if (autoSizeColumns) {
                const { width } = event.nativeEvent.layout;
                const minWidth = columns[0].width || minColumnWidth;
                if (width > minWidth) {
                  handleCellLayout(columns[0].key, width);
                }
              }
            }}
          >
            {renderHeaderCellContent(columns[0])}
          </View>
          <ScrollView
            ref={headerScrollRef}
            horizontal
            showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
            scrollEventThrottle={scrollEventThrottle}
            onScroll={handleHeaderScroll}
            bounces={bounces}
          >
            <View style={styles.headerRow}>
              {columns.slice(1).map((col) => (
                <View
                  key={col.key}
                  style={[
                    styles.headerCell,
                    { 
                      minWidth: col.width || cellMinWidth,
                      width: getColumnWidth(col),
                    },
                  ]}
                  onLayout={(event) => {
                    if (autoSizeColumns) {
                      const { width } = event.nativeEvent.layout;
                      const minWidth = col.width || minColumnWidth;
                      if (width > minWidth) {
                        handleCellLayout(col.key, width);
                      }
                    }
                  }}
                >
                  {renderHeaderCellContent(col)}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      <ScrollView 
        style={styles.tableBody}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      >
        <View style={styles.tableBodyContainer}>
          {columns.length > 0 && (
            <>
              <View style={styles.fixedColumnsContainer}>
                {sortedData.map((row, rowIdx) => (
                  <View
                    key={rowIdx}
                    style={[
                      styles.fixedColumn,
                      styles.cell,
                      styles.nameCell,
                      {
                        width: getColumnWidth(columns[0]),
                      },
                    ]}
                    onLayout={(event) => {
                      if (autoSizeColumns) {
                        const { width } = event.nativeEvent.layout;
                        const minWidth = columns[0].width || minColumnWidth;
                        if (width > minWidth) {
                          handleCellLayout(columns[0].key, width);
                        }
                      }
                    }}
                  >
                    {renderFixedCellContent(row[columns[0].key], columns[0], row)}
                  </View>
                ))}
              </View>
              
              <ScrollView 
                ref={bodyHorizontalScrollRef}
                horizontal 
                showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
                scrollEventThrottle={scrollEventThrottle}
                onScroll={handleBodyScroll}
                bounces={bounces}
                style={styles.scrollableColumnsContainer}
              >
                <View style={styles.scrollableContent}>
                  {sortedData.map((row, rowIdx) => (
                    <View key={rowIdx} style={styles.dataRow}>
                      {columns.slice(1).map((col) => {
                        const value = row[col.key];
                        return (
                          <View
                            key={col.key}
                            style={[
                              styles.cell,
                              { 
                                minWidth: col.width || cellMinWidth,
                                width: getColumnWidth(col),
                              },
                            ]}
                            onLayout={(event) => {
                              if (autoSizeColumns) {
                                const { width } = event.nativeEvent.layout;
                                const minWidth = col.width || minColumnWidth;
                                if (width > minWidth) {
                                  handleCellLayout(col.key, width);
                                }
                              }
                            }}
                          >
                            {renderCellContent(value, col, row)}
                          </View>
                        );
                      })}
                    </View>
                  ))}
                </View>
              </ScrollView>
            </>
          )}
        </View>
      </ScrollView>

      {showFooter && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>{footerText}</Text>
        </View>
      )}
    </View>
  );
};

export default ETFTableNative;

