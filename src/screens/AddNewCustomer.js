/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import
{
    Container,
    Text,
    View,
    Header,
    Item,
    Label,
    Input,
    Button,
} from 'native-base';
import { connect } from 'react-redux';
import * as actionCustomers from '../redux/actions/actionCustomers';

class AddNewCustomer extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            active: false,
            inputValue: '',
            identityValue: '',
            phoneValue: '',
        };
    }


    handleNewCustomer = () =>
    {
        const access_token = this.props.loginLocal.login.access_token;
        const inputValue = this.state.inputValue;
        const identityValue = this.state.identityValue;
        const phoneValue = this.state.phoneValue;
        if (inputValue !== '' || identityValue !== '' || phoneValue !== '')
        {
            this.props.AddNewCustomer(inputValue, identityValue, phoneValue, access_token);
            this.props.navigation.navigate('Customer');
        } else
        {
            Alert.alert('Warning', 'Field is Required');
        }
    };

    render()
    {
        return (
            <Container>
                <Header style={styles.headerStyle}>
                    <Text style={styles.itemName}>Add New Customer</Text>
                </Header>
                <View style={styles.viewContent}>
                    <Item floatingLabel style={styles.itemInput}>
                        <Label style={styles.textLabel}>
                            Name
                        </Label>
                        <Input
                            style={{ color: '#2f3640' }}
                            placeholder="Name"
                            onChangeText={text => this.setState({ inputValue: text })}
                            value={this.state.inputValue}
                        />
                    </Item>
                    <Item floatingLabel style={styles.itemInput}>
                        <Label style={styles.textLabel}>
                            Identity Number
                        </Label>
                        <Input
                            style={{ color: '#2f3640' }}
                            placeholder="Identity Number"
                            onChangeText={text => this.setState({ identityValue: text })}
                            value={this.state.identityValue}
                        />
                    </Item>
                    <Item floatingLabel style={styles.itemInput}>
                        <Label style={styles.textLabel}>
                            Phone Number
                        </Label>
                        <Input
                            style={{ color: '#2f3640' }}
                            placeholder="Phone Number"
                            onChangeText={text => this.setState({ phoneValue: text })}
                            value={this.state.phoneValue}
                        />
                    </Item>
                    <Button full success
                        style={{ borderRadius: 7, backgroundColor: '#f1c40f' }}
                        onPress={() =>
                        {
                            this.handleNewCustomer();
                        }}
                    >
                        <Text style={styles.textButton}>ADD</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    headerStyle: {
        alignItems: 'center',
        backgroundColor: '#f1c40f',
        marginBottom: 10,
    },
    viewContent: {
        flex: 1,
        backgroundColor: '#ffff',
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
    itemInput: {
        marginBottom: '3%',
        width: '80%',
    },
    textLabel: {
        color: '#2f3640',
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
        AddNewCustomer: (name, identity, phone, token) => dispatch(actionCustomers.handleAddCustomer(name, identity, phone, token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddNewCustomer);
