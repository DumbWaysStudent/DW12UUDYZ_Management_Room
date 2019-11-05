/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
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
    Left,
    Content,
    Icon,
} from 'native-base';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import * as actionCustomers from '../redux/actions/actionCustomers';
import * as AuthService from '../services/AuthService';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import moment from 'moment';

const firebaseConfig = {
    apiKey: 'AIzaSyD1FvI4dGL9-crIcCuUOEgnX-eylFWTL8c',
    authDomain: 'bokuy-18dee.firebaseapp.com',
    databaseURL: 'https://bokuy-18dee.firebaseio.com',
    projectId: 'bokuy-18dee',
    storageBucket: 'bokuy-18dee.appspot.com',
    messagingSenderId: '113900530437',
    appId: '1:113900530437:web:e13ab1f8438311d384256c',
    measurementId: 'G-FC71MNNJD0',
};
// Initialize Firebase
if (!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig);
}

class AddNewCustomer extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            active: false,
            spinner: false,
            inputValue: '',
            identityValue: '',
            phoneValue: '',
            imageProfile: '',
        };
    }


    handleEditCustomer = async() =>
    {
        const { navigation } = this.props;
        const customer = navigation.getParam('dataEdit', 'No-Item');
        const access_token = await AuthService.storageGet('token');
        const inputValue = this.state.inputValue;
        const identityValue = this.state.identityValue;
        const phoneValue = this.state.phoneValue;
        const imageProfile = this.state.imageProfile;
        if (inputValue !== '' && identityValue !== '' && phoneValue !== '')
        {
            this.props.UpdateCustomer(inputValue, identityValue, phoneValue, imageProfile, customer.id,access_token);
            this.props.navigation.navigate('Customer');
        } else
        {
            Alert.alert('Warning', 'Field is Required');
        }
    };

    handleEditPhoto = () =>
    {
        let dateNow = moment().format();
        let imageName = moment(dateNow, 'YYYY-MM-DD-hh:mm:ss');
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, res =>
        {
            const Blob = RNFetchBlob.polyfill.Blob;
            const fs = RNFetchBlob.fs;
            window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
            window.Blob = Blob;
            if (res.didCancel)
            {
                alert('Edit Poto Canceled');
            } else if (res.error)
            {
                console.log(res.error);
                alert('Response Erorr');
            } else if (res.customButton)
            {
                console.log(res.customButton);
            } else
            {
                this.setState({
                    spinner: !this.state.spinner,
                });
                const sourceImage = res.uri;
                const image = sourceImage;

                const Blob = RNFetchBlob.polyfill.Blob;
                const fs = RNFetchBlob.fs;
                window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
                window.Blob = Blob;

                let uploadBlob = null;
                const imageRef = firebase.storage().ref('posts').child(imageName + '.jpg');
                let mime = 'image/jpg';
                fs.readFile(image, 'base64').then((data) =>
                {
                    return Blob.build(data, { type: `${mime};BASE64` });
                }).then((blob) =>
                {
                    uploadBlob = blob;
                    return imageRef.put(blob, { contentType: mime });
                }).then(() =>
                {
                    uploadBlob.close();
                    return imageRef.getDownloadURL();
                }).then((url) =>
                {
                    // URL of the image uploaded on Firebase storage
                    this.setState({ imageProfile: url });
                    console.log(url);
                    this.setState({
                        spinner: !this.state.spinner,
                    });
                })
                    .catch((error) =>
                    {
                        console.log(error);

                    });
            }
        });
    };

    async componentDidMount() {
        const { navigation } = this.props;
        const customer = navigation.getParam('dataEdit', 'No-Item');
        await this.setState({ inputValue: customer.name });
        await this.setState({ identityValue: customer.identity_number });
        await this.setState({ phoneValue: customer.phone_number });
        await this.setState({ imageProfile: customer.image });
    }

    render()
    {
        console.disableYellowBox = true;
        const { imageProfile } = this.state;
        const { goBack } = this.props.navigation;
        return (
            <Container>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <Header style={styles.headerStyle}>
                    <Left style={{ marginStart: 10 }}><Icon onPress={() => goBack()} name="arrow-back" style={{ color: 'black' }} /></Left>
                </Header>
                <Content style={{ backgroundColor: '#d2dae2' }}>
                    <View style={styles.nexHeader}>
                        <Text style={styles.heading}>Edit Customer</Text>
                    </View>
                    <View style={styles.viewContent}>
                        <View style={styles.viewContent2}>
                            <Item floatingLabel style={styles.itemInput}>
                                <Label style={styles.textLabel}>
                                    Name
                                </Label>
                                <Input
                                    style={{ color: '#2f3640' }}
                                    placeholder="Name"
                                    onChangeText={text => this.setState({ inputValue: text })}
                                    value={this.state.inputValue}
                                />
                            </Item>
                            <Item floatingLabel style={styles.itemInput}>
                                <Label style={styles.textLabel}>
                                    Identity Number
                                </Label>
                                <Input
                                    style={{ color: '#2f3640' }}
                                    placeholder="Identity Number"
                                    onChangeText={text => this.setState({ identityValue: text })}
                                    value={this.state.identityValue}
                                />
                            </Item>
                            <Item floatingLabel style={styles.itemInput}>
                                <Label style={styles.textLabel}>
                                    Phone Number
                                </Label>
                                <Input
                                    style={{ color: '#2f3640' }}
                                    placeholder="Phone Number"
                                    onChangeText={text => this.setState({ phoneValue: text })}
                                    value={this.state.phoneValue}
                                />
                            </Item>
                            <Image
                                style={styles.avatar}
                                source={{
                                    uri: imageProfile,
                                }}
                            />
                            <TouchableOpacity onPress={() => this.handleEditPhoto()}>
                                <Icon name="camera" />
                            </TouchableOpacity>
                            <Button full success
                                style={{ borderRadius: 7, backgroundColor: '#2196F3', marginTop:20, }}
                                onPress={() =>
                                {
                                    this.handleEditCustomer();
                                }}
                            >
                                <Text style={styles.textButton}>EDIT</Text>
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF',
    },
    avatar: {
        borderRadius: 75,
        width: 50,
        height: 50,
    },
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
        UpdateCustomer: (name, identity_number, phone_number, image, id, token) => dispatch(actionCustomers.handleUpdateCustomer(name, identity_number, phone_number, image, id, token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddNewCustomer);
