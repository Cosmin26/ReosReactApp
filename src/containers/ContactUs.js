import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import { Linking } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

export default class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            text: ""
        }
    }

    _sendEmail() {
        let url = "mailto:";
        url += this.state.email;
        url += "?subject=";
        url += "Sal ba";
        url += "&body=";
        url += "Text from " + this.state.name + ":" + "\n" + this.state.name;
        console.log("State: ", this.state);
        console.log("URL: ", url);
        Linking.openURL(url);
    }

    render() {
        return (
            <Card title="SEND EMAIL">

                <FormLabel>Name</FormLabel>
                <FormInput onChangeText={(text) => {
                    this.setState({name: text})
                }}/>
                <FormLabel>Email</FormLabel>
                <FormInput onChangeText={(text) => {
                    this.setState({email: text})
                }}/>

                <FormLabel>Text</FormLabel>
                <FormInput placeholder="Text" onChangeText={(text) => {
                    this.setState({text: text})
                }}/>

                <Button
                    icon={{name: 'email'}}
                    backgroundColor='#03A9F4'
                    onPress={() => {
                        this._sendEmail()
                    }}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Send email'/>

            </Card>
        )
    }
}

const styles = StyleSheet.create({
    saveBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "skyblue",
        padding: 20,
    }
});