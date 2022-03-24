import { useContext, useState } from 'react';

import Post from 'utils/post';
import {userCtx, currIndexCtx, walletNamesCtx} from 'utils/Context';
import styles from 'styles/components/Transfer.module.css'

const Transfer = () => {

    const { userData, userUid, setUserData } = useContext(userCtx);
    const { currentIndex } = useContext(currIndexCtx);
    const { walletNames } = useContext(walletNamesCtx);
    const [transferTarget, setTransferTarget] = useState(0);
    const [transferAmount, setTransferAmount] = useState(0);

    const Tranfer = async () => {
        let t_data = userData;
    
        t_data[currentIndex].value -= transferAmount;

        let temp1:transaction = { 
            from : walletNames[currentIndex], 
            to : walletNames[transferTarget], 
            amount : -transferAmount, 
            date: String(new Date()) 
        };
        t_data[currentIndex].transactions.push(temp1);
    
        let newIndex = transferTarget;
        t_data[newIndex].value += transferAmount;
        let temp2:transaction = { 
            from : walletNames[currentIndex], 
            to : walletNames[transferTarget], 
            amount : transferAmount, 
            date: String(new Date()) 
        };
        t_data[newIndex].transactions.push(temp2);
    
        const res = (await Post(t_data,userUid));
    
        setUserData(t_data); 
    }

    return(
        <div className={styles.Transfer}>
        <select name="to" id="to" className="minimal" value={transferTarget} onClick={e => setTransferTarget(parseInt(e.currentTarget.value))} onChange={e => setTransferTarget(parseInt(e.currentTarget.value))}>
            {walletNames?.map((e,i) => {
              if(i != currentIndex) return <option key={i} value={i}>{e}</option>
            })}
        </select>
        <input 
            className={styles.input}
            type="text" 
            value={transferAmount} 
            onChange={e => setTransferAmount(parseInt(e.currentTarget.value))}/>
        <input 
            className={styles.button}
            type="button" 
            value="Tranfer" 
            onClick={Tranfer} 
        />
        </div>
    );
}

export default Transfer;