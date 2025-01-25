import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Set your base URL
  timeout: 20000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use( 
  (config) => { 
      // Get the token from localStorage (or sessionStorage) 
      const token = localStorage.getItem("authToken"); 

      if (token) { 
          // Add the x-auth token to the headers if it exists 
          config.headers["authorization"] = token; 
      } 

      return config; 
  }, 
  (error) => { 
      // Handle request error 
      return Promise.reject(error); 
  } 
);

export default axiosInstance;