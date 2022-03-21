import { useState, FC } from "react";
import { useRouter } from 'next/router';
import { fireAuth, fireStore } from 'utils/firebase';

const Register:FC = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const router = useRouter();

    const register = () => {
        if(Password == cPassword){
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

export default Register;