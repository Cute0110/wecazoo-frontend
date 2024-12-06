// contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from './action'; // Ensure axiosInstance is configured correctly
import { eot, dot } from "@/lib/cryptoUtils";

const AuthContext = createContext(); // Create the context

// Custom hook to use the AuthContext

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authData, setAuthData] = useState({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await axiosInstance.get('/api/check_session', {
            withCredentials: true,
          });

          const res = dot(response.data);

          if (res.status == 1) {
            setAuthData(res.userData);
            setIsAuthenticated(res.status);
          } else {
            console.log(res.msg);
          }
        } catch (error) {
          console.error('Error checking auth status:', error);
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      };
  
      checkAuth();
    }, []);
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, setAuthData, loading, authData }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
export const useAuth = () => useContext(AuthContext);