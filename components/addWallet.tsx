import { useContext, useRef, useState } from 'react';

import { Ctx } from 'utils/Context';
import Post from 'utils/post';
import styles from 'styles/components/addWallet.module.css';
import hashCode from 'utils/hash';

const AddWallet = () => {
    const newWalletRef = useRef<HTMLInputElement>(null);
    const { wallets, setWallets, uid, walletNames, setWalletNames } = useContext(Ctx);

    const addWallet = async () => {
        const newWalletName = newWalletRef.current?.value || "";

        if(newWalletName == "") { return; }
    
        setWallets([...wallets, { name : newWalletName,value : 0,transactions : [],}]);
        setWalletNames([...walletNames, newWalletName]);

        const res = (await Post(wallets,uid));
        window.localStorage.setItem(`data:${hashCode(uid)}`,JSON.stringify(wallets));

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