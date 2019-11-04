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
    Content,
    Left,
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
        const { goBack } = this.props.navigation;
        return (
            <Container>
                <Header style={styles.headerStyle}>
                    <Left style={{marginStart:10}}><Icon onPress={() => goBack()} name="arrow-back" style={{ color: 'black' }} /></Left>
                </Header>
                <Content style={{ backgroundColor: '#d2dae2'}}>
                    <View style={styles.nexHeader}>
                        <Text style={styles.heading}>
                            Check-In
                        </Text>
                    </View>
                    <View style={styles.viewContent}>
                        <View style={styles.viewContent2}>
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
                                    keyboardType={'numeric'}
                                    onChangeText={text => this.setState({ durationValue: text })}
                                    value={this.state.durationValue}
                                />
                            </Item>
                            <Button full success
                                style={{ borderRadius: 7, backgroundColor: '#2196F3', marginTop: 30, }}
                                onPress={() =>
                                {
                                    this.handleAddCheckin();
                                }}
                            >
                                <Text style={styles.textButton}>Check-In</Text>
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
        //backgroundColor: '#d2dae2',
        backgroundColor: 'white',
    },
    nexHeader: {
        padding: 25,
        //backgroundColor: 'black',
        height: 75,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    viewContent: {
        //backgroundColor: 'black',
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
    itemName: {
        fontSize: 25,
        color: '#2f3640',
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
