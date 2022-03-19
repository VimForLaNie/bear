import { useState, FC } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter} from 'next/router';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const Login:FC = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const router = useRouter();

    const register = () => {
        if(Password == cPassword){
            createUserWithEmailAndPassword(auth, Email, Password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // Make sure we're in the browser
                if (typeof window !== 'undefined') {
                  router.push('/');
                }
                console.log("yes");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
        }
        else{
            console.log("!!!!!!!!!!!");
        }
    }
    return (
        <div className="login">
            <input type="text" id="Email" value={Email} onChange={(e) => setEmail(e.currentTarget.value)}></input>
            <input type="password" id="Password" value={Password} onChange={(e) => setPassword(e.currentTarget.value)}></input>
            <input type="password" id="cPassword" value={cPassword} onChange={(e) => setCPassword(e.currentTarget.value)}></input>
            <input type="button" value="Register" onClick={register}></input>
        </div> 
    )
}

export default Login;