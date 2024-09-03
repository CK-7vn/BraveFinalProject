import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await axios.get('/api/check-auth', { withCredentials: true });
      setIsLoggedIn(response.data.data[0].isLoggedIn);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, []);;

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = useCallback(() => {
    setIsLoggedIn(true);
    checkAuthStatus();
  }, []);

  const logout = useCallback(async () => {
    try {
      await axios.post('/api/logout', {}, { withCredentials: true });
      setIsLoggedIn(false);
    } catch (error) {
      console.error("logout failed:", error)
    } finally {
      checkAuthStatus();
    }
  }, []);

  return { isLoggedIn, isLoading, login, logout, checkAuthStatus };
}
