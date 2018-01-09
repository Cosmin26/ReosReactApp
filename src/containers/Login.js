import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {Card} from "./common/Card";
import {CardItem} from "./common/CardItem";
import {Input} from "./common/Input";
import {Spinner} from "./common/Spinner";
import {loginUser, emailChanged, passwordChanged} from "../actions";
// import firebase from 'firebase';

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        alignSelf: 'center',
        fontSize: 20,
    },
});

class Login extends Component {

    constructor(props) {
        super(props);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onLoginPress = this.onLoginPressed.bind(this);
    }

    onEmailChange(email) {
        this.props.emailChanged(email);
    }

    onPasswordChange(password) {
        this.props.passwordChanged(password);
    }

    onLoginPressed() {
        const { email, password } = this.props;
        // firebase.auth().signInWithEmailAndPassword(email, password)
        //     .then(() => { this.setState({ error: '', loading: false }); })
        //     .catch(() => {
        //         //Login was not successful, let's create a new account
        //         firebase.auth().createUserWithEmailAndPassword(email, password)
        //             .then(() => { this.setState({ error: 'mumu', loading: false }); })
        //             .catch(() => {
        //                 this.setState({ error: 'Authentication failed.', loading: false });
        //             });
        //     });
        this.props.loginUser({ email, password });
    }

    renderLoginButton() {
        if (this.props.loading) {
            return <Spinner />;
        }
        return (<Button title="Login" text="login" onPress={this.onLoginPress} />);
    }

    render() {
        const { errorText } = styles;
        return (
            <Card>
                <CardItem>
                    <Input
                        placeholder="Enter your email"
                        autoCorrect={false}
                        label="Email"
                        value={this.props.email}
                        onChangeText={this.onEmailChange}
                    />
                </CardItem>
                <CardItem>
                    <Input
                        secureTextEntry
                        placeholder="Enter your password"
                        autoCorrect={false}
                        label="Password"
                        value={this.props.password}
                        onChangeText={this.onPasswordChange}
                    />
                </CardItem>
                <Text style={errorText}>
                    { this.props.error }
                </Text>
                { this.renderLoginButton() }
            </Card>
        );
    }
}

// This is the state of global app and not state of your Component
const mapStateToProps = (state) => {
    const { email, password, error, user, loading } = state.auth;
    return {
        email,
        password,
        error,
        user,
        loading,
    };
};

export default connect(mapStateToProps, {
    loginUser,
    emailChanged,
    passwordChanged
})(Login);