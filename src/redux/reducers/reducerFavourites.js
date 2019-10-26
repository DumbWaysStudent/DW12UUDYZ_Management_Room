import * as types from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  favourites: [],
};

export default function reducerFavourites(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_FAVOURITES}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.GET_FAVOURITES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        favourites: action.payload.data,
      };

    case `${types.GET_FAVOURITES}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
