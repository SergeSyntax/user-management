import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import users from './UserReducer';
import tasks from './TaskReducer';
import posts from './PostReducer';
export default combineReducers({
  users,
  form,
  tasks,
  posts
});
