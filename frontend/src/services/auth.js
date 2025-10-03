// Authentication service
export const authService = {
  // Demo users data
  demoUsers: [
    { username: 'emp1', password: '123', role: 'employee', displayName: 'John Doe', department: 'Engineering' },
    { username: 'hr1', password: '123', role: 'hr', displayName: 'Sarah Johnson', department: 'Human Resources' },
    { username: 'pm1', password: '123', role: 'pm', displayName: 'Mike Chen', department: 'Project Management' },
    { username: 'ceo1', password: '123', role: 'ceo', displayName: 'Alex Thompson', department: 'Executive' },
    { username: 'intern1', password: '123', role: 'intern', displayName: 'Emma Wilson', department: 'Engineering' },
  ],

  // Authenticate user
  authenticate: async (username, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = authService.demoUsers.find(
      (u) => u.username === username && u.password === password
    );
    
    return user;
  },

  // Store user session
  storeUserSession: (user) => {
    const sessionData = {
      username: user.username,
      role: user.role,
      displayName: user.displayName,
      department: user.department,
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('user', JSON.stringify(sessionData));
    return sessionData;
  },

  // Get current user
  getCurrentUser: () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  },

  // Clear user session
  logout: () => {
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!authService.getCurrentUser();
  },

  // Get role-specific dashboard path
  getDashboardPath: (role) => {
    const paths = {
      employee: '/employee/dashboard',
      hr: '/hr/dashboard',
      pm: '/project-manager/dashboard',
      ceo: '/ceo/dashboard',
      intern: '/intern/dashboard'
    };
    
    return paths[role] || '/';
  }
};

