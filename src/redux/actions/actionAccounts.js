import * as types from './../types';
import axios from 'axios';
import { API_URL } from './../../constant/api_url';

export const handleLogin = (email, password) => ({
  type: types.LOGIN,
  payload: axios({
    method: 'POST',
    url: `${API_URL}/login`,
    data: {
      email,
      password,
    },
  }),
});

export const handleGetUserWebtoons = (userId, token) => ({
  type: types.GET_USER_WEBTOONS,
  payload: axios({
    method: 'GET',
    url: `${API_URL}/user/${userId}/webtoons`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }),
});

export const handleUpdateUserWebtoon = (userId, webtoonId, title, token) => ({
  type: types.UPDATE_USER_WEBTOON,
  payload: axios({
    method: 'PUT',
    url: `${API_URL}/user/${userId}/webtoon/${webtoonId}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      title,
    },
  }),
});

export const handleDeleteUserWebtoon = (userId, webtoonId, token) => ({
  type: types.DELETE_USER_WEBTOON,
  payload: axios({
    method: 'DELETE',
    url: `${API_URL}/user/${userId}/webtoon/${webtoonId}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }),
});

export const handleGetUserEpisodes = (userId, webtoonId, token) => ({
  type: types.GET_USER_EPISODES,
  payload: axios({
    method: 'GET',
    url: `${API_URL}/user/${userId}/webtoon/${webtoonId}/episodes`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }),
});

export const handleUpdateUserEpisode = (
  userId,
  webtoonId,
  episodeId,
  title,
  token,
) => ({
  type: types.UPDATE_USER_EPISODE,
  payload: axios({
    method: 'PUT',
    url: `${API_URL}/user/${userId}/webtoon/${webtoonId}/episode/${episodeId}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      title,
    },
  }),
});

export const handleDeleteUserEpisode = (
  userId,
  webtoonId,
  episodeId,
  token,
) => ({
  type: types.DELETE_USER_EPISODE,
  payload: axios({
    method: 'DELETE',
    url: `${API_URL}/user/${userId}/webtoon/${webtoonId}/episode/${episodeId}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }),
});

export const handleGetUserImages = (userId, webtoonId, episodeId, token) => ({
  type: types.GET_USER_IMAGES,
  payload: axios({
    method: 'GET',
    url: `${API_URL}/user/${userId}/webtoon/${webtoonId}/episode/${episodeId}/images`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }),
});

export const handleDeleteUserImage = (
  userId,
  webtoonId,
  episodeId,
  imageId,
  token,
) => ({
  type: types.DELETE_USER_EPISODE,
  payload: axios({
    method: 'DELETE',
    url: `${API_URL}/user/${userId}/webtoon/${webtoonId}/episode/${episodeId}/image/${imageId}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }),
});
