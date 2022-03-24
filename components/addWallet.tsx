import { useContext, useRef, useState } from 'react';

import { userCtx } from 'utils/Context';
import Post from 'utils/post';
import styles from 'styles/components/addWallet.module.css';

const AddWallet = () => {
    
    const newWalletRef = useRef<HTMLInputElement>(null);
    const { userData, userUid, setUserData } = useContext(userCtx);

    const addWallet = async () => {
        let temp = userData;
        const newWalletName = newWalletRef.current?.value || "";

        if(newWalletName == "") { return; }

        temp.push({ name : newWalletName,value : 0,transactions : [],});
    
        setUserData(temp);

        const res = (await Post(temp,userUid));

        if(newWalletRef.current) { newWalletRef.current.value = ""; } 
    }

    return (
        <div className={styles.addWallet}>
        <input 
            className={styles.input}
            type="text" 
            placeholder="name" 
            ref={newWalletRef}
        /> 
        <input 
            className={styles.button}
            type="submit" 
            value="Add!" 
            onClick={addWallet}
        />
        </div>
    );
}

export default AddWallet;