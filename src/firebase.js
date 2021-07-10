import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBZ2N-Zhs0l-iwHJqJkSu-WNC63I9T5anE",
    authDomain: "netflix-clone-build-2c71e.firebaseapp.com",
    projectId: "netflix-clone-build-2c71e",
    storageBucket: "netflix-clone-build-2c71e.appspot.com",
    messagingSenderId: "1082141376735",
    appId: "1:1082141376735:web:87f09a8acde9b29275e96a"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { auth }
export default db