// Utility to convert Figma-like positioning to CSS Grid layout

/**
 * Converts Figma frame data to CSS Grid configuration
 * @param {Array} figmaFrames - Array of Figma frame objects with x, y, width, height
 * @param {Object} containerSize - Container dimensions {width, height}
 * @returns {Object} CSS Grid configuration
 */
export const convertFigmaToGrid = (figmaFrames, containerSize) => {
  // Sort frames by position (top to bottom, left to right)
  const sortedFrames = figmaFrames.sort((a, b) => {
    if (Math.abs(a.y - b.y) < 20) { // Same row (within 20px)
      return a.x - b.x; // Sort by x position
    }
    return a.y - b.y; // Sort by y position
  });

  // Group frames into rows
  const rows = [];
  let currentRow = [];
  let currentRowY = null;

  sortedFrames.forEach(frame => {
    if (currentRowY === null || Math.abs(frame.y - currentRowY) < 20) {
      // Same row
      currentRow.push(frame);
      currentRowY = frame.y;
    } else {
      // New row
      rows.push(currentRow);
      currentRow = [frame];
      currentRowY = frame.y;
    }
  });

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  // Calculate grid configuration
  const maxColumns = Math.max(...rows.map(row => row.length));
  
  return {
    gridTemplateColumns: `repeat(${maxColumns}, 1fr)`,
    gridTemplateRows: `repeat(${rows.length}, auto)`,
    gap: '16px',
    rows: rows.map((row, rowIndex) => ({
      rowIndex,
      columns: row.map((frame, colIndex) => ({
        ...frame,
        gridColumn: colIndex + 1,
        gridRow: rowIndex + 1,
        gridColumnSpan: calculateSpan(frame.width, containerSize.width, maxColumns),
      }))
    }))
  };
};

/**
 * Calculate how many grid columns a frame should span
 */
const calculateSpan = (frameWidth, containerWidth, totalColumns) => {
  const percentage = frameWidth / containerWidth;
  const span = Math.round(percentage * totalColumns);
  return Math.max(1, Math.min(span, totalColumns));
};

/**
 * Example usage with Figma JSON data
 */
export const exampleFigmaData = {
  "frames": [
    {
      "id": "168:590",
      "name": "Attend profile",
      "x": 20,
      "y": 100,
      "width": 581,
      "height": 127,
      "type": "attendance"
    },
    {
      "id": "168:591", 
      "name": "Top Performer",
      "x": 620,
      "y": 100,
      "width": 300,
      "height": 127,
      "type": "performer"
    },
    {
      "id": "168:592",
      "name": "Leave Summary", 
      "x": 20,
      "y": 250,
      "width": 400,
      "height": 200,
      "type": "leave"
    },
    {
      "id": "168:593",
      "name": "Appraisal",
      "x": 440,
      "y": 250, 
      "width": 400,
      "height": 200,
      "type": "appraisal"
    }
  ],
  "container": {
    "width": 940,
    "height": 600
  }
};

/**
 * Convert Figma data to dashboard layout configuration
 */
export const figmaToLayoutConfig = (figmaData) => {
  const gridConfig = convertFigmaToGrid(figmaData.frames, figmaData.container);
  
  return {
    grid: {
      columns: gridConfig.gridTemplateColumns,
      rows: gridConfig.gridTemplateRows,
      gap: gridConfig.gap
    },
    cards: gridConfig.rows.flatMap(row => 
      row.columns.map((frame, index) => ({
        id: frame.id,
        name: frame.name,
        component: getComponentByType(frame.type),
        size: getSizeByDimensions(frame.width, frame.height),
        gridColumn: frame.gridColumn,
        gridRow: frame.gridRow,
        span: frame.gridColumnSpan,
        order: (frame.gridRow - 1) * 10 + frame.gridColumn
      }))
    )
  };
};

/**
 * Map frame types to component names
 */
const getComponentByType = (type) => {
  const typeMap = {
    'attendance': 'AttendanceCard',
    'performer': 'TopPerformerCard', 
    'leave': 'LeaveSummaryCard',
    'appraisal': 'AppraisalCard',
    'announcement': 'AnnouncementCard',
    'quickAccess': 'QuickAccessCard'
  };
  return typeMap[type] || 'DashboardCard';
};

/**
 * Determine card size based on dimensions
 */
const getSizeByDimensions = (width, height) => {
  if (height < 130) return 'small';
  if (height < 180) return 'medium';
  if (height < 250) return 'large';
  return 'full';
};
