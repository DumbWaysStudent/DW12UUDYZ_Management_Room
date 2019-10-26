/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
    Container,
    Text,
    View,
    Header,
} from 'native-base';

class Home extends Component {
    render() {
        return (
            <Container>
                <Header style={styles.headerStyle}>
                    <Text style={styles.itemName}>Custom Here</Text>
                </Header>
                <View style={styles.viewContent}>
                    <Text style={styles.textTitle}>LOGED IN</Text>
                    <Text style={styles.textSubTitle}>
                        Login Success
                    </Text>
                </View>
            </Container>
        );
    }
}

export default Home;

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
});
