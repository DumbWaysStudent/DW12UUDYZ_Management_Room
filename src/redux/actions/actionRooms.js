import * as types from './../types';
import axios from 'axios';
import {API_URL} from './../../constant/api_url';

export const handleGetRooms = token => ({
  type: types.GET_ROOMS,
  payload: axios({
    method: 'GET',
    url: `${API_URL}/rooms`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }),
});

export const handleAddRooms = (name, token) => ({
  type: types.ADD_ROOM,
  payload: axios({
    method: 'POST',
    url: `${API_URL}/room`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      name,
    },
  }),
});
