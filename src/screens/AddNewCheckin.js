/* eslint-disable react/no-did-mount-set-state */
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
    Picker,
    Icon,
} from 'native-base';
import { connect } from 'react-redux';
import * as actionOrders from '../redux/actions/actionOrders';
import * as actionCustomers from '../redux/actions/actionCustomers';
import * as AuthService from '../services/AuthService';

class AddNewCheckin extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            active: false,
            roomValue: '',
            roomName: '',
            customerValue: '',
            durationValue: '',
        };
    }

    onValueChange2(value: string)
    {
        this.setState({
            customerValue: value,
        });
    }

    handleAddCheckin = async() =>
    {
        const access_token = await AuthService.storageGet('token');
        const roomValue = this.state.roomValue;
        const customerValue = this.state.customerValue;
        const durationValue = this.state.durationValue;
        if (roomValue !== '' && customerValue !== '' && durationValue !== '')
        {
            this.props.AddCheckin(roomValue, customerValue, durationValue, access_token);
            this.props.navigation.navigate('Home');
        } else
        {
            Alert.alert('Warning', 'Field is Required');
        }
    };

    async componentDidMount()
    {
        const { navigation } = this.props;
        const order = navigation.getParam('dataEdit', 'No-Item');
        const access_token = await AuthService.storageGet('token');
        await this.props.getCustomers(access_token);        
        await this.setState({ roomValue: order.id });
        await this.setState({ roomName: order.name });
    }

    render()
    {
        return (
            <Container>
                <Header style={styles.headerStyle}>
                    <Text style={styles.itemName}>New Check-In</Text>
                </Header>
                <View style={styles.viewContent}>
                    <Item floatingLabel style={styles.itemInput}>
                        <Label style={styles.textLabel}>
                            Room Name
                        </Label>
                        <Input
                            disabled
                            style={{ color: '#2f3640' }}
                            placeholder="Room"
                            value={this.state.roomName}
                        />
                    </Item>
                    <Item style={styles.itemInput}>
                        <Label style={styles.textLabel}>
                            Customer:
                        </Label>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Select Customers"
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.customerValue}
                            onValueChange={this.onValueChange2.bind(this)}
                        >
                            {
                                this.props.customersLocal.customers.map((item) =>
                                {
                                    return (
                                        <Picker.Item label={item.name} value={item.id} key={item.id} />
                                    )
                                })
                            }
                        </Picker>
                    </Item>
                    <Item floatingLabel style={styles.itemInput}>
                        <Label style={styles.textLabel}>
                            Duration
                        </Label>
                        <Input
                            style={{ color: '#2f3640' }}
                            placeholder="Duration"
                            onChangeText={text => this.setState({ durationValue: text })}
                            value={this.state.durationValue}
                        />
                    </Item>
                    <Button full success
                        style={{ borderRadius: 7, backgroundColor: '#f1c40f' }}
                        onPress={() =>
                        {
                            this.handleAddCheckin();
                        }}
                    >
                        <Text style={styles.textButton}>Check-In</Text>
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
        AddCheckin: (room_id, customer_id, duration, token) => dispatch(actionOrders.handleAddCheckin(room_id, customer_id, duration, token)),
        getCustomers: (token) => dispatch(actionCustomers.handleGetCustomers(token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddNewCheckin);
