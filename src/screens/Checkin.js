/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Container, Text, View, Header, Left, Icon} from 'native-base';
import {withNavigation} from 'react-navigation';
import {FlatGrid} from 'react-native-super-grid';
import {connect} from 'react-redux';
import * as actionOrders from './../redux/actions/actionOrders';
import * as actionHistories from '../redux/actions/actionHistories';
import * as AuthService from '../services/AuthService';
import Spinner from 'react-native-loading-spinner-overlay';
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
      spinner: false,
    };
  }

  async componentDidMount() {
    setInterval(async () => {
      this.checkAvailableRoom();
    }, 10000);
    const access_token = await AuthService.storageGet('token');
    this.setState({
      spinner: !this.state.spinner,
    });
    this.props.getOrders(access_token);
    this.setState({
      spinner: !this.state.spinner,
    });
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', async () => {
      this.setState({
        spinner: !this.state.spinner,
      });
      await this.props.getOrders(access_token);
      this.setState({
        spinner: !this.state.spinner,
      });
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  onCheckIn = item => {
    this.props.navigation.navigate('AddNewCheckin', {dataEdit: item});
  };

  onCheckOut = item => {
    this.props.navigation.navigate('AddNewCheckout', {dataEdit: item});
  };

  checkAvailableRoom = async () => {
    const token = await AuthService.storageGet('token');
    const orders = this.props.ordersLocal.orders;

    for (let i = 0; i < orders.length; i++) {
      if (orders[i].orders[0] !== undefined) {
        if (
          moment(orders[i].orders[0].order_end_time).diff(
            moment(),
            'seconds',
          ) <= 0
        ) {
          const id = orders[i].orders[0].id;
          const room_id = orders[i].id;
          const duration = orders[i].orders[0].duration;
          const customer_id = orders[i].orders[0].customer_id;
          await this.props.AddHistorie(room_id, customer_id, duration, token);
          await this.props.DeleteOrder(id, token);
          this.setState({
            spinner: !this.state.spinner,
          });
          await this.props.getOrders(token);
          this.setState({
            spinner: !this.state.spinner,
          });
        }
      }
    }
  };
  render() {
    const {goBack} = this.props.navigation;
    let start = moment().format();
    return (
      <Container>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Header style={styles.headerStyle} />
        <View style={styles.nexHeader}>
          <Text style={styles.heading}>Orders</Text>
        </View>
        <View style={styles.viewContent}>
          <FlatGrid
            itemDimension={80}
            items={this.props.ordersLocal.orders}
            style={styles.gridView}
            // staticDimension={320}
            // fixed
            // spacing={10}
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
                            ? 'white'
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
  heading: {
    fontSize: 50,
    color: 'white',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  headerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    //backgroundColor: '#d2dae2',
    backgroundColor: '#2196F3',
  },
  nexHeader: {
    padding: 25,
    //backgroundColor: 'black',
    height: 75,
    backgroundColor: '#2196F3',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  viewContent: {
    flex: 1,
    backgroundColor: '#d2dae2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 15,
    padding: 10,
    height: 100,
    // width: 105,
  },
  itemName: {
    fontSize: 25,
    color: 'black',
  },
  itemSubName: {
    fontSize: 15,
    color: 'black',
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
    AddHistorie: (room_id, customer_id, duration, token) =>
      dispatch(
        actionHistories.handleAddHistorie(
          room_id,
          customer_id,
          duration,
          token,
        ),
      ),
    DeleteOrder: (id, token) =>
      dispatch(actionOrders.handleDeleteOrder(id, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Checkin));
