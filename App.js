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
import {applyMiddleware, createStore} from 'redux';
import { Actions } from 'react-native-router-flux';
import Provider from "react-redux/src/components/Provider";
import ApartmentDetail from "./src/containers/ApartmentDetail";
import reducers from './src/reducers/index';
import Login from "./src/containers/Login";
import * as firebase from 'firebase';
import thunk from 'redux-thunk';
import CreateApartment from "./src/containers/CreateApartment";
import Statistics from "./src/containers/Statistics";
// let appStore = createStore(Reducer);
//
// console.log(appStore.getState());
//
// let unsubscribe = appStore.subscribe(() => {
//     console.log("Modified: ", appStore.getState());
// });

// const middleware = applyMiddleware(thunk, createLogger());
// export const store = createStore(reducer, middleware);

export default class App extends Component {

    componentWillMount() {
        const config = {
            apiKey: "AIzaSyBXO96LalV3mqvBsUp2Ckj9aoJ4uddDdWA",
            authDomain: "reos-react.firebaseapp.com",
            databaseURL: "https://reos-react.firebaseio.com",
            projectId: "reos-react",
            storageBucket: "reos-react.appspot.com",
            messagingSenderId: "868288949384"
        };
        firebase.initializeApp(config);
    }

    loadCreateForm() {
        Actions.createApartments();
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(thunk));
        return (
            <Provider store={store}>
                <Router>
                    <Scene key="root">
                        <Scene key='login' component={Login} title='Please login' />
                        <Scene
                            key="main"
                            title="Main"
                            component={Main}
                        />
                        <Scene
                            key="viewApartments"
                            title="View Apartments"
                            component={ViewApartments}
                            onRight={ this.loadCreateForm.bind(this) }
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
                        <Scene
                            key="createApartment"
                            title="Add Apartment"
                            component={CreateApartment}
                        />
                        <Scene
                            key="statistics"
                            title="View Statistics"
                            component={Statistics}
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