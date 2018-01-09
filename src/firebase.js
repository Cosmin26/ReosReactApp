import * as firebase from 'firebase';
// should go in a secret file
const config = {
    apiKey: "AIzaSyBXO96LalV3mqvBsUp2Ckj9aoJ4uddDdWA",
    authDomain: "reos-react.firebaseapp.com",
    databaseURL: "https://reos-react.firebaseio.com",
    projectId: "reos-react",
    storageBucket: "reos-react.appspot.com",
    messagingSenderId: "868288949384"
};
firebase.initializeApp(config);

export default firebase;