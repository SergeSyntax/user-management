import _ from 'lodash';
import {
  DELETE_TASK,
  CREATE_TASK,
  FETCH_TASKS,
  FETCH_TASK,
  COMPLETE_TASK
} from '../actions/types';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_TASKS:
      return { ...state, ..._.mapKeys(payload, 'id') };
    case CREATE_TASK:
    case COMPLETE_TASK:
    case FETCH_TASK:
      return { ...state, [payload.id]: payload };
    case DELETE_TASK:
      return {..._.omit(state, payload)}
    default:
      return state;
  }
};
