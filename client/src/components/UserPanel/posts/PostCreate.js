import React from 'react';
// import PropTypes from 'prop-types';
import TextInput from '../../layout/TextInput';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../../../actions';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SubPageHeader from '../../layout/SubPageHeader';

const PostCreate = props => {
  const onSubmit = formValues => {
    props.createPost({ userId: props.match.params.id, ...formValues });
  };

  return (
    <div className="align-form">
      <SubPageHeader
        title={`Posts - User ${props.match.params.id}`}
      />
      <form
        autoComplete="off"
        className="form"
        onSubmit={props.handleSubmit(onSubmit)}
      >
        <Field
          name="title"
          label="Title"
          className="input"
          component={TextInput}
        />
        <Field
          name="body"
          label="Body"
          className="input"
          component={TextInput}
          multiline={true}
          rows={4}
        />
        <div className="user-form-actions">
          <Button
            className="btn"
            variant="contained"
            color="primary"
            type="submit"
          >
            Create
          </Button>
          <Link to={`/users/${props.match.params.id}`}>
            <Button variant="contained">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

// PostCreate.propTypes = {};

const validate = formValues => {
  const error = {};
  if (!formValues.title) error.title = 'You must enter a title!';
  return error;
};

const formWarp = reduxForm({
  form: 'creatPost',
  validate
})(PostCreate);

export default connect(
  null,
  {
    createPost
  }
)(formWarp);
