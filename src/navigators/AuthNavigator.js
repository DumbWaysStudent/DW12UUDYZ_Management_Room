import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Share, Alert, View} from 'react-native';
import {Icon} from 'native-base';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Home from '../screens/Home';
import Room from '../screens/Room';
import AddRoom from '../screens/AddNewRoom';
import UpdateRoom from '../screens/UpdateRoom';
import Customer from '../screens/Customer';
import AddNewCustomer from '../screens/AddNewCustomer';
import UpdateCustomer from '../screens/UpdateCustomer';
import Setting from '../screens/Setting';
import Checkin from '../screens/Checkin';
import AddNewCheckin from '../screens/AddNewCheckin';
import AddNewCheckout from '../screens/AddNewCheckout';

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Checkin,
      navigationOptions: {
        tabBarLabel: 'Checkin',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon
              style={[{color: tintColor}]}
              size={25}
              name={'checkmark-circle'}
            />
          </View>
        ),
      },
    },
    Room: {
      screen: Room,
      navigationOptions: {
        tabBarLabel: 'Room',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'bed'} />
          </View>
        ),
        activeColor: '#f1c40f',
        inactiveColor: '#f5f6fa',
        barStyle: {backgroundColor: '#2196F3'},
      },
    },
    Customer: {
      screen: Customer,
      navigationOptions: {
        tabBarLabel: 'Customer',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'contacts'} />
          </View>
        ),
        activeColor: '#f1c40f',
        inactiveColor: '#f5f6fa',
        barStyle: {backgroundColor: '#2196F3'},
      },
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        tabBarLabel: 'Setting',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'settings'} />
          </View>
        ),
        activeColor: '#f1c40f',
        inactiveColor: '#f5f6fa',
        barStyle: {backgroundColor: '#2196F3'},
      },
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#f1c40f',
    inactiveColor: '#f5f6fa',
    barStyle: {backgroundColor: '#2196F3'},
  },
);

const AuthStack = createStackNavigator({
  BottomStack: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
      cardStack: {
        gesturesEnabled: false,
      },
    },
  },
  AddRoom: {
    screen: AddRoom,
    navigationOptions: {
      title: 'AddRoom',
      header: null,
      cardStack: {
        gesturesEnabled: false,
      },
    },
  },
  UpdateRoom: {
    screen: UpdateRoom,
    navigationOptions: {
      title: 'Update Room',
      header: null,
      cardStack: {
        gesturesEnabled: false,
      },
    },
  },
  UpdateCustomer: {
    screen: UpdateCustomer,
    navigationOptions: {
      title: 'Update Room',
      header: null,
      cardStack: {
        gesturesEnabled: false,
      },
    },
  },
  AddNewCustomer: {
    screen: AddNewCustomer,
    navigationOptions: {
      title: 'Add Customer',
      header: null,
      cardStack: {
        gesturesEnabled: false,
      },
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
      header: null,
      cardStack: {
        gesturesEnabled: false,
      },
    },
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      title: 'Setting',
      header: null,
      cardStack: {
        gesturesEnabled: false,
      },
    },
  },
  Customer: {
    screen: Customer,
    navigationOptions: {
      title: 'Customer',
      header: null,
      cardStack: {
        gesturesEnabled: false,
      },
    },
  },
  Room: {
    screen: Checkin,
    navigationOptions: {
      title: 'Room',
      header: null,
      cardStack: {
        gesturesEnabled: false,
      },
    },
  },
  AddNewCheckin: {
    screen: AddNewCheckin,
    navigationOptions: {
      title: 'Room',
      header: null,
      cardStack: {
        gesturesEnabled: false,
      },
    },
  },
  AddNewCheckout: {
    screen: AddNewCheckout,
    navigationOptions: {
      title: 'Room',
      header: null,
      cardStack: {
        gesturesEnabled: false,
      },
    },
  },
});

export default createAppContainer(AuthStack);
