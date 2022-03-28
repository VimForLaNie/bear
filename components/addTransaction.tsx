import { useContext, useRef } from 'react';

import Post from 'utils/post';
import { Ctx } from 'utils/Context';
import styles from 'styles/components/addTransaction.module.css';
import hashCode from 'utils/hash';

const AddTransaction = () => {

    const updateAmountRef = useRef<HTMLInputElement>(null);
    const { wallets, currIndex, walletNames, currWallet, setWallets, uid, setCurrWallet } = useContext(Ctx);

    const addTransaction = async () => {
        let t_data = currWallet;
        const updateAmount = parseInt(updateAmountRef.current?.value || "");

        if(updateAmount == NaN) { return; } // TODO : Send error
    
        t_data.value += updateAmount;
        let temp:transaction = { 
            from : "thin air", 
            to : walletNames[currIndex], 
            amount : updateAmount, 
            date: String(new Date()) 
        };
        t_data.transactions.push(temp); 

        setCurrWallet(t_data);
        setWallets([...wallets.slice(0,currIndex), t_data, ...wallets.slice(currIndex+1,wallets.length)]); 
        window.localStorage.setItem(`data:${hashCode(uid)}`,JSON.stringify(wallets));
        const res = (await Post(wallets,uid));
    
        if(updateAmountRef.current) { updateAmountRef.current.value = ""; }
    }

    return (
        <div className={styles.add}>
            <input 
                type="text" 
                placeholder="amount" 
                className={styles.input}
                ref={updateAmountRef}
            />
            <input 
                className={styles.button}
                type="submit" 
                value="Add" 
                onClick={addTransaction}
            />
        </div>
        
    );
}

export default AddTransaction;