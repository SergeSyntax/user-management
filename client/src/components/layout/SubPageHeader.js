import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SubPageHeader = ({ title, link }) => {
  return (
    <div className="header">
      <h3>{title}</h3>

      {link && (
        <Link to={link}>
          <Button variant="outlined" color="primary">
            <i className="material-icons">add</i>
          </Button>
        </Link>
      )}
    </div>
  );
};

SubPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string
};

export default SubPageHeader;
