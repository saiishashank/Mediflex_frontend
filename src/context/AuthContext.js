import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwt') || null);
  // The 'userType' state is NO LONGER NEEDED

useEffect(() => {
  const fetchUser = async () => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        // THIS IS THE FIX: Always call the new unified endpoint
        const response = await axios.get(`https://mediflex.onrender.com/api/auth/me`);
        
        const userData = response.data.data.data;
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user on reload:", error);
        logout();
      }
    }
  };
  fetchUser();
}, [token]); // The effect now only depends on the token

  const login = (userData, userToken) => { // No 'type' parameter needed
    localStorage.setItem('jwt', userToken);
    // localStorage.removeItem('userType'); // Clean up the old item
    setUser(userData);
    setToken(userToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    // localStorage.removeItem('userType'); // Clean up the old item
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };