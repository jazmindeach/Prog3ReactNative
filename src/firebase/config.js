import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA73LQ1gAqcnNSPR8XINyVAV8qTstaAW4A",
    authDomain: "tpreactnative-4da07.firebaseapp.com",
    projectId: "tpreactnative-4da07",
    storageBucket: "tpreactnative-4da07.appspot.com",
    messagingSenderId: "930047109682",
    appId: "1:930047109682:web:d48d19a1c0faa16c13ea2b"
  };


app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();