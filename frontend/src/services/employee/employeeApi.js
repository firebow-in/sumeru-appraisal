// Employee-specific API services
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

// Employee Profile API
export const employeeProfileApi = {
  // Get employee profile
  getProfile: async (employeeId) => {
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}/profile`);
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  },

  // Update employee profile
  updateProfile: async (employeeId, profileData) => {
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  },

  // Upload profile picture
  uploadProfilePicture: async (employeeId, file) => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}/profile/picture`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to upload profile picture');
    return response.json();
  }
};

// Leave Management API
export const leaveApi = {
  // Get leave balance
  getLeaveBalance: async (employeeId) => {
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}/leave/balance`);
    if (!response.ok) throw new Error('Failed to fetch leave balance');
    return response.json();
  },

  // Submit leave request
  submitLeaveRequest: async (employeeId, leaveData) => {
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}/leave/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leaveData),
    });
    if (!response.ok) throw new Error('Failed to submit leave request');
    return response.json();
  },

  // Get leave history
  getLeaveHistory: async (employeeId, filters = {}) => {
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}/leave/history?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch leave history');
    return response.json();
  },

  // Cancel leave request
  cancelLeaveRequest: async (employeeId, requestId) => {
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}/leave/request/${requestId}/cancel`, {
      method: 'PUT',
    });
    if (!response.ok) throw new Error('Failed to cancel leave request');
    return response.json();
  }
};

// Attendance API
export const attendanceApi = {
  // Get attendance records
  getAttendanceRecords: async (employeeId, filters = {}) => {
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}/attendance?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch attendance records');
    return response.json();
  },

  // Check in
  checkIn: async (employeeId, checkInData) => {
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}/attendance/checkin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkInData),
    });
    if (!response.ok) throw new Error('Failed to check in');
    return response.json();
  },

  // Check out
  checkOut: async (employeeId, checkOutData) => {
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}/attendance/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkOutData),
    });
    if (!response.ok) throw new Error('Failed to check out');
    return response.json();
  },

  // Get attendance summary
  getAttendanceSummary: async (employeeId, period = 'current_month') => {
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}/attendance/summary?period=${period}`);
    if (!response.ok) throw new Error('Failed to fetch attendance summary');
    return response.json();
  }
};

// Appraisal API
export const appraisalApi = {
  // Get appraisal status
  getAppraisalStatus: async (employeeId) => {
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}/appraisal/status`);
    if (!response.ok) throw new Error('Failed to fetch appraisal status');
    return response.json();
  },

  // Submit self-appraisal
  submitSelfAppraisal: async (employeeId, appraisalData) => {
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}/appraisal/self`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appraisalData),
    });
    if (!response.ok) throw new Error('Failed to submit self-appraisal');
    return response.json();
  },

  // Get appraisal history
  getAppraisalHistory: async (employeeId) => {
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}/appraisal/history`);
    if (!response.ok) throw new Error('Failed to fetch appraisal history');
    return response.json();
  }
};

// Dashboard API
export const dashboardApi = {
  // Get employee dashboard data
  getDashboardData: async (employeeId) => {
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}/dashboard`);
    if (!response.ok) throw new Error('Failed to fetch dashboard data');
    return response.json();
  },

  // Get notifications
  getNotifications: async (employeeId) => {
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}/notifications`);
    if (!response.ok) throw new Error('Failed to fetch notifications');
    return response.json();
  },

  // Mark notification as read
  markNotificationAsRead: async (employeeId, notificationId) => {
    const response = await fetch(`${API_BASE_URL}/api/employees/${employeeId}/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
    if (!response.ok) throw new Error('Failed to mark notification as read');
    return response.json();
  }
};

// Export all APIs
export default {
  employeeProfileApi,
  leaveApi,
  attendanceApi,
  appraisalApi,
  dashboardApi
};
