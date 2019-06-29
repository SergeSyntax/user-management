import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
      }}
    >
      <CircularProgress size={150} thickness={1} />
    </div>
  );
};

export default Spinner;
