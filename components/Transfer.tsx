import { useContext, useRef } from 'react';

import Post from 'utils/post';
import {Ctx} from 'utils/Context';
import styles from 'styles/components/Transfer.module.css'
import hashCode from 'utils/hash';

const Transfer = () => {

    const { walletNames, currIndex, wallets, uid, setWallets, currWallet, setCurrWallet } = useContext(Ctx);
    const transferTargetRef = useRef<HTMLSelectElement>(null);
    const transferAmountRef = useRef<HTMLInputElement>(null);

    const Tranfer = async () => {
        if (transferAmountRef.current === null || transferTargetRef.current === null) { return }
        const transferAmount = parseInt(transferAmountRef.current.value);
        const transferTarget = parseInt(transferTargetRef.current.value);
        let temp = currWallet;
    
        temp.value -= transferAmount;

        let temp1:transaction = { 
            from : walletNames[currIndex], 
            to : walletNames[transferTarget], 
            amount : -transferAmount, 
            date: String(new Date()) 
        };
        temp.transactions.push(temp1);

        setCurrWallet(temp);
        setWallets([...wallets.slice(0,currIndex), temp, ...wallets.slice(currIndex +1,wallets.length)]);
    
        let target = wallets[transferTarget];

        target.value += transferAmount;
        
        let temp2:transaction = { 
            from : walletNames[currIndex], 
            to : walletNames[transferTarget], 
            amount : transferAmount, 
            date: String(new Date()) 
        };
        target.transactions.push(temp2);
        
        setWallets([...wallets.slice(0,transferTarget), target, ...wallets.slice(transferTarget +1,wallets.length)]); 

        const res = (await Post(wallets,uid));
        window.localStorage.setItem(`data:${hashCode(uid)}`,JSON.stringify(wallets));
    
        transferAmountRef.current.value = "";
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