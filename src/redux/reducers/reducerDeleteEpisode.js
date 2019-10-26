import * as types from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  deleteEpisode: [],
};

export default function reducerDeleteEpisode(state = initialState, action) {
  switch (action.type) {
    case `${types.DELETE_USER_EPISODE}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.DELETE_USER_EPISODE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        deleteEpisode: action.payload.data,
      };

    case `${types.DELETE_USER_EPISODE}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
