/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
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
import * as actionRooms from './../redux/actions/actionRooms';

class AddRoom extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            active: false,
            inputValue: '',
        };
    }


    handleAddRoom = async () =>
    {
        const access_token = this.props.loginLocal.login.access_token;
        const inputValue = this.state;
        await this.props.handleAddRoom(inputValue, access_token);
        if (this.props.roomsLocal.rooms.success === true) {
            this.props.navigation.navigate('Room');
        }
    };

    render()
    {
        return (
            <Container>
                <Header style={styles.headerStyle}>
                    <Text style={styles.itemName}>Add Room</Text>
                </Header>
                <View style={styles.viewContent}>
                    <Item floatingLabel style={styles.itemInput}>
                        <Label style={styles.textLabel}>
                            Name
                        </Label>
                        <Input
                            style={{ color: '#2f3640' }}
                            placeholder="Name"
                            autoCapitalize="none"
                            onChangeText={text => this.setState({inputValue: text})}
                            value={this.state.inputValue}
                        />
                    </Item>
                    <Button full success
                        style={{ borderRadius: 7, backgroundColor: '#f1c40f' }}
                        onPress={() =>
                        {
                            this.handleAddRoom();
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
    },
    viewContent: {
        flex: 1,
        backgroundColor: '#f5f6fa',
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
        handleAddRoom: (name, token) => dispatch(actionRooms.handleAddRooms(name, token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddRoom);
