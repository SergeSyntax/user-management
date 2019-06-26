import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { completeTask } from '../../../actions';
import './TaskData.css';

const TaskData = ({ task, completeTask }) => {
  const { title, completed } = task;
  return (
    <div className="task-data">
      <div className="task-info">
        <span className="property">Title:{'\t'}</span>
        {title}
      </div>
      <div className="task-status">
        <div>
          <span className="property">Status:{'\t'}</span>
          {completed ? (
            <span className="success">Completed</span>
          ) : (
            <span className="fail">In Progress</span>
          )}
        </div>
        <div className="task-action">
          {!completed && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => completeTask(task)}
            >
              Mark Completed
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

TaskData.propTypes = {
  task: PropTypes.object.isRequired,
  completeTask: PropTypes.func.isRequired
};

export default connect(
  null,
  { completeTask }
)(TaskData);
