import { useState, FC } from "react";
import { useRouter } from 'next/router';
import { fireAuth } from 'utils/firebase';

const Login:FC = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const router = useRouter();

    const login = () => {
        fireAuth.signInWithEmailAndPassword(Email, Password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Make sure we're in the browser
            router.push('/');
            console.log("yes");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }
    return (
        <div className="login">
            <input type="text" id="Email" value={Email} onChange={(e) => setEmail(e.currentTarget.value)}></input>
            <input type="password" id="Password" value={Password} onChange={(e) => setPassword(e.currentTarget.value)}></input>
            <input type="button" value="Login" onClick={login}></input>
        </div> 
    )
}

export default Login;