import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './LoginHeader';
import LoginForm from './LoginForm';
import DemoUsers from './DemoUsers';
import LoginFooter from './LoginFooter';
import { authService } from '../../services/auth';
import './LoginPage.css';

const LoginPage = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async ({ username, password }) => {
    setIsLoading(true);
    setError('');

    try {
      const user = await authService.authenticate(username, password);

      if (user) {
        authService.storeUserSession(user);
        const dashboardPath = authService.getDashboardPath(user.role);
        navigate(dashboardPath);
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = (role) => {
    const user = authService.demoUsers.find(u => u.role === role);
    if (user) {
      handleLogin({ username: user.username, password: user.password });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <LoginHeader />
        <LoginForm 
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={error}
        />
        <DemoUsers onDemoLogin={handleDemoLogin} />
        <LoginFooter />
      </div>
    </div>
  );
};

export default LoginPage;
