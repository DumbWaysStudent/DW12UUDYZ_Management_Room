import * as types from './../types';
import axios from 'axios';
import {API_URL} from './../../constant/api_url';

export const handleLogin = (email, password) => ({
  type: types.GET_LOGIN,
  payload: axios({
    method: 'POST',
    url: `${API_URL}/login`,
    data: {
      email,
      password,
    },
  }),
});
