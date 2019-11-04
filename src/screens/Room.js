/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
    Container,
    Text,
    View,
    Header,
    Fab,
    Icon,
} from 'native-base';
import { withNavigation} from 'react-navigation';
import { FlatGrid } from 'react-native-super-grid';
import { connect } from 'react-redux';
import * as actionRooms from './../redux/actions/actionRooms';
import * as AuthService from '../services/AuthService';
import Spinner from 'react-native-loading-spinner-overlay';

class Room extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            active: false,
            spinner: false,
        };
    }

    async componentDidMount()
    {
        const access_token = await AuthService.storageGet('token');
        this.setState({
            spinner: !this.state.spinner,
        });
        this.props.getRooms(access_token);
        this.setState({
            spinner: !this.state.spinner,
        });
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', async() =>
        {
            this.setState({
                spinner: !this.state.spinner,
            });
            await this.props.getRooms(access_token);
            this.setState({
                spinner: !this.state.spinner,
            });
        });
    }

    componentWillUnmount()
    {
        // Remove the event listener
        this.focusListener.remove();
    }

    onHandleEditRoom = (item) =>
    {
        this.props.navigation.navigate('UpdateRoom', { dataEdit: item });
    }

    render() {
        return (
            <Container>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <Header style={styles.headerStyle}>
                </Header>
                <View style={styles.nexHeader}>
                    <Text style={styles.heading}>Manage Room</Text>
                </View>
                <View style={styles.viewContent}>
                    <FlatGrid
                        itemDimension={120}
                        items={this.props.roomsLocal.rooms}
                        style={styles.gridView}
                        staticDimension={300}
                        fixed
                        spacing={20}
                        renderItem={({ item, index }) => (
                            // eslint-disable-next-line react-native/no-inline-styles
                            <TouchableOpacity onPress={ () => this.onHandleEditRoom(item)}>
                                <View style={[styles.itemContainer, { backgroundColor: 'white' }]}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={styles.fabStyle}
                        position="bottomRight"
                        onPress={() => this.props.navigation.navigate('AddRoom')}>
                        <Icon name="add" style={{ color: '#f5f6fa'}} />
                    </Fab>
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
    },
    gridView: {
        marginTop: 20,
        flex: 1,
    },
    itemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 10,
        height: 120,
    },
    itemName: {
        fontSize: 25,
        color: '#1e272e',
    },
    fabStyle: {
        backgroundColor: '#2196F3',
        borderColor: '#f5f6fa',
        borderWidth: 0.3,
    },
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
)(withNavigation(Room));
