import { useContext, useRef } from 'react';

import Post from 'utils/post';
import { Ctx } from 'utils/Context';
import styles from 'styles/components/addTransaction.module.css';

const AddTransaction = () => {

    const updateAmountRef = useRef<HTMLInputElement>(null);
    const { wallets, currIndex, walletNames, setWallets, uid } = useContext(Ctx);

    const addTransaction = async () => {
        let t_data = wallets;
        const updateAmount = parseInt(updateAmountRef.current?.value || "");

        if(updateAmount == NaN) { return; } // TODO : Send error
    
        t_data[currIndex].value += updateAmount;
        let temp:transaction = { 
            from : "thin air", 
            to : walletNames[currIndex], 
            amount : updateAmount, 
            date: String(new Date()) 
        };
        t_data[currIndex].transactions.push(temp); 
    
        setWallets(t_data); 
        
        const res = (await Post(t_data,uid));
    
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