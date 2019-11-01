import * as types from './../types';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  checkin: [],
};

export default function reducerHistorie(state = initialState, action) {
  switch (action.type) {
    case `${types.ADD_HISTORIE}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.ADD_HISTORIE}_FULFILLED`:
      state.checkin.push(action.payload);
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };

    case `${types.ADD_HISTORIE}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
}
