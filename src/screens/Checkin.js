/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Container, Text, View, Header} from 'native-base';
import {withNavigation} from 'react-navigation';
import {FlatGrid} from 'react-native-super-grid';
import {connect} from 'react-redux';
import * as actionOrders from './../redux/actions/actionOrders';
import moment from 'moment';

const millisecondsToMinutesSeconds = ms => {
  let duration = moment.duration(ms, 'milliseconds');
  let fromMinutes = Math.floor(duration.asMinutes());
  let fromSeconds = Math.floor(duration.asSeconds() - fromMinutes * 60);

  return Math.floor(duration.asSeconds()) >= 60
    ? (fromMinutes <= 9 ? '0' + fromMinutes : fromMinutes) +
        ':' +
        (fromSeconds <= 9 ? '0' + fromSeconds : fromSeconds)
    : '00:' + (fromSeconds <= 9 ? '0' + fromSeconds : fromSeconds);
};

class Checkin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  async componentDidMount() {
    const access_token = this.props.loginLocal.login.access_token;
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.getOrders(access_token);
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  onCheckIn = item => {
    this.props.navigation.navigate('AddNewCheckin', {dataEdit: item});
  };
  onCheckOut = item => {
    this.props.navigation.navigate('AddNewCheckout', {dataEdit: item});
    //Alert.alert(item.name + ' Checkout');
  };
  render() {
    let start = moment().format(); // some random moment in time (in ms)
    return (
      <Container>
        <Header style={styles.headerStyle}>
          <Text style={styles.itemName}>Checkin Room</Text>
        </Header>
        <View style={styles.viewContent}>
          {console.log(this.props.ordersLocal.orders)}
          <FlatGrid
            itemDimension={70}
            items={this.props.ordersLocal.orders}
            style={styles.gridView}
            staticDimension={320}
            fixed
            spacing={10}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={
                  item.orders != ''
                    ? item.orders[0].is_booked != false
                      ? () => this.onCheckOut(item)
                      : () => this.onCheckIn(item)
                    : () => this.onCheckIn(item)
                }>
                <View
                  style={[
                    styles.itemContainer,
                    {
                      backgroundColor:
                        item.orders != ''
                          ? item.orders[0].is_booked != false
                            ? '#bdc3c7'
                            : '#fdcb6e'
                          : '#fdcb6e',
                    },
                  ]}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemSubName}>
                    {item.orders != ''
                      ? millisecondsToMinutesSeconds(
                          moment(item.orders[0].order_end_time).diff(start),
                        )
                      : 'Available'}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    alignItems: 'center',
    backgroundColor: '#f1c40f',
  },
  viewContent: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    alignItems: 'center',
  },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    borderColor: '#2f3640',
    borderWidth: 1,
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 100,
    width: 90,
  },
  itemName: {
    fontSize: 25,
    color: '#2f3640',
  },
  itemSubName: {
    fontSize: 15,
    color: '#2f3640',
  },
  fabStyle: {
    backgroundColor: '#f1c40f',
    borderColor: '#2f3640',
    borderWidth: 0.3,
  },
});

const mapStateToProps = state => {
  return {
    loginLocal: state.login,
    ordersLocal: state.orders,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: token => dispatch(actionOrders.handleGetOrders(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Checkin));
