import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Linking} from "react-native";
import {Actions} from "react-native-router-flux";
import Sidebar from 'react-native-sidebar';
import {Button} from 'react-native-elements';
import ViewApartments from "./ViewApartments";

export default class Main extends Component {
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
                                Actions.createApartment()
                            }}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                            title='Create Apartments'/>
                        <Button
                            icon={{name: 'percent'}}
                            backgroundColor='#03A9F4'
                            onPress={() => {
                                Actions.statistics()
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
                <ViewApartments/>
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