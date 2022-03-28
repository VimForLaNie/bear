import { useContext, useRef } from 'react';

import Post from 'utils/post';
import {Ctx} from 'utils/Context';
import styles from 'styles/components/Transfer.module.css'

const Transfer = () => {

    const { walletNames, currIndex, wallets, uid, setWallets } = useContext(Ctx);
    const transferTargetRef = useRef<HTMLSelectElement>(null);
    const transferAmountRef = useRef<HTMLInputElement>(null);

    const Tranfer = async () => {
        if (transferAmountRef.current === null || transferTargetRef.current === null) { return }
        const transferAmount = parseInt(transferAmountRef.current.value);
        const transferTarget = parseInt(transferTargetRef.current.value);
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
        <select name="to" id="to" className="minimal" ref={transferTargetRef}>
            {walletNames?.map((e,i) => {
              if(i != currIndex) return <option key={i} value={i}>{e}</option>
            })}
        </select>
        <input 
            className={styles.input}
            type="text" 
            ref={transferAmountRef}
        />
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