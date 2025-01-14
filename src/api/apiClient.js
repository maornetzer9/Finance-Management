import axios from 'axios';

const baseUrl = import.meta.env.VITE_ORIGIN_DEV;


// Create an Axios instance
const api = axios.create({
  baseURL: baseUrl, // Replace with your backend API URL
});

// Request interceptor to add the token to the headers of every request
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage or any other storage
    const token = localStorage.getItem('token');
    
    // If the token exists, add it to the request headers
    if (token) 
    {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if(config.data instanceof FormData)
    {
        config.headers['Content-Type'] = 'multipart/form-data';
    }

    return config;
  },
  (error) => {
    console.error("Error with request:", error);
    return Promise.reject(error);
  }
);

// Request interceptor to handle expired token.
api.interceptors.response.use(
    response => response, // If response is OK, just return it
    error => {
      // Check if the error response is 401 (Unauthorized)
      if (error.response && error.response.status === 401) 
      {
        const redirectTo = error.response.data.redirectTo;
        
        // If token expired or invalid, remove the old token from localStorage
        localStorage.removeItem('token');
        
        if (redirectTo) 
        {
          // Redirect the user to the login page
          window.location.href = redirectTo;
        }
      }
      return Promise.reject(error);
    }
  );

// You can create additional methods for common API requests here
const get = async (url) => 
{
    try
    {
        const { data } = await api.get(url);
        return data
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error(err.message);
    }
};


const post = async (url, payload) => 
{
    try
    {
        const { data } = await api.post(url, payload);
        return data
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error(err.message);
    }
};


const put = async (url, payload) => 
{
    try
    {
        const { data } = await api.put(url, payload);
        return data
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error(err.message);
    }
};


const deleteRequest = async (url, param) => {
    try
    {
        const { data } = await api.delete(`${url}/${param}`); 
        return data

    }
    catch(err)
    {
        console.error(err.message);
        throw new Error(err.message);
    }
};

export { get, post, put, deleteRequest };