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
    Icon,
    Left,
    Content
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
        const { goBack } = this.props.navigation;
        return (
            <Container>
                <Header style={styles.headerStyle}>
                    <Left style={{ marginStart: 10 }}><Icon onPress={() => goBack()} name="arrow-back" style={{ color: 'black' }} /></Left>
                </Header>
                <Content style={{ backgroundColor: '#d2dae2' }}>
                    <View style={styles.nexHeader}>
                        <Text style={styles.heading}>Add Room</Text>
                    </View>
                    <View style={styles.viewContent}>
                        <View style={styles.viewContent2}>
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
                                style={{ borderRadius: 7, backgroundColor: '#2196F3', marginTop:10 }}
                                onPress={() =>
                                {
                                    this.handleEditRoom();
                                }}
                            >
                                <Text style={styles.textButton}>Edit</Text>
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
