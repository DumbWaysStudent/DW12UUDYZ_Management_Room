import * as types from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  deleteImage: [],
};

export default function reducerDeleteImage(state = initialState, action) {
  switch (action.type) {
    case `${types.DELETE_USER_IMAGE}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.DELETE_USER_IMAGE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        deleteImage: action.payload.data,
      };

    case `${types.DELETE_USER_IMAGE}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
