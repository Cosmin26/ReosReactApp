/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet} from "react-native";
import {Router, Scene, Stack} from "react-native-router-flux";
import Main from "./src/containers/Main";
import ViewApartments from "./src/containers/ViewApartments";
import ContactUs from "./src/containers/ContactUs";
import {createStore} from 'redux';
import {Reducer} from './src/reducers';
import {editApartment} from "./src/actions/index";
import Provider from "react-redux/src/components/Provider";
import ApartmentDetail from "./src/containers/ApartmentDetail";

let appStore = createStore(Reducer);

console.log(appStore.getState());

let unsubscribe = appStore.subscribe(() => {
    console.log("Modified: ", appStore.getState());
});

export default class App extends Component {

    render() {
        return (
            <Provider store={appStore}>
                <Router>
                    <Scene key="root">
                        <Scene
                            key="main"
                            title="Main"
                            component={Main}
                        />
                        <Scene
                            key="viewApartments"
                            title="View Apartments"
                            component={ViewApartments}
                        />
                        <Scene
                            key="contactUs"
                            title="Contact Us"
                            component={ContactUs}
                        />
                        <Scene
                            key="apartmentDetail"
                            title="Apartment Detail"
                            component={ApartmentDetail}
                        />
                    </Scene>
                </Router>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: 'brown',
        fontWeight: 'bold'
    },
    imageBox: {
        height: 400
    }
});
