import _ from 'lodash';
import {
  DELETE_POST,
  CREATE_POST,
  FETCH_POSTS,
  FETCH_POST,
  EDIT_POST,
  LOADING_FAIL
} from '../actions/types';
const initialState = {
  postList: {},
  loading: true
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_POSTS:
      return {
        ...state,
        postList: { ..._.mapKeys(payload, 'id') },
        loading: false
      };

    case CREATE_POST:
    case EDIT_POST:
    case FETCH_POST:
      return {
        ...state,
        postList: {
          ...state.postList,
          [payload.id]: { ...state.postList[payload.id], ...payload }
        },
        loading: false
      };

    case DELETE_POST:
      return {
        ...state,
        postList: _.omit(state.postList, payload),
        loading: false
      };

    case LOADING_FAIL:
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};