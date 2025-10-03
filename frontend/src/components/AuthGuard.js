import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      navigate('/');
    }
  }, [navigate]);

  const user = authService.getCurrentUser();
  if (!user) {
    return null; // or a loading spinner
  }

  return children;
};

export default AuthGuard;
