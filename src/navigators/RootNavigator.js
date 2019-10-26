import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Auth from './AuthNavigator';
import UnAuth from './UnAuthNavigator';

const App = createSwitchNavigator({
  App: {
    screen: UnAuth,
  },
  Auth: {
    screen: Auth,
  },
});

export default createAppContainer(App);
