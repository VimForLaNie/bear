import { useContext, useState } from 'react';

import Post from 'utils/post';
import {Ctx} from 'utils/Context';
import styles from 'styles/components/Transfer.module.css'

const Transfer = () => {

    const { walletNames, currIndex, wallets, uid, setWallets } = useContext(Ctx);
    const [transferTarget, setTransferTarget] = useState(0);
    const [transferAmount, setTransferAmount] = useState(0);

    const Tranfer = async () => {
        let t_data = wallets;
    
        t_data[currIndex].value -= transferAmount;

        let temp1:transaction = { 
            from : walletNames[currIndex], 
            to : walletNames[transferTarget], 
            amount : -transferAmount, 
            date: String(new Date()) 
        };
        t_data[currIndex].transactions.push(temp1);
    
        let newIndex = transferTarget;
        t_data[newIndex].value += transferAmount;
        let temp2:transaction = { 
            from : walletNames[currIndex], 
            to : walletNames[transferTarget], 
            amount : transferAmount, 
            date: String(new Date()) 
        };
        t_data[newIndex].transactions.push(temp2);
    
        const res = (await Post(t_data,uid));
    
        setWallets(t_data); 
    }

    return(
        <div className={styles.Transfer}>
        <select name="to" id="to" className="minimal" value={transferTarget} onClick={e => setTransferTarget(parseInt(e.currentTarget.value))} onChange={e => setTransferTarget(parseInt(e.currentTarget.value))}>
            {walletNames?.map((e,i) => {
              if(i != currIndex) return <option key={i} value={i}>{e}</option>
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