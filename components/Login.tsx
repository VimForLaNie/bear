import { useRef, useState } from "react";
import { useRouter } from 'next/router';

import { fireAuth } from 'utils/firebase';
import styles from 'styles/components/Login.module.css'
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
        <div className={styles.login}>
            <input 
                className={styles.input}
                id="email"
                type="text" 
                ref={emailRef}
                placeholder="Email"
            />
            <input 
                className={styles.input}
                id="password" 
                type="password" 
                ref={passwordRef}
                placeholder="Password"
            />
            <input 
                className={styles.button}
                type="submit" 
                value="Login" 
                onClick={login}
            />
            <Link href="/register">Register</Link>        
        </div> 
    )
}

export default Login;