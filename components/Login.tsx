import { useState } from "react";
import { useRouter } from 'next/router';

import { fireAuth } from 'utils/firebase';
import styles from 'styles/components/Login.module.css'

const Login = () => {
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
        <div className={styles.login}>
            <label htmlFor="email" className={styles.label}>
                Email
            </label>
            <input 
                className={styles.input}
                id="email"
                type="text" 
                value={Email} 
                onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <label htmlFor="password" className={styles.label}>
                Password
            </label>
            <input 
                className={styles.input}
                id="password" 
                type="password" 
                value={Password} 
                onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <input 
                className={styles.button}
                type="button" 
                value="Login" 
                onClick={login}
            />    
        </div> 
    )
}

export default Login;