// Dashboard Layout Configuration
// This file allows you to easily rearrange and resize dashboard cards

export const dashboardLayouts = {
  // Default 2-column layout
  default: {
    grid: {
      columns: 2,
      gap: '16px'
    },
    cards: [
      {
        id: 'header',
        component: 'HeaderCard',
        size: 'small',
        span: 'full',
        order: 1
      },
      {
        id: 'attendance',
        component: 'AttendanceCard',
        size: 'medium',
        span: 2,
        order: 2
      },
      {
        id: 'topPerformer',
        component: 'TopPerformerCard',
        size: 'medium',
        span: 1,
        order: 3
      },
      {
        id: 'leaveSummary',
        component: 'LeaveSummaryCard',
        size: 'large',
        span: 1,
        order: 4
      },
      {
        id: 'appraisal',
        component: 'AppraisalCard',
        size: 'large',
        span: 1,
        order: 5
      },
      {
        id: 'announcement',
        component: 'AnnouncementCard',
        size: 'large',
        span: 2,
        order: 6
      },
      {
        id: 'quickAccess',
        component: 'QuickAccessCard',
        size: 'medium',
        span: 1,
        order: 7
      }
    ]
  },

  // 3-column layout for larger screens
  threeColumn: {
    grid: {
      columns: 3,
      gap: '16px'
    },
    cards: [
      {
        id: 'header',
        component: 'HeaderCard',
        size: 'small',
        span: 3,
        order: 1
      },
      {
        id: 'attendance',
        component: 'AttendanceCard',
        size: 'medium',
        span: 2,
        order: 2
      },
      {
        id: 'topPerformer',
        component: 'TopPerformerCard',
        size: 'medium',
        span: 1,
        order: 3
      },
      {
        id: 'leaveSummary',
        component: 'LeaveSummaryCard',
        size: 'large',
        span: 1,
        order: 4
      },
      {
        id: 'appraisal',
        component: 'AppraisalCard',
        size: 'large',
        span: 1,
        order: 5
      },
      {
        id: 'quickAccess',
        component: 'QuickAccessCard',
        size: 'medium',
        span: 1,
        order: 6
      },
      {
        id: 'announcement',
        component: 'AnnouncementCard',
        size: 'large',
        span: 3,
        order: 7
      }
    ]
  },

  // Compact layout for smaller screens
  compact: {
    grid: {
      columns: 1,
      gap: '12px'
    },
    cards: [
      {
        id: 'header',
        component: 'HeaderCard',
        size: 'small',
        span: 1,
        order: 1
      },
      {
        id: 'attendance',
        component: 'AttendanceCard',
        size: 'small',
        span: 1,
        order: 2
      },
      {
        id: 'appraisal',
        component: 'AppraisalCard',
        size: 'medium',
        span: 1,
        order: 3
      },
      {
        id: 'leaveSummary',
        component: 'LeaveSummaryCard',
        size: 'medium',
        span: 1,
        order: 4
      },
      {
        id: 'topPerformer',
        component: 'TopPerformerCard',
        size: 'small',
        span: 1,
        order: 5
      },
      {
        id: 'quickAccess',
        component: 'QuickAccessCard',
        size: 'small',
        span: 1,
        order: 6
      },
      {
        id: 'announcement',
        component: 'AnnouncementCard',
        size: 'medium',
        span: 1,
        order: 7
      }
    ]
  }
};

// Card size definitions
export const cardSizes = {
  small: {
    minHeight: '120px',
    padding: '16px'
  },
  medium: {
    minHeight: '140px',
    padding: '24px'
  },
  large: {
    minHeight: '200px',
    padding: '32px'
  },
  full: {
    minHeight: '300px',
    padding: '32px'
  }
};

// Responsive breakpoints
export const breakpoints = {
  mobile: '600px',
  tablet: '900px',
  desktop: '1200px',
  large: '1400px'
};

// Helper function to get layout based on screen size
export const getResponsiveLayout = (screenWidth) => {
  if (screenWidth < 600) {
    return dashboardLayouts.compact;
  } else if (screenWidth < 1200) {
    return dashboardLayouts.default;
  } else {
    return dashboardLayouts.threeColumn;
  }
};
