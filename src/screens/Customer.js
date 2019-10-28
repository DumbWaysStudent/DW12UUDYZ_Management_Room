/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
    Container,
    Text,
    View,
    Header,
    Fab,
    Icon,
} from 'native-base';
import { withNavigation } from 'react-navigation';
import { FlatGrid } from 'react-native-super-grid';
import { connect } from 'react-redux';
import * as actionCustomers from './../redux/actions/actionCustomers';

class Customer extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            active: false,
        };
    }
    async componentDidMount()
    {
        const {navigation} = this.props;
        const access_token = this.props.loginLocal.login.access_token;
        this.focusListener = navigation.addListener('didFocus', () =>
        {
            this.props.getCustomers(access_token);
        });
    }
    componentWillUnmount()
    {
        // Remove the event listener
        this.focusListener.remove();
    }
    onHandleEditCustomer = (item) =>
    {
        this.props.navigation.navigate('UpdateCustomer', { dataEdit: item });
    }
    render() {
        return (
            <Container>
                <Header style={styles.headerStyle}>
                    <Text style={styles.itemName}>All Customers</Text>
                </Header>
                <View style={styles.viewContent}>
                    <FlatGrid
                        itemDimension={325}
                        items={this.props.customersLocal.customers}
                        style={styles.gridView}
                        // staticDimension={300}
                        fixed
                        spacing={20}
                        renderItem={({ item, index }) => (
                            // eslint-disable-next-line react-native/no-inline-styles
                            <View style={[styles.itemContainer, { backgroundColor: '#fdcb6e' }]}>
                                <TouchableOpacity onPress={() => this.onHandleEditCustomer(item)}>
                                    <View style={{ marginStart: 15}}>
                                        <Icon name="contact" style={{ color: '#2f3640', fontSize: 75 }} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.onHandleEditCustomer(item)}>
                                    <View style={{ marginStart: 15 }}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text>{item.identity_number}</Text>
                                        <Text>{item.phone_number}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={styles.fabStyle}
                        position="bottomRight"
                        onPress={() => { this.props.navigation.navigate('AddNewCustomer'); }}>
                        <Icon name="add" style={{ color: '#2f3640' }} />
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
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        borderColor: '#2f3640',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,
        height: 100,
    },
    itemName: {
        fontSize: 25,
        color: '#2f3640',
    },
    fabStyle: {
        backgroundColor: '#f1c40f', 
        borderColor: '#2f3640',
        borderWidth: 0.3
    },
});

const mapStateToProps = state =>
{
    return {
        loginLocal: state.login,
        customersLocal: state.customers,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        getCustomers: (token) => dispatch(actionCustomers.handleGetCustomers(token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withNavigation(Customer));
