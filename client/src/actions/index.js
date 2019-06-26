import {
  FETCH_USERS,
  FETCH_USER,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
  FETCH_TASKS,
  CREATE_TASK,
  FETCH_POSTS,
  COMPLETE_TASK,
  CREATE_POST
} from './types';
import server from '../apis/server';
import history from '../history';
/**
|--------------------------------------------------
| User
|--------------------------------------------------
*/

export const fetchUser = id => async dispatch => {
  const { data: payload } = await server.get(`/users/${id}`);
  dispatch({ type: FETCH_USER, payload });
};

export const fetchUsers = () => async dispatch => {
  try {
    const { data: users } = await server.get('/users');
    const { data: tasks } = await server.get('/tasks');
    const payload = users.map(user => {
      user.uncompletedTasks = tasks.some(
        task => task.userId === user.id && !task.completed
      );
      return user;
    });
    dispatch({
      type: FETCH_USERS,
      payload
    });
  } catch (error) {
    console.error(error);
  }
};

export const createUser = formValues => async dispatch => {
  const { data } = await server.post('/users', formValues);
  await dispatch({
    type: CREATE_USER,
    payload: data
  });
  history.push('/');
};

export const editUser = (id, formValues) => async dispatch => {
  const { city, email, name, number, phoneType } = formValues;

  if (number && phoneType)
    await server.post(`/users/${id}/phones`, {
      number,
      phoneType
    });
  const { data: payload } = await server.put(`/users/${id}`, {
    name,
    email,
    city
  });
  await dispatch({ type: EDIT_USER, payload });
  await dispatch(fetchUser(id));
};

export const deleteUser = id => async dispatch => {
  await server.delete(`/users/${id}`);
  dispatch({ type: DELETE_USER, payload: id });
  history.push('/');
};

/**
|--------------------------------------------------
| TASKS
|--------------------------------------------------
*/

export const fetchTasks = userId => async dispatch => {
  try {
    const { data: payload } = await server.get(`/tasks`);
    dispatch({
      type: FETCH_TASKS,
      payload
    });
  } catch (error) {
    console.error(error);
  }
};

export const createTask = formValues => async dispatch => {
  const { data } = await server.post('/tasks', formValues);
  await dispatch({
    type: CREATE_TASK,
    payload: data
  });
  history.push(`/users/${data.userId}`);
};

export const fetchPosts = userId => async dispatch => {
  try {
    const { data: payload } = await server.get(`/posts`);
    dispatch({
      type: FETCH_POSTS,
      payload
    });
  } catch (error) {
    console.error(error);
  }
};

export const completeTask = ({ title, id }) => async dispatch => {
  const { data: payload } = await server.put(`/tasks/${id}`, {
    title,
    completed: true
  });
  dispatch({
    type: COMPLETE_TASK,
    payload
  });
};

export const createPost = formValues => async dispatch => {
  const { data } = await server.post('/posts/', formValues);
  await dispatch({ type: CREATE_POST, payload: data });
  history.push(`/users/${data.userId}`);
};
