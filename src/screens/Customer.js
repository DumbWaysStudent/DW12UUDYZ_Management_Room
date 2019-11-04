/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
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
import * as AuthService from '../services/AuthService';
import Spinner from 'react-native-loading-spinner-overlay';

class Customer extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            active: false,
            spinner: false,
        };
    }
    async componentDidMount()
    {
        const {navigation} = this.props;
        const access_token = await AuthService.storageGet('token');
        this.setState({
            spinner: !this.state.spinner,
        });
        this.props.getCustomers(access_token);
        this.setState({
            spinner: !this.state.spinner,
        });
        this.focusListener = navigation.addListener('didFocus', async () =>
        {
            this.setState({
                spinner: !this.state.spinner,
            });
            await this.props.getCustomers(access_token);
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
    onHandleEditCustomer = (item) =>
    {
        this.props.navigation.navigate('UpdateCustomer', { dataEdit: item });
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
                    <Text style={styles.heading}>Manage Customer</Text>
                </View>
                <View style={styles.viewContent}>
                    <FlatGrid
                        itemDimension={200}
                        items={this.props.customersLocal.customers}
                        style={styles.gridView}
                        //staticDimension={300}
                        // fixed
                        // spacing={20}
                        renderItem={({ item, index }) => (
                            // eslint-disable-next-line react-native/no-inline-styles
                            <View style={[styles.itemContainer, { backgroundColor: 'white' }]}>
                                <TouchableOpacity onPress={() => this.onHandleEditCustomer(item)}>
                                    <View style={{ marginStart: 15}}>
                                        <Image
                                            style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 30,
                                            }}
                                            source={{ uri: item.image == null ? 'https://i.ibb.co/mbnN5qR/person-icon.png' : item.image }}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.onHandleEditCustomer(item)}>
                                    <View style={{ marginStart: 15 }}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={{fontSize: 12}}>{item.identity_number}</Text>
                                        <Text style={{ fontSize: 12 }}>{item.phone_number}</Text>
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
                        <Icon name="add" style={{ color: '#f5f6fa' }} />
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
        height: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        //backgroundColor: '#d2dae2',
        backgroundColor: '#2196F3',
    },
    nexHeader: {
        padding: 25,
        //backgroundColor: 'black',
        height: 125,
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
        marginBottom: 20,
        flex: 1,
    },
    itemContainer: {
        marginBottom: -10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        height: 90,
        width: 600,
        borderBottomColor: '#1e272e',
        borderBottomWidth: 0.5,
    },
    itemName: {
        fontSize: 20,
        color: '#1e272e',
        fontWeight: 'bold',
    },
    fabStyle: {
        backgroundColor: '#2196F3',
        borderColor: '#f5f6fa',
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
