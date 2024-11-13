// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [nickname, setNickname] = useState(null);

  const fetchUserData = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const response = await axios.get('http://localhost:3000/user/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const email = response.data.email;
        setNickname(email.split('@')[0]);
      } catch (error) {
        console.error('유저 정보 불러오기 실패:', error);
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setNickname(null);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ nickname, setNickname, handleLogout, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
