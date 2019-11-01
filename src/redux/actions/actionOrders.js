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

export const handleDeleteOrder = (id, token) => ({
  type: types.DELETE_ORDER,
  payload: axios({
    method: 'DELETE',
    url: `${API_URL}/order/${id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }),
});

export const handleAddCheckin = (room_id, customer_id, duration, token) => ({
  type: types.ADD_ORDER,
  payload: axios({
    method: 'POST',
    url: `${API_URL}/checkin`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      room_id,
      customer_id,
      duration,
    },
  }),
});
