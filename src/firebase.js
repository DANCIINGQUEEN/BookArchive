// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBNmchmxsex48Ee2YzvflWY9luvCaDskD8",
    authDomain: "book-app-2f8ca.firebaseapp.com",
    projectId: "book-app-2f8ca",
    storageBucket: "book-app-2f8ca.appspot.com",
    messagingSenderId: "630896994847",
    appId: "1:630896994847:web:8bdd50601766e570d2032a",
    measurementId: "G-TB7J5C3FP3"
};

const firebaseApp=firebase.initializeApp(firebaseConfig)
const db=firebaseApp.firestore()
const auth=firebaseApp.auth()
const storage=firebaseApp.storage()
const storageRef=storage.ref()

export {storage, storageRef, auth}
export default db