import _ from 'lodash';
import {
  DELETE_USER,
  CREATE_USER,
  FETCH_USERS,
  FETCH_USER,
  EDIT_USER,
  LOADING_FAIL
} from '../actions/types';

const initialState = {
  userList: {},
  loading: true,
  error: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USERS:
      return {
        ...state,
        userList: { ..._.mapKeys(payload, 'id') },
        loading: false,
        error: false
      };

    case CREATE_USER:
    case EDIT_USER:
    case FETCH_USER:
      return {
        ...state,
        userList: {
          ...state.userList,
          [payload.id]: { ...state.userList[payload.id], ...payload }
        },
        loading: false,
        error: false
      };

    case DELETE_USER:
      return {
        ...state,
        userList: _.omit(state.userList, payload),
        loading: false,
        error: false
      };

    case LOADING_FAIL:
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};
