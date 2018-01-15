import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    EMAIL_CHANGED,
    PASSWORD_CHANGED
} from './types';
import * as types from "./types";

const loginUserSuccess = (dispatch, user, isAdmin) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    Actions.main({isAdmin: isAdmin});
};

const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL,
    });
};

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text,
    };
};

export const passwordChanged = (password) => {
    return {
        type: PASSWORD_CHANGED,
        payload: password,
    };
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user =>{
                firebase.database().ref(`/admins/email`)
                    .on('value', snapshot => {
                        if(snapshot.val() === email){
                            loginUserSuccess(dispatch, user, true);
                        } else {
                            loginUserSuccess(dispatch, user, false)
                        }
                    });

            })
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => loginUserSuccess(dispatch, user, false))
                    .catch(() => {
                        loginUserFail(dispatch);
                        console.log(email);
                        console.log(password);
                    });
            });
    };
};