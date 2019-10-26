import * as types from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  updateEpisode: [],
};

export default function reducerUpdateEpisode(state = initialState, action) {
  switch (action.type) {
    case `${types.UPDATE_USER_EPISODE}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.UPDATE_USER_EPISODE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        updateEpisode: action.payload.data,
      };

    case `${types.UPDATE_USER_EPISODE}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
