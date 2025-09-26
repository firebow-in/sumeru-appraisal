import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

const ConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('Checking...');
  const [backendData, setBackendData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      setConnectionStatus('Testing connection...');
      
      // Test basic health check
      const isHealthy = await ApiService.healthCheck();
      
      if (isHealthy) {
        setConnectionStatus('✅ Backend Connected!');
        
        // Try to fetch some data
        try {
          const employees = await ApiService.getEmployees();
          const dashboardStats = await ApiService.getDashboardStats();
          
          setBackendData({
            employees: employees,
            dashboardStats: dashboardStats
          });
        } catch (dataError) {
          console.warn('Backend connected but data fetch failed:', dataError);
          setBackendData({ message: 'Backend connected but no data available yet' });
        }
      } else {
        setConnectionStatus('❌ Backend Not Connected');
        setError('Backend server is not running or not accessible');
      }
    } catch (err) {
      setConnectionStatus('❌ Connection Failed');
      setError(err.message);
    }
  };

  const createTestEmployee = async () => {
    try {
      const testEmployee = {
        name: 'Test Employee',
        email: 'test@company.com',
        role: 'Developer',
        department: 'Engineering',
        position: 'Software Developer',
        hireDate: '2024-01-01',
        phoneNumber: '+1234567890',
        address: '123 Test St, Test City',
        active: true
      };

      const createdEmployee = await ApiService.createEmployee(testEmployee);
      alert(`Test employee created successfully! ID: ${createdEmployee.id}`);
      testConnection(); // Refresh data
    } catch (err) {
      alert(`Error creating test employee: ${err.message}`);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      margin: '20px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2>🔗 Backend Connection Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <strong>Status:</strong> {connectionStatus}
      </div>

      {error && (
        <div style={{ 
          color: 'red', 
          backgroundColor: '#ffe6e6', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {backendData && (
        <div style={{ 
          backgroundColor: '#e6ffe6', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <h3>📊 Backend Data:</h3>
          <pre style={{ fontSize: '12px', overflow: 'auto' }}>
            {JSON.stringify(backendData, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={testConnection}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🔄 Test Connection
        </button>
        
        <button 
          onClick={createTestEmployee}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          👤 Create Test Employee
        </button>
      </div>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <h4>📋 Instructions:</h4>
        <ol>
          <li>Make sure your backend is running on <code>http://localhost:8081</code></li>
          <li>Check that MySQL database is running and accessible</li>
          <li>Verify that the backend API endpoints are responding</li>
        </ol>
      </div>
    </div>
  );
};

export default ConnectionTest;
