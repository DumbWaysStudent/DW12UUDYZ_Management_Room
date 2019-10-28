import * as types from './../types';
import axios from 'axios';
import {API_URL} from './../../constant/api_url';

export const handleGetOrders = token => ({
  type: types.GET_ORDERS,
  payload: axios({
    method: 'GET',
    url: `${API_URL}/checkin`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }),
});
