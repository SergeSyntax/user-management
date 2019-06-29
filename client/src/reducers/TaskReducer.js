import _ from 'lodash';
import {
  DELETE_TASK,
  CREATE_TASK,
  FETCH_TASKS,
  FETCH_TASK,
  COMPLETE_TASK,
  LOADING_FAIL
} from '../actions/types';

const initialState = {
  taskList: {},
  loading: true
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TASKS:
      return {
        ...state,
        taskList: { ..._.mapKeys(payload, 'id') },
        loading: false
      };

    case CREATE_TASK:
    case COMPLETE_TASK:
    case FETCH_TASK:
      return {
        ...state,
        taskList: {
          ...state.taskList,
          [payload.id]: { ...state.taskList[payload.id], ...payload }
        },
        loading: false
      };

    case DELETE_TASK:
      return {
        ...state,
        taskList: _.omit(state.taskList, payload),
        loading: false
      };

    case LOADING_FAIL:
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};