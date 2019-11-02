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

class Room extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            active: false,
        };
    }

    async componentDidMount()
    {
        const access_token = await AuthService.storageGet('token');
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () =>
        {
            this.props.getRooms(access_token);
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
                <Header style={styles.headerStyle}>
                    <Text style={styles.itemName}>All Rooms</Text>
                </Header>
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
                                <View style={[styles.itemContainer, { backgroundColor: '#fdcb6e' }]}>
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
                        <Icon name="add" style={{ color: '#2f3640'}} />
                    </Fab>
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
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 10,
        height: 120,
    },
    itemName: {
        fontSize: 25,
        color: '#2f3640',
    },
    fabStyle: {
        backgroundColor: '#f1c40f',
        borderColor: '#2f3640',
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
