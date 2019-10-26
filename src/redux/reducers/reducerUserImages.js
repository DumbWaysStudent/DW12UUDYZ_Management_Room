import * as types from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  userImages: [],
};

export default function reducerUserImages(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_USER_IMAGES}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.GET_USER_IMAGES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        userImages: action.payload.data,
      };

    case `${types.GET_USER_IMAGES}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
