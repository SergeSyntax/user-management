import React from 'react';
import { Button } from '@material-ui/core';

const ResponsiveNavBar = () => {
  return (
    <div className="responsive-bar">
      <a href="#1">
        <Button variant="contained" color="primary">
          <i className="material-icons">keyboard_arrow_up</i>
        </Button>
      </a>
      <a href="#2">
        <Button variant="contained" color="primary">
          <i className="material-icons">keyboard_arrow_down</i>
        </Button>
      </a>
    </div>
  );
};

export default ResponsiveNavBar;
