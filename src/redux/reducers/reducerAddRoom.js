import * as types from './../types';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  newRoom: [],
};

export default function reducerAddRooms(state = initialState, action) {
  switch (action.type) {
    case `${types.ADD_ROOMS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.ADD_ROOMS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        newRoom: action.payload.data,
      };

    case `${types.ADD_ROOMS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
}
