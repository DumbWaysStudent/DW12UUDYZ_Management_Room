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
    Left,
    Content,
    Icon,
} from 'native-base';
import { connect } from 'react-redux';
import * as actionCustomers from '../redux/actions/actionCustomers';
import * as AuthService from '../services/AuthService';

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


    handleEditCustomer = async() =>
    {
        const { navigation } = this.props;
        const customer = navigation.getParam('dataEdit', 'No-Item');
        const access_token = await AuthService.storageGet('token');
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
        const { goBack } = this.props.navigation;
        return (
            <Container>
                <Header style={styles.headerStyle}>
                    <Left style={{ marginStart: 10 }}><Icon onPress={() => goBack()} name="arrow-back" style={{ color: 'black' }} /></Left>
                </Header>
                <Content style={{ backgroundColor: '#d2dae2' }}>
                    <View style={styles.nexHeader}>
                        <Text style={styles.heading}>Edit Customer</Text>
                    </View>
                    <View style={styles.viewContent}>
                        <View style={styles.viewContent2}>
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
                                style={{ borderRadius: 7, backgroundColor: '#2196F3', marginTop:20, }}
                                onPress={() =>
                                {
                                    this.handleEditCustomer();
                                }}
                            >
                                <Text style={styles.textButton}>EDIT</Text>
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
        backgroundColor: 'white',
    },
    nexHeader: {
        padding: 25,
        height: 75,
        backgroundColor: 'white',
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
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 50,
        color: 'black',
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
        backgroundColor: '#2196F3',
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
