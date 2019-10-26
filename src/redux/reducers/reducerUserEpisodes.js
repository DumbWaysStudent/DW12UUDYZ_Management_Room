import * as types from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  userEpisodes: [],
};

export default function reducerUserEpisodes(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_USER_EPISODES}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.GET_USER_EPISODES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        userEpisodes: action.payload.data,
      };

    case `${types.GET_USER_EPISODES}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
