import React from 'react';
import PropTypes from 'prop-types';
import { TextField} from '@material-ui/core';


const TextInput = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <div className="field">
    <TextField
      variant="outlined"
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  </div>
);

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default TextInput;
