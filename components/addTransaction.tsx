import { useContext, useRef } from 'react';

import Post from 'utils/post';
import {userCtx, currIndexCtx, walletNamesCtx} from 'utils/Context';
import styles from 'styles/components/addTransaction.module.css';

const AddTransaction = () => {

    const updateAmountRef = useRef<HTMLInputElement>(null);
    const { userData, userUid, setUserData } = useContext(userCtx);
    const { currentIndex } = useContext(currIndexCtx);
    const { walletNames } = useContext(walletNamesCtx);

    const addTransaction = async () => {
        let t_data = userData;
        const updateAmount = parseInt(updateAmountRef.current?.value || "");

        if(updateAmount == NaN) { return; } // TODO : Send error
    
        t_data[currentIndex].value += updateAmount;
        let temp:transaction = { 
            from : "thin air", 
            to : walletNames[currentIndex], 
            amount : updateAmount, 
            date: String(new Date()) 
        };
        t_data[currentIndex].transactions.push(temp); 
    
        setUserData(t_data); 
        
        const res = (await Post(t_data,userUid));
    
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