/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, Icon, List, ListItem, Header } from 'native-base';
import { connect } from 'react-redux';
import * as actionRooms from './../redux/actions/actionRooms';
import * as AuthService from '../services/AuthService';

const routes = [
    { id: 1, title: 'Log Out', icon: '', nextAction: 'Login' },
];


class Setting extends Component
{
    async componentDidMount()
    {
        const access_token = this.props.loginLocal.login.access_token;
        await this.props.getRooms(access_token);
    }
    onLogout = async() =>
    {
        await AuthService.stroageDestroy();
        this.props.navigation.navigate('Login');
    };
    onGetName = async () =>
    {
        const UserName = await AuthService.storageGet('name');
        return UserName;
    };
    render()
    {
        return (
            <View style={styles.viewContent}>
                <Header style={styles.headerStyle}>
                    <Text style={styles.itemName}>Setting</Text>
                </Header>
                <View style={{
                    alignItems: 'center',
                    marginTop: '15%',
                }}>
                    <Icon name="contact" style={{ color: '#2f3640', fontSize: 150 }} />
                    <Text style={styles.textSubTitle}>{ this.onGetName.UserName}</Text>
                </View>
                <View>
                    <List dataArray={routes} renderRow={(data) =>
                        <ListItem
                            onPress={() => {
                                this.onLogout();
                            }}
                            keyExtractor={item => item.id}
                        >
                            <Text style={styles.dataList}>{data.title}</Text>
                        </ListItem>} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewContent: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textTitle: {
        fontSize: 150,
        textAlign: 'center',
        color: 'grey',
    },
    headerStyle: {
        alignItems: 'center',
        backgroundColor: '#f1c40f',
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
        color: '#2f3640',
    },
    img: { height: 150, width: 150, borderRadius: 100 },
});

const mapStateToProps = state =>
{
    return {
        loginLocal: state.login,
        roomsLocal: state.rooms,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        getRooms: (token) => dispatch(actionRooms.handleGetRooms(token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Setting);