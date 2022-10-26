import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const App = initializeApp({
    apiKey: "AIzaSyCCpHlDkBJG-liBbHqO25K7AtZCVeIm55M",
    authDomain: "firenahiaaghume.firebaseapp.com",
    projectId: "firenahiaaghume",
    storageBucket: "firenahiaaghume.appspot.com",
    messagingSenderId: "774349499411",
    appId: "1:774349499411:web:244473065f6baa298ae3e6"
});

const Auth = getAuth();
const Db = getFirestore(App);

export { App , Auth , Db }