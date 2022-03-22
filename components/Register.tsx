import { useState } from "react";
import { useRouter } from 'next/router';

import { fireAuth, fireStore } from 'utils/firebase';

const reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$");

const validPassword = (p:string) => {
    return reg.test(p) ? 1 : 0;
}

const Register = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const router = useRouter();

    const register = () => {
        if(!validPassword(Password)){ return; } //should send errors
        if(Password != cPassword){ return; }

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
        <div className="register">
            <input type="text" id="Email" value={Email} onChange={(e) => setEmail(e.currentTarget.value)}></input>
            <input type="password" id="Password" value={Password} onChange={(e) => setPassword(e.currentTarget.value)}></input>
            <input type="password" id="cPassword" value={cPassword} onChange={(e) => setCPassword(e.currentTarget.value)}></input>
            <input type="button" value="Register" onClick={register}></input>
        </div> 
    )
}

export default Register;