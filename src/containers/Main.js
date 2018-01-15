import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Linking} from "react-native";
import {Actions} from "react-native-router-flux";
import Sidebar from 'react-native-sidebar';
import {Button} from 'react-native-elements';
import ViewApartments from "./ViewApartments";
import { Notifications } from 'expo';
import registerForPushNotificationsAsync from "../api/registerForPushNotificationsAsync";
import Expo from 'expo';
import firebase from 'firebase';

export default class Main extends Component {
    state = {
        notification: {},
    };
    componentWillMount() {
        this._notificationSubscription = this._registerForPushNotifications();
    }
    _registerForPushNotifications() {
        // Send our push token over to our backend so we can receive notifications
        // You can comment the following line out if you want to stop receiving
        // a notification every time you open the app. Check out the source
        // for this function in api/registerForPushNotificationsAsync.js
        registerForPushNotificationsAsync();

        // Watch for incoming notifications
        this._notificationSubscription = Notifications.addListener(
            this._handleNotification
        );
    }
    _handleNotification = (notification) => {
        this.userID = firebase.auth().currentUser.uid;
        // this.props.navigation.navigate('Notifications');
        // this.setState({ notification: notification });

        firebase.database().ref('users/' + this.userID + '/notifications').push(notification.data);
    }

    render() {
        return (

            <Sidebar
                leftSidebar={
                    <View>
                    <Button
                        icon={{name: 'home'}}
                        backgroundColor='#03A9F4'
                        onPress={() => {
                            Actions.viewApartments()
                        }}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                        title='View Apartments'/>
                        <Button
                            icon={{name: 'add'}}
                            backgroundColor='#03A9F4'
                            onPress={() => {
                                if(!this.props.isAdmin){
                                    Actions.createApartment()
                                }
                            }}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                            title='Create Apartments'/>
                        <Button
                            icon={{name: 'percent'}}
                            backgroundColor='#03A9F4'
                            onPress={() => {
                                console.log(this.props.isAdmin);
                                if(this.props.isAdmin) {
                                    Actions.statistics();
                                }
                            }}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                            title='Statistics'/>
                    <Button
                        icon={{name: 'email'}}
                        backgroundColor='#03A9F4'
                        onPress={() => {
                        Actions.contactUs()
                    }}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='Contact Us' />
                    </View>
                }
                style={{flex: 1}}>
                <ViewApartments { ...this.props } />
            </Sidebar>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        // justifyContent: 'center'
    },
    contactUsBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "steelblue",
        padding: 20,
    },
    viewApartmentsBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "skyblue",
        padding: 20,
    },
    text: {
        color: '#fff'
    }
});