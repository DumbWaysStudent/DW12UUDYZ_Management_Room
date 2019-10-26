import * as types from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  deleteWebtoon: [],
};

export default function reducerDeleteWebtoon(state = initialState, action) {
  switch (action.type) {
    case `${types.DELETE_USER_WEBTOON}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.DELETE_USER_WEBTOON}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        deleteWebtoon: action.payload.data,
      };

    case `${types.DELETE_USER_WEBTOON}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
