import _ from 'lodash';
import {
  DELETE_USER,
  CREATE_USER,
  FETCH_USERS,
  FETCH_USER,
  EDIT_USER
} from '../actions/types';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_USERS:
      return { ...state, ..._.mapKeys(payload, 'id') };

    case CREATE_USER:
    case EDIT_USER:
    case FETCH_USER:
      return { ...state, [payload.id]: { ...state[payload.id], ...payload } };
    case DELETE_USER:
      return { ..._.omit(state, payload) };
    default:
      return state;
  }
};
