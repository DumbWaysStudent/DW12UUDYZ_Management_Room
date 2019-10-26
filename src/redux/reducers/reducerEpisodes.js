import * as types from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  episodes: [],
};

export default function reducerEpisodes(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_EPISODES}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.GET_EPISODES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        episodes: action.payload.data,
      };

    case `${types.GET_EPISODES}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
