/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import
{
    Container,
    Text,
    View,
    Header,
} from 'native-base';
import { withNavigation } from 'react-navigation';
import { FlatGrid } from 'react-native-super-grid';
import { connect } from 'react-redux';
import * as actionOrders from './../redux/actions/actionOrders';


class Checkin extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            active: false,
        };
    }
    async componentDidMount()
    {
        const access_token = this.props.loginLocal.login.access_token;
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () =>
        {
            this.props.getOrders(access_token);
        });
    }

    componentWillUnmount()
    {
        // Remove the event listener
        this.focusListener.remove();
    }

    onCheckIn = (item) =>
    {
        //this.props.navigation.navigate('CheckinAdd', { dataEdit: item })
        Alert.alert(item.name);
    }
    onCheckOut = (item) =>
    {
        //this.props.navigation.navigate('CheckinAdd', { dataEdit: item })
        Alert.alert(item.name);
    }
    render()
    {
        return (
            <Container>
                <Header style={styles.headerStyle}>
                    <Text style={styles.itemName}>Checkin Room</Text>
                </Header>
                <View style={styles.viewContent}>
                    <FlatGrid
                        itemDimension={120}
                        items={this.props.ordersLocal.orders}
                        style={styles.gridView}
                        staticDimension={300}
                        fixed
                        spacing={20}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={item.is_booked == true ? () => this.onCheckOut(item) : () => this.onCheckIn(item)}>
                                <View style={[styles.itemContainer, { backgroundColor: item.is_booked == true ? '#7f8c8d' : '#fdcb6e' }]}>
                                    <Text style={styles.itemName}>{item.name}</Text>
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
        ordersLocal: state.orders,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        getOrders: (token) => dispatch(actionOrders.handleGetOrders(token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withNavigation(Checkin));
