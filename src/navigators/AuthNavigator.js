import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Share, Alert, View} from 'react-native';
import {Icon} from 'native-base';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Home from '../screens/Home';

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
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
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Room',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'bed'} />
          </View>
        ),
        activeColor: '#2f3640',
        inactiveColor: '#2f3640',
        barStyle: {backgroundColor: '#f1c40f'},
      },
    },
    Customer: {
      screen: Home,
      navigationOptions: {
        headerLeft: null,
        headerRight: (
          // eslint-disable-next-line react-native/no-inline-styles
          <Icon style={{color: 'white'}} name="create" />
        ),
        tabBarLabel: 'Customer',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'contacts'} />
          </View>
        ),
        activeColor: '#2f3640',
        inactiveColor: '#2f3640',
        barStyle: {backgroundColor: '#f1c40f'},
      },
    },
    Setting: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Setting',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'settings'} />
          </View>
        ),
        activeColor: '#2f3640',
        inactiveColor: '#2f3640',
        barStyle: {backgroundColor: '#f1c40f'},
      },
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#2f3640',
    inactiveColor: '#2f3640',
    barStyle: {backgroundColor: '#f1c40f'},
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
});

export default createAppContainer(AuthStack);
