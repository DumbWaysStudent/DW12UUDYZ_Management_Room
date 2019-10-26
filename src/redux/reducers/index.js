//combine all reducer
import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigator from './../../navigators/RootNavigator';
import reducerWebtoons from './../reducers/reducerWebtoons';
import reducerFavourites from './../reducers/reducerFavourites';
import reducerEpisodes from './../reducers/reducerEpisodes';
import reducerImages from './reducerImages';
import reducerLogin from './../reducers/reducerLogin';
import reducerUserWebtoons from './../reducers/reducerUserWebtoons';
import reducerUpdateWebtoon from './../reducers/reducerUpdateWebtoon';
import reducerDeleteWebtoon from './../reducers/reducerDeleteWebtoon';
import reducerUserEpisodes from './../reducers/reducerUserEpisodes';
import reducerUpdateEpisode from './../reducers/reducerUpdateEpisode';
import reducerDeleteEpisode from './../reducers/reducerDeleteEpisode';
import reducerUserImages from './../reducers/reducerUserImages';
import reducerDeleteImage from './../reducers/reducerDeleteImage';

const reducerRouter = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  router: reducerRouter,
  webtoons: reducerWebtoons,
  favourites: reducerFavourites,
  episodes: reducerEpisodes,
  images: reducerImages,
  login: reducerLogin,
  userWebtoons: reducerUserWebtoons,
  deleteWebtoon: reducerDeleteWebtoon,
  updateWebtoon: reducerUpdateWebtoon,
  userEpisodes: reducerUserEpisodes,
  updateEpisode: reducerUpdateEpisode,
  deleteEpisode: reducerDeleteEpisode,
  userImages: reducerUserImages,
  deleteImage: reducerDeleteImage,
});

export default appReducer;
