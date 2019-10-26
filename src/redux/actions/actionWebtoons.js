import * as types from './../types';
import axios from 'axios';
import { API_URL } from '../../constant/api_url';

export const handleGetWebtoons = () => ({
  type: types.GET_WEBTOONS,
  payload: axios.get(`${API_URL}/webtoons`),
});

export const handleGetWebtoonFavourites = id => ({
  type: types.GET_FAVOURITES,
  payload: axios({
    method: 'GET',
    url: `${API_URL}/user/${id}/favourites`,
  }),
});

export const handleGetWebtoonEpisodes = id => ({
  type: types.GET_EPISODES,
  payload: axios({
    method: 'GET',
    url: `${API_URL}/webtoon/${id}/episodes`,
  }),
});

export const handleGetWebtoonImages = (webtoonId, episodeId) => ({
  type: types.GET_IMAGES,
  payload: axios({
    method: 'GET',
    url: `${API_URL}/webtoon/${webtoonId}/episode/${episodeId}`,
  }),
});
