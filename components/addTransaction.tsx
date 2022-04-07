import { useContext, useRef } from 'react';
import moment from 'moment';

import Post from 'utils/post';
import { Ctx } from 'utils/Context';
import hashCode from 'utils/hash';


const AddTransaction = (props:{mode : boolean}) => {
    const postive = props.mode ? 1 : -1;
    const updateAmountRef = useRef<HTMLInputElement>(null);
    const { wallets, currIndex, walletNames, currWallet, setWallets, uid, setCurrWallet } = useContext(Ctx);

    const addTransaction = async () => {
        let t_data = currWallet;
        const updateAmount = postive*Math.abs(parseInt(updateAmountRef.current?.value || ""));

        if(updateAmount == NaN) { return; } // TODO : Send error
    
        t_data.value += updateAmount;
        let temp:transaction = { 
            from : "thin air", 
            to : walletNames[currIndex], 
            amount : updateAmount, 
            date: moment().unix() 
        };
        t_data.transactions.push(temp); 

        setCurrWallet(t_data);
        setWallets([...wallets.slice(0,currIndex), t_data, ...wallets.slice(currIndex+1,wallets.length)]); 
        window.localStorage.setItem(`data:${hashCode(uid)}`,JSON.stringify(wallets));
        const res = (await Post(wallets,uid));
    
        if(updateAmountRef.current) { updateAmountRef.current.value = ""; }
    }

    return (
        <div className="flex flex-row">
            <input 
                type="text" 
                placeholder="amount" 
                className="inputField"
                ref={updateAmountRef}
                style={{color : props.mode ? "green" : "red"}}
            />
            <input 
                className="smBtn"
                type="submit" 
                value="Add" 
                onClick={addTransaction}
            />
        </div>
        
    );
}

export default AddTransaction;