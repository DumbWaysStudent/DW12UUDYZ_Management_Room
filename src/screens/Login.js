/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Image, Alert } from 'react-native';
import {
    Container,
    Text,
    View,
    Icon,
    Item,
    Input,
    Label,
    Button,
} from 'native-base';
import { connect } from 'react-redux';
import deviceStorage from '../services/deviceStorage';
import { AsyncStorage } from 'react-native';
import * as actionAccounts from './../redux/actions/actionAccounts';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPassword: false,
            isValidLogin: true,
            isValidEmail: true,
            emailValue: '',
            passwordValue: '',
            showToast: false,
        };
    }

    onValidateEmail = text => {
        this.setState({ emailValue: text });
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            this.setState({ isValidEmail: false });
        } else {
            this.setState({ isValidEmail: true });
        }
    };

    onValidatePassword = text => {
        this.setState({ passwordValue: text });
    };

    onShowPassword = () => {
        if (this.state.passwordValue !== '') {
            !this.state.isShowPassword ? this.setState({ isShowPassword: true }) : this.setState({ isShowPassword: false });
        }
    };

    loginUser = async() => {
        const { emailValue, passwordValue } = this.state;
        await this.props.handleLogin(emailValue, passwordValue);
        if (this.props.loginLocal.login.success === true){
            deviceStorage.saveItem('id_token', this.props.loginLocal.login.token);
            deviceStorage.saveItem('userId', this.props.loginLocal.login.userId);
            AsyncStorage.getItem('id_token', (_err, result) =>
            {
                console.log(result);
                this.props.navigation.navigate('Home');
            });
        } else {
            Alert.alert('Incorrect', 'Email or Password is Incorrect');
        }
    };

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.viewContent}>
                    <Image
                        style={{
                            width: 300,
                            height: 150,
                        }}
                        source={{ uri: 'https://i.ibb.co/ySps6bz/Bokuy-Icon.png' }}
                    />
                    <Text style={styles.textSubTitle}>
                        Already have an Account?
                        Login Now!
                    </Text>
                    <Item floatingLabel style={[styles.itemInput, !this.state.isValidEmail ? styles.textInputError : null]}>
                        <Label style={styles.textLabel}>
                            Email
                        </Label>
                        <Input
                            style={{ color:'#2f3640'}}
                            placeholder="Email"
                            autoCapitalize="none"
                            onChangeText={text => this.onValidateEmail(text)}
                            value={this.state.emailValue}
                        />
                    </Item>
                    <Item floatingLabel style={styles.itemInput2}>
                        <Label style={styles.textLabel}>Password</Label>
                        <Input
                            style={{ color: '#2f3640' }}
                            placeholder="Password"
                            autoCapitalize="none"
                            secureTextEntry={!this.state.isShowPassword ? true : false}
                            onChangeText={text => this.onValidatePassword(text)}
                            value={this.state.passwordValue}
                        />
                        <Icon
                            style={{ color:'#2f3640'}}
                            active name={!this.state.isShowPassword ? 'eye-off' : 'eye'}
                            onPress={() => {
                                this.onShowPassword();
                            }}
                        />
                    </Item>
                    <Button full success
                        style={{ borderRadius: 7, backgroundColor: '#f1c40f'}}
                        onPress={() => {
                            this.loginUser();
                        }}
                    >
                        <Text style={styles.textButton}>Log In</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'center',
    },
    viewContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitle: {
        color: '#2f3640',
        fontSize: 40,
        textAlign: 'center',
    },
    textLabel: {
        color: '#2f3640',
    },
    textSubTitle: {
        color: '#2f3640',
        fontSize: 15,
        marginTop: '5%',
        marginBottom: '10%',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textSubTitle2: {
        color: '#353b48',
        fontSize: 15,
        marginTop: '5%',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textInput: {
        fontSize: 20,
        borderWidth: 1,
    },
    textButton: {
        color: '#353b48',
    },
    itemInput: {
        marginBottom: '3%',
        width: '80%',
    },
    itemInput2: {
        marginBottom: '8%',
        width: '80%',
    },
    textInputError: {
        borderColor: 'red',
    },
});

const mapStateToProps = state => {
    return {
        loginLocal: state.login,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleLogin: (email, password) => dispatch(actionAccounts.handleLogin(email, password)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
