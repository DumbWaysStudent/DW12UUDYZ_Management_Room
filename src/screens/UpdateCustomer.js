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


    handleEditCustomer = () =>
    {
        const { navigation } = this.props;
        const customer = navigation.getParam('dataEdit', 'No-Item');
        const access_token = this.props.loginLocal.login.access_token;
        const inputValue = this.state.inputValue;
        const identityValue = this.state.identityValue;
        const phoneValue = this.state.phoneValue;
        if (inputValue !== '' && identityValue !== '' && phoneValue !== '')
        {
            this.props.UpdateCustomer(inputValue, identityValue, phoneValue, customer.id, access_token);
            this.props.navigation.navigate('Customer');
        } else
        {
            Alert.alert('Warning', 'Field is Required');
        }
    };

    async componentDidMount() {
        const { navigation } = this.props;
        const customer = navigation.getParam('dataEdit', 'No-Item');
        await this.setState({ inputValue: customer.name });
        await this.setState({ identityValue: customer.identity_number });
        await this.setState({ phoneValue: customer.phone_number });
    }

    render()
    {
        return (
            <Container>
                <Header style={styles.headerStyle}>
                    <Text style={styles.itemName}>Update Customer</Text>
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
                            this.handleEditCustomer();
                        }}
                    >
                        <Text style={styles.textButton}>EDIT</Text>
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
        marginVertical: 10,
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
        UpdateCustomer: (name, identity_number, phone_number, id, token) => dispatch(actionCustomers.handleUpdateCustomer(name, identity_number, phone_number, id, token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddNewCustomer);
