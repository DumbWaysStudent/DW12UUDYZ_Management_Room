import * as types from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  images: [],
};

export default function reducerImages(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_IMAGES}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.GET_IMAGES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        images: action.payload.data,
      };

    case `${types.GET_IMAGES}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
