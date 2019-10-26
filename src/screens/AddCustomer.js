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
} from 'native-base';
import { FlatGrid } from 'react-native-super-grid';
import { connect } from 'react-redux';
import * as actionRooms from './../redux/actions/actionRooms';

class AddCustomer extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            active: false,
            inputValue: '',
        };
    }
    async componentDidMount()
    {
        const nameUpdate = this.state.inputValue;
        const access_token = this.props.loginLocal.login.access_token;
        await this.props.addRoom(nameUpdate, access_token);
    }
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
                            Email
                        </Label>
                        <Input
                            style={{ color: '#2f3640' }}
                            placeholder="Email"
                            autoCapitalize="none"
                            onChangeText={text => this.setState({ inputValue: text })}
                            value={this.state.inputValue}
                        />
                    </Item>
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
        roomsLocal: state.rooms,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        addRoom: (name, token) => dispatch(actionRooms.handleAddRooms(name, token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddCustomer);
