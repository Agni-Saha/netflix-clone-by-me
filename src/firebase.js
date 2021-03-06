import firebase from "firebase";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.EACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { auth }
export default db