import * as types from './../types';
import axios from 'axios';
import {API_URL} from './../../constant/api_url';

export const handleAddHistorie = (room_id, customer_id, duration, token) => ({
  type: types.ADD_HISTORIE,
  payload: axios({
    method: 'POST',
    url: `${API_URL}/historie`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      room_id,
      customer_id,
      duration,
      token,
    },
  }),
});
