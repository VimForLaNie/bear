// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi_NUH440we0phFtuHg7xOJAAblp9ot1I",
  authDomain: "glowing-anagram-344508.firebaseapp.com",
  projectId: "glowing-anagram-344508",
  storageBucket: "glowing-anagram-344508.appspot.com",
  messagingSenderId: "157287566102",
  appId: "1:157287566102:web:a8a9e8f137103477e71e37"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

const fireAuth = firebase.auth();

export { fireAuth }