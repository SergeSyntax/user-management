import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from '../../../actions/';
import TaskData from './TaskData';
import SubPageHeader from '../../layout/SubPageHeader';
import PropTypes from 'prop-types';

const TaskList = ({
  tasks,
  fetchTasks,
  match: {
    params: { id }
  }
}) => {
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <Fragment>
      <SubPageHeader
        title={`Tasks - User ${id}`}
        link={`/users/${id}/tasks/new`}
      />
      <ul className="list">
        {tasks &&
          tasks.length > 0 &&
          tasks
            .filter(task => task.userId === parseInt(id))
            .map(task => <TaskData key={task.id} task={task} />)}
      </ul>
    </Fragment>
  );
};

TaskList.prototype = {
  tasks: PropTypes.array.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tasks: Object.values(state.tasks)
});

export default connect(
  mapStateToProps,
  { fetchTasks }
)(TaskList);
