// API Service for Employee Dashboard
const API_BASE_URL = 'http://localhost:8081/api';

class ApiService {
  // Employee API endpoints
  static async getEmployees() {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  }

  static async getEmployeeById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching employee ${id}:`, error);
      throw error;
    }
  }

  static async createEmployee(employeeData) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  }

  static async updateEmployee(id, employeeData) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating employee ${id}:`, error);
      throw error;
    }
  }

  static async deleteEmployee(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error(`Error deleting employee ${id}:`, error);
      throw error;
    }
  }

  static async getEmployeesByDepartment(department) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/department/${department}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching employees by department ${department}:`, error);
      throw error;
    }
  }

  static async getActiveEmployees() {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/active`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching active employees:', error);
      throw error;
    }
  }

  

  static async searchEmployees(params) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/employees/search?${queryString}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching employees:', error);
      throw error;
    }
  }

  // Appraisal API endpoints
  static async getEmployeeAppraisals(employeeId) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${employeeId}/appraisals`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching appraisals for employee ${employeeId}:`, error);
      throw error;
    }
  }

  static async createAppraisal(employeeId, appraisalData) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${employeeId}/appraisals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appraisalData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error creating appraisal for employee ${employeeId}:`, error);
      throw error;
    }
  }

  static async getAppraisalsByStatus(status) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/appraisals/status/${status}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching appraisals by status ${status}:`, error);
      throw error;
    }
  }

  // Project API endpoints
  static async getEmployeeProjects(employeeId) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${employeeId}/projects`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching projects for employee ${employeeId}:`, error);
      throw error;
    }
  }

  static async createProject(employeeId, projectData) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${employeeId}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error creating project for employee ${employeeId}:`, error);
      throw error;
    }
  }

  static async getProjectsByStatus(status) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/projects/status/${status}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching projects by status ${status}:`, error);
      throw error;
    }
  }

  // Dashboard API endpoints
  static async getDashboardStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/dashboard/stats`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  // Admin API endpoints
  static async getAdminDashboard() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/dashboard`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching admin dashboard:', error);
      throw error;
    }
  }

  static async getAllAppraisals() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/appraisals`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching all appraisals:', error);
      throw error;
    }
  }

  static async getAllProjects() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/projects`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching all projects:', error);
      throw error;
    }
  }

  static async getAppraisalAnalytics() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/appraisals/analytics`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching appraisal analytics:', error);
      throw error;
    }
  }

  static async getProjectAnalytics() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/projects/analytics`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching project analytics:', error);
      throw error;
    }
  }

  // Feedback API endpoints
  static async getEmployeeFeedback(employeeId) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${employeeId}/feedback`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching feedback for employee ${employeeId}:`, error);
      throw error;
    }
  }

  static async addEmployeeFeedback(employeeId, feedbackData) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${employeeId}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error adding feedback for employee ${employeeId}:`, error);
      throw error;
    }
  }

  // Health check
  static async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`);
      return response.ok;
    } catch (error) {
      console.error('Backend health check failed:', error);
      return false;
    }
  }
}

export default ApiService;
