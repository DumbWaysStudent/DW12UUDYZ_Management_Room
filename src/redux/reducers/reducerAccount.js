import * as types from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  login: [],
};

export default function reducerAccount(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_LOGIN}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.GET_LOGIN}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        login: action.payload.data,
      };

    case `${types.GET_LOGIN}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
