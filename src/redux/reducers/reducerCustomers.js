import * as types from './../types';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  customers: [],
};

export default function reducerCustomers(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_CUSTOMERS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.GET_CUSTOMERS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        customers: action.payload.data,
      };

    case `${types.GET_CUSTOMERS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case `${types.ADD_CUSTOMER}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.ADD_CUSTOMER}_FULFILLED`:
      state.customers.push(action.payload.data);
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };

    case `${types.ADD_CUSTOMER}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
}
