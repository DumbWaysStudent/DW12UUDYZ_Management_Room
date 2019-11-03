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
import * as actionRooms from '../redux/actions/actionRooms';
import * as AuthService from '../services/AuthService';

class UpdateRoom extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            active: false,
            inputValue: '',
        };
    }


    handleEditRoom = async() =>
    {
        const { navigation } = this.props;
        const room = navigation.getParam('dataEdit', 'No-Item');
        //console.log(room);
        const access_token = await AuthService.storageGet('token');
        const inputValue = this.state.inputValue;
        if (inputValue !== '')
        {
            this.props.UpdateRoom(inputValue, room.id, access_token);
            this.props.navigation.navigate('Room');
        } else
        {
            Alert.alert('Warning', 'Field Name is Required');
        }
    };

    async componentDidMount()
    {
        const { navigation } = this.props;
        const room = navigation.getParam('dataEdit', 'No-Item');
        await this.setState({ inputValue: room.name });
    }

    render()
    {
        return (
            <Container>
                <Header style={styles.headerStyle}>
                    <Text style={[styles.itemName, { color: '#f5f6fa' }]}>Edit Room</Text>
                </Header>
                <View style={styles.viewContent}>
                    <Item floatingLabel style={styles.itemInput}>
                        <Label style={styles.textLabel}>
                            Name
                        </Label>
                        <Input
                            style={{ color: '#2f3640' }}
                            onChangeText={text => this.setState({ inputValue: text })}
                            value={this.state.inputValue}
                        />
                    </Item>
                    <Button full success
                        style={{ borderRadius: 7, backgroundColor: '#2196F3' }}
                        onPress={() =>
                        {
                            this.handleEditRoom();
                        }}
                    >
                        <Text style={styles.textButton}>Edit</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    headerStyle: {
        alignItems: 'center',
        backgroundColor: '#2196F3',
    },
    viewContent: {
        flex: 1,
        backgroundColor: '#d2dae2',
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
        backgroundColor: '#2196F3',
        borderColor: '#2f3640',
        borderWidth: 0.3,
    },
    itemInput: {
        marginTop: '5%',
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
        roomsLocal: state.rooms,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        UpdateRoom: (name, id, token) => dispatch(actionRooms.handleUpdateRoom(name, id, token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UpdateRoom);
