import * as types from './../types';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  orders: [],
};

export default function reducerOrders(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_ORDERS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.GET_ORDERS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        orders: action.payload.data,
      };

    case `${types.GET_ORDERS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case `${types.DELETE_ORDER}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.DELETE_ORDER}_FULFILLED`:
      const deleteData = state.orders.filter(
        item => item.id !== action.payload.id,
      );
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        orders: deleteData,
      };

    case `${types.DELETE_ORDER}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case `${types.ADD_ORDER}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.ADD_ORDER}_FULFILLED`:
      //console.log(action.payload.data);
      //state.orders.push(action.payload.data);
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };

    case `${types.ADD_ORDER}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
}
