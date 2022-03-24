import { useState } from "react";
import { useRouter } from 'next/router';

import { fireAuth, fireStore } from 'utils/firebase';
import styles from 'styles/components/Register.module.css';
import Link from "next/link";

const Register = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const router = useRouter();

    const validPassword = () => {
        if(!/[a-z]/.test(Password)){ console.log("no lower cases"); return 0; }
        if(!/[A-Z]/.test(Password)){ console.log("no upper cases"); return 0; }
        if(!/\d/.test(Password)){ console.log("no numbers"); return 0; }
        if(Password.length < 8){ console.log("less than 8 characters"); return 0; }
    
        return 1;
    }

    const register = () => {
        if(!validPassword()){ console.log(Password); console.log("invalid password"); return; } //should send errors
        if(Password != cPassword){ console.log("your password is not the same!"); return; }

        fireAuth.createUserWithEmailAndPassword(Email, Password)
        .then((userCredential) => {
            const user = userCredential.user;
            fireStore.collection('user').doc(user?.uid).set({
                //Data
                wallets : [{
                    name : "Cash",
                    value : 0, 
                    transactions : [],
                }]
            });
            router.push('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }
    return (
        <div className={styles.register}>
            <label htmlFor="Email" className={styles.label}>Email</label>
            <input 
                type="text" 
                id="Email" 
                value={Email} 
                onChange={(e) => setEmail(e.currentTarget.value)} 
                className={styles.input}
                placeholder="Email"
            />
            <label htmlFor="Password" className={styles.label}>Password</label>
            <input 
                type="password" 
                id="Password" 
                value={Password} 
                onChange={(e) => setPassword(e.currentTarget.value)} 
                className={styles.input}
                placeholder="Password"
            />
            <label htmlFor="cPassword" className={styles.label}>Confirm Password</label>
            <input 
                type="password" 
                id="cPassword" 
                value={cPassword} 
                onChange={(e) => setCPassword(e.currentTarget.value)} 
                className={styles.input}
                placeholder="Confirm Password"
            />
            <input type="button" value="Register" onClick={register} className={styles.button}></input>
            <Link href="/login">Login</Link>
        </div> 
    )
}

export default Register;