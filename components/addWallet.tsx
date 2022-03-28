import { useContext, useRef, useState } from 'react';

import { Ctx } from 'utils/Context';
import Post from 'utils/post';
import styles from 'styles/components/addWallet.module.css';
import hashCode from 'utils/hash';

const AddWallet = () => {
    const newWalletRef = useRef<HTMLInputElement>(null);
    const { wallets, setWallets, uid } = useContext(Ctx);

    const addWallet = async () => {
        let temp = wallets;
        const newWalletName = newWalletRef.current?.value || "";

        if(newWalletName == "") { return; }

        temp.push({ name : newWalletName,value : 0,transactions : [],});
    
        setWallets(temp);

        const res = (await Post(temp,uid));
        window.localStorage.setItem(`data:${hashCode(uid)}`,JSON.stringify(temp));

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