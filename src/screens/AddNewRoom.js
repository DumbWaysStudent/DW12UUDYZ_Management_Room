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
    Content,
} from 'native-base';
import { connect } from 'react-redux';
import * as actionRooms from '../redux/actions/actionRooms';
import * as AuthService from '../services/AuthService';

class AddNewRoom extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            active: false,
            inputValue: '',
        };
    }


    handleAddRoom = async() =>
    {
        const access_token = await AuthService.storageGet('token');
        const inputValue = this.state.inputValue;
        if (inputValue !== '') {
            this.props.addRooms(inputValue, access_token);
            this.props.navigation.navigate('Room');
        } else {
            Alert.alert('Warning','Field Name is Required')
        }
    };

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
                                    Room Name
                            </Label>
                                <Input
                                    style={{ color: '#2f3640' }}
                                    placeholder="Name"
                                    autoCapitalize="none"
                                    onChangeText={text => this.setState({ inputValue: text })}
                                    value={this.state.inputValue}
                                />
                            </Item>
                            <Button full success
                                style={{ borderRadius: 7, backgroundColor: '#2196F3', marginTop: 10, }}
                                onPress={() =>
                                {
                                    this.handleAddRoom();
                                }}
                            >
                                <Text style={styles.textButton}>ADD</Text>
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
        newRoomLocal: state.newRoom,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        addRooms: (name, token) => dispatch(actionRooms.handleAddRooms(name, token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddNewRoom);
