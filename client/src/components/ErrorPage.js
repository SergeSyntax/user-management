import React from 'react';
import Background from './layout/Background';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <Background className="error-screen">
      <a href="/">
        <div className="error-message">
          <h1>503</h1>
          <p>
            Service not reachable or under maintenance right now, But soon we'll
            be up and the sun will shine again.
          </p>
        </div>
      </a>
    </Background>
  );
};

export default ErrorPage;
