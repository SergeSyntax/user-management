import React from 'react';
import { Switch } from 'react-router-dom';

const Page = ({ id, children, className }) => {
  return (
    <div id={id} className={className}>
      <Switch>{children}</Switch>
    </div>
  );
};

export default Page;
