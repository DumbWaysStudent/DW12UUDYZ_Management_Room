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

export const handleAddCustomer = (
  name,
  identity_number,
  phone_number,
  image,
  token,
) => ({
  type: types.ADD_CUSTOMER,
  payload: axios({
    method: 'POST',
    url: `${API_URL}/customer`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      name,
      identity_number,
      phone_number,
      image,
    },
  }),
});

export const handleUpdateCustomer = (
  name,
  identity_number,
  phone_number,
  image,
  id,
  token,
) => ({
  type: types.UPDATE_CUSTOMER,
  payload: axios({
    method: 'PUT',
    url: `${API_URL}/customer/${id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      name,
      identity_number,
      phone_number,
      image,
    },
  }),
});
