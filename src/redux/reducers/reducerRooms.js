import * as types from './../types';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  rooms: [],
};

export default function reducerRooms(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_ROOMS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.GET_ROOMS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        rooms: action.payload.data,
      };

    case `${types.GET_ROOMS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case `${types.UPDATE_ROOM}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.UPDATE_ROOM}_FULFILLED`:
      const updateData = state.rooms.findIndex(
        item => item.id === action.payload.id,
      );
      state.rooms[updateData] = action.payload;
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };

    case `${types.UPDATE_ROOM}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
