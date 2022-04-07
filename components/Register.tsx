import { useRef } from "react";
import { useRouter } from 'next/router';

import { fireAuth, fireStore } from 'utils/firebase';
import Link from "next/link";

const Register = () => {
    const emaillRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const cPasswordRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const validPassword = (Password:string) => {
        if(Password.length < 8){ console.log("less than 8 characters"); return 0; }
        if(!/[a-z]/.test(Password)){ console.log("no lower cases"); return 0; }
        if(!/[A-Z]/.test(Password)){ console.log("no upper cases"); return 0; }
        if(!/\d/.test(Password)){ console.log("no numbers"); return 0; }
        
        return 1;
    }

    const register = () => {
        const Email = emaillRef.current?.value || "";
        const Password = passwordRef.current?.value || "";
        const cPassword = cPasswordRef.current?.value || "";

        if(!validPassword(Password)){ console.log(Password); console.log("invalid password"); return; } //should send errors
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
            }).then(() => { router.push('/'); });
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }
    return (
        <div className='flex flex-col self-center items-center bg-blue-300 w-80 p-4 rounded-lg'>
            <input 
                type="text" 
                id="Email" 
                ref={emaillRef}
                className="inputField"
                placeholder="Email"
            />
            <input 
                type="password" 
                id="Password" 
                ref={passwordRef}
                className="inputField"
                placeholder="Password"
            />
            <input 
                type="password" 
                id="cPassword" 
                ref={cPasswordRef}
                className="inputField"
                placeholder="Confirm Password"
            />
            <input 
                type="button" 
                value="Register" 
                onClick={register} 
                className="mdBtn hover-lightup"
            />
            <Link href="/login">Login</Link>
        </div> 
    )
}

export default Register;