import * as types from './../types';
import axios from 'axios';
import {API_URL} from './../../constant/api_url';

export const handleGetCustomers = token => ({
  type: types.GET_CUSTOMERS,
  payload: axios({
    method: 'GET',
    url: `${API_URL}/customers`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }),
});
