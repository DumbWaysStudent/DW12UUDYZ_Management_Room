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
import * as actionHistories from '../redux/actions/actionHistories';
import * as AuthService from '../services/AuthService';

class AddNewCheckout extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            active: false,
            roomValue: '',
            roomName: '',
            customerValue: '',
            customerName: '',
            durationValue: '',
            orderId: '',            
        };
    }

    onValueChange2(value: string)
    {
        this.setState({
            customerValue: value,
        });
        console.log(this.state.customerValue);
    }

    handleAddCheckout = async() =>
    {
        const access_token = await AuthService.storageGet('token');
        const roomValue = this.state.roomValue;
        const customerValue = this.state.customerValue;
        const durationValue = this.state.durationValue;
        const orderId = this.state.orderId;
        this.props.AddHistorie(roomValue, customerValue, durationValue, access_token);
        this.props.DeleteOrder(orderId, access_token).then(()=> {
            this.props.navigation.navigate('Home');
        });
    };

    async componentDidMount()
    {
        const { navigation } = this.props;
        const order = navigation.getParam('dataEdit', 'No-Item');
        console.log(order);
        await this.setState({ roomValue: order.id });
        await this.setState({ roomName: order.name });
        await this.setState({ customerName: order.orders[0].customer.name });
        await this.setState({ customerValue: order.orders[0].customer.id });
        await this.setState({ durationValue: order.orders[0].duration });
        await this.setState({ orderId: order.orders[0].id });
    }

    render()
    {
        return (
            <Container>
                <Header style={styles.headerStyle}>
                    <Text style={styles.itemName}>{this.state.roomName} Check-Out</Text>
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
                        <Label style={styles.textLabel, { marginTop: 10 }}>
                            Customer: {this.state.customerName}
                        </Label>
                    </Item>
                    <Item floatingLabel style={styles.itemInput}>
                        <Label style={styles.textLabel}>
                            Duration
                        </Label>
                        <Input
                            disabled
                            style={{ color: '#2f3640' }}
                            value={this.state.durationValue.toString()}
                        />
                    </Item>
                    <Button full success
                        style={{ borderRadius: 7, backgroundColor: '#f1c40f' }}
                        onPress={() =>
                        {
                            this.handleAddCheckout();
                        }}
                    >
                        <Text style={styles.textButton}>Check-Out</Text>
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
        ordersLocal: state.orders,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        AddHistorie: (room_id, customer_id, duration, token) => dispatch(actionHistories.handleAddHistorie(room_id, customer_id, duration, token)),
        DeleteOrder: (id, token) => dispatch(actionOrders.handleDeleteOrder(id, token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddNewCheckout);
