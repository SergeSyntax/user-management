import React from 'react';
import { Switch } from 'react-router-dom';

const Page = ({ children, className }) => {
  return (
    <div className={className}>
      <Switch>{children}</Switch>
    </div>
  );
};

export default Page;
