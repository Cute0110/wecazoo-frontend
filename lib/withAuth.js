// libs/withAuth.js
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './authContext'; // Make sure the path is correct

const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
    const { isAuthenticated, loading } = useAuth(); // Access auth context
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push('/'); // Redirect to login if not authenticated
      }
    }, [loading, isAuthenticated, router]);

    if (loading) {
      return <p>Loading...</p>; // Show loading state until authentication is determined
    }

    if (!isAuthenticated) {
      return null; // Return nothing until authenticated
    }

    return <WrappedComponent {...props} />;
  };

  // Assign a display name for better debugging in React DevTools
  ComponentWithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default withAuth;