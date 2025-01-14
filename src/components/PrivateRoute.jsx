import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Loader from './UI/Loader';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { token, loading } = useAuth(); // Access the authToken and loading state from context

  // If still loading, return null or a loading spinner (this avoids redirecting immediately)
  if (loading) return <Loader color={'info'}/> 

  // Render the protected component if authenticated, otherwise redirect to login
  return token ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;