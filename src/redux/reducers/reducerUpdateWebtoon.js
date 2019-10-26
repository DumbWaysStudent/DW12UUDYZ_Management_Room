import * as types from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  updateWebtoon: [],
};

export default function reducerUpdateWebtoon(state = initialState, action) {
  switch (action.type) {
    case `${types.UPDATE_USER_WEBTOON}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.UPDATE_USER_WEBTOON}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        updateWebtoon: action.payload.data,
      };

    case `${types.UPDATE_USER_WEBTOON}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
