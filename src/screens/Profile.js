/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, View, Icon, List, ListItem, Header, Right, Left } from 'native-base';
import HeaderProfile from '../components/HeaderProfile';

const routes = [
    { id: 1, title: 'My Webtoon Creation', icon: '', nextAction: 'MyWebtoon' },
    { id: 2, title: 'Log Out', icon: '', nextAction: 'Login' },

];


class Profile extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            imageProfile: 'https://www.clipartwiki.com/clipimg/detail/248-2480210_user-staff-man-profile-person-icon-circle-png.png',
            isEditProfile: false,
            nameProfile: 'ArdiW',
        };
    }
    
    render() {
        const { imageProfile, isEditProfile, nameProfile } = this.state;
        return (
            <View style={styles.viewContent}>
                <Header style={styles.headerStyle}>
                    <Left style={{ marginStart: 10 }}><Text style={{color:'white', fontSize: 20}}>Profile</Text></Left>
                    <Right style={{ marginEnd: 10 }}><Icon name="create" style={{ color: 'white' }} 
                        onPress={() => {
                            this.props.navigation.navigate('EditProfile', {
                                imageProfile: !this.props.navigation.getParam('image')
                                    ? imageProfile
                                    : this.props.navigation.getParam('image'),
                                name: !this.props.navigation.getParam('name')
                                    ? nameProfile
                                    : this.props.navigation.getParam('name')
                            });
                        } }/>
                    </Right>
                </Header>
                <View style={{
                    alignItems: 'center',
                    marginTop: '15%',}}>
                <Image
                    style={styles.img}
                    source={{
                        uri: !this.props.navigation.getParam('image')
                            ? imageProfile
                            : this.props.navigation.getParam('image'),
                    }}
                />
                <Text style={styles.textSubTitle}>
                    {!this.props.navigation.getParam('name')
                    ? nameProfile
                    : this.props.navigation.getParam('name')}
                </Text>
                </View>
                <View>
                    <List dataArray={routes} renderRow={(data) =>
                        <ListItem onPress={() => this.props.navigation.navigate(data.nextAction)}
                    >
                            <Text style={styles.dataList}>{data.title}</Text>
                    </ListItem>} />
                </View>
            </View>
        );
    }
}

export default Profile;

const styles = StyleSheet.create({
    viewContent: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textTitle: {
        fontSize: 150,
        textAlign: 'center',
        color: 'grey',
    },
    headerStyle: {
        backgroundColor: '#3BAD87',
        color: '#3BAD87',
    },
    textSubTitle: {
        fontSize: 20,
        marginBottom: '10%',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    dataList: {
        textAlign: 'justify',
    },
    img: { height: 150, width: 150, borderRadius: 100 },
});
