import _ from 'lodash';
import {
  DELETE_POST,
  CREATE_POST,
  FETCH_POSTS,
  FETCH_POST,
  EDIT_POST
} from '../actions/types';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_POSTS:
      return { ...state, ..._.mapKeys(payload, 'id') };
    case CREATE_POST:
    case EDIT_POST:
    case FETCH_POST:
      return { ...state, [payload.id]: payload };
    case DELETE_POST:
      return {..._.omit(state, payload)}
    default:
      return state;
  }
};
