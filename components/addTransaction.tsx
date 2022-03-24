import { createContext, useState, useContext } from 'react';

import Post from 'utils/post';
import {userCtx, currIndexCtx, walletNamesCtx} from 'utils/Context';
import styles from 'styles/components/addTransaction.module.css';

const AddTransaction = () => {

    const [ updateAmount, setUpdateAmount ] = useState(0);
    const { userData, userUid, setUserData } = useContext(userCtx);
    const { currentIndex } = useContext(currIndexCtx);
    const { walletNames } = useContext(walletNamesCtx);

    const addTransaction = async () => {
        let t_data = userData;
    
        t_data[currentIndex].value += updateAmount;
        let temp:transaction = { 
            from : "thin air", 
            to : walletNames[currentIndex], 
            amount : updateAmount, 
            date: String(new Date()) 
        };
        t_data[currentIndex].transactions.push(temp); 
    
        const res = (await Post(t_data,userUid));
    
        if(setUserData) setUserData(t_data); 
        setUpdateAmount(0); //reset
    }

    return (
        <div className={styles.add}>
            <input 
                type="text" 
                placeholder="amount" 
                className={styles.input}
                value={updateAmount} 
                onChange={e => setUpdateAmount(parseInt(e.currentTarget.value))}
            />
            <input 
                className={styles.button}
                type="button" 
                value="Add" 
                onClick={addTransaction}
            />
        </div>
        
    );
}

export default AddTransaction;