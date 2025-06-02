import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== 'undefined') {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user data:', error);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost/Doctor/api/auth/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      
      if (data.status === 'success') {
        const userJson = JSON.stringify(data.user);
        localStorage.setItem('user', userJson);
        setUser(data.user);
        return true;
      }
      throw new Error(data.message || 'Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async ({ name, email, phone, password, role }) => {
    try {
      const response = await fetch('http://localhost/Doctor/api/auth/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password, role }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      
      if (data.status === 'success') {
        return await login(email, password);
      }
      throw new Error(data.message || 'Registration failed');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, loading, login, register, logout };
}