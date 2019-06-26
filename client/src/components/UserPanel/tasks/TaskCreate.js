import React, {Fragment} from 'react';
// import PropTypes from 'prop-types'
import TextInput from '../../layout/TextInput';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createTask } from '../../../actions';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SubPageHeader from '../../layout/SubPageHeader';

const TaskCreate = props => {
  const onSubmit = formValues => {
    props.createTask({ userId: props.match.params.id, ...formValues });
  };

  return (
    <Fragment>
      <SubPageHeader
        title={`Tasks - User ${props.match.params.id}`}
      />

      <form
        autoComplete="off"
        className="form"
        onSubmit={props.handleSubmit(onSubmit)}
      >
        <Field
          name="title"
          label="Title"
          component={TextInput}
          className="input"
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
    </Fragment>
  );
};

// TaskCreate.propTypes = {

// }

const validate = formValues => {
  const error = {};
  if (!formValues.title) error.title = 'You must enter a title!';
  return error;
};

const formWarp = reduxForm({
  form: 'creatTask',
  validate
})(TaskCreate);

export default connect(
  null,
  {
    createTask
  }
)(formWarp);

// import Input from '../../layout/inputs/Input';

// const TaskCreate = props => {
