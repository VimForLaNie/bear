import { useRef } from "react";
import { useRouter } from 'next/router';

import { fireAuth } from 'utils/firebase';
import Link from "next/link";

const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const login = () => {
        const Email = emailRef.current?.value || "";
        const Password = passwordRef.current?.value || "";

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
        <div className="flex flex-col self-center items-center bg-blue-300 w-80 p-4 rounded-lg">
            <input 
                className="inputField"
                id="email"
                type="text" 
                ref={emailRef}
                placeholder="Email"
            />
            <input 
                className="inputField"
                id="password" 
                type="password" 
                ref={passwordRef}
                placeholder="Password"
            />
            <input 
                className="mdBtn hover-lightup"
                type="submit" 
                value="Login" 
                onClick={login}
            />
            <Link href="/register">Register</Link>        
        </div> 
    )
}

export default Login;