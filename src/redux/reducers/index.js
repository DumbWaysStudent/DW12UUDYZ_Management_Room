//combine all reducer
import {combineReducers} from 'redux';
import {createNavigationReducer} from 'react-navigation-redux-helpers';

import RootNavigator from './../../navigators/RootNavigator';
import reducerAccount from './reducerAccount';
import reducerRooms from './reducerRooms';
import reducerAddRoom from './reducerAddRoom';
import reducerCustomers from './reducerCustomers';

const reducerRouter = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  router: reducerRouter,
  login: reducerAccount,
  rooms: reducerRooms,
  customers: reducerCustomers,
  newRoom: reducerAddRoom,
});

export default appReducer;
