/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Text,
  View,
  Icon,
  Header,
  Container,
  Content,
  Button,
} from 'native-base';
import {connect} from 'react-redux';
import * as actionRooms from './../redux/actions/actionRooms';
import * as AuthService from '../services/AuthService';

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }
  async componentDidMount() {
    const UserName = await AuthService.storageGet('name');
    this.setState({
      userName: UserName,
    });
  }
  onLogout = async () => {
    await AuthService.stroageDestroy();
    this.props.navigation.navigate('Login');
  };
  onGetName = async () => {
    const UserName = await AuthService.storageGet('name');
    return UserName;
  };

  render() {
    AuthService.storageGet('name', (req, res) => {
      console.log(res);
    });
    return (
      <Container>
        <Header style={styles.headerStyle} />
        <Content style={{backgroundColor: '#d2dae2'}}>
          <View style={styles.nexHeader}>
            <Text style={styles.heading}>Setting</Text>
          </View>
          <View style={styles.viewContent}>
            <View style={styles.viewContent2}>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: '15%',
                }}>
                <Icon
                  name="contact"
                  style={{color: '#2196F3', fontSize: 150}}
                />
                <Text style={styles.textSubTitle}>{this.state.userName}</Text>
              </View>
              <Button
                full
                success
                style={{borderRadius: 7, backgroundColor: '#2196F3'}}
                onPress={() => {
                  this.onLogout();
                }}>
                <Text style={styles.textButton}>Log-Out</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  nexHeader: {
    padding: 25,
    height: 75,
    backgroundColor: '#2196F3',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  viewContent: {
    backgroundColor: '#d2dae2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContent2: {
    padding: 25,
    borderRadius: 15,
    marginTop: 75,
    height: 350,
    width: 250,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 50,
    color: 'white',
  },
  textTitle: {
    fontSize: 150,
    textAlign: 'center',
    color: 'grey',
  },
  textSubTitle: {
    fontSize: 20,
    marginBottom: '10%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dataList: {
    textAlign: 'center',
  },
  itemName: {
    fontSize: 25,
    color: '#f5f6fa',
  },
  img: {height: 150, width: 150, borderRadius: 100},
});

const mapStateToProps = state => {
  return {
    loginLocal: state.login,
    roomsLocal: state.rooms,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRooms: token => dispatch(actionRooms.handleGetRooms(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setting);
