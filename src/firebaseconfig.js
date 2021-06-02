import firebase from 'firebase'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCUvTHnSagPu2plO2b5JMZBlGIrXWJ8DtA",
    authDomain: "go-market-26026.firebaseapp.com",
    databaseURL: "https://go-market-26026-default-rtdb.firebaseio.com",
    projectId: "go-market-26026",
    storageBucket: "go-market-26026.appspot.com",
    messagingSenderId: "474169910993",
    appId: "1:474169910993:web:b917a3aa7b7b9549c147f0",
    measurementId: "G-S0L4XKYQST"
}

//Initialize firebase
const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth();

export {auth}