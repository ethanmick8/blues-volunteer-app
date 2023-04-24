// SWITCH AND REDIRECT USAGE (WASN'T WORKING)
/* import React from 'react';
import { Route, Redirect } from 'react-router';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute; */

// ProtectedRoute.js
/*import React from 'react';
import { Route, Navigate } from 'react-router';

const ProtectedRoute = ({ element: Component, isAuthenticated, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => {
          if (isAuthenticated) {
            return <Component {...props} />;
          } else {
            return <Navigate to="/login" />;
          }
        }}
      />
    );
  };  

export default ProtectedRoute; */
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;



