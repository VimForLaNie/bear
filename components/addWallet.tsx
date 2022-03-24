import { useContext, useState } from 'react';

import { userCtx } from 'utils/Context';
import Post from 'utils/post';
import styles from 'styles/components/addWallet.module.css';

const AddWallet = () => {
    
    const [ newWalletName, setNewWalletName ] = useState("");
    const { userData, userUid, setUserData } = useContext(userCtx);

    const addWallet = async () => {
        let temp = userData;
        temp.push({ name : newWalletName,value : 0,transactions : [],});
    
        const res = (await Post(temp,userUid));
    
        setUserData(temp);
    }

    return (
        <div className={styles.addWallet}>
        <input 
            className={styles.input}
            type="text" 
            placeholder="name" 
            value={newWalletName} 
            onChange={e => setNewWalletName(e.currentTarget.value)}
        /> 
        <input 
            className={styles.button}
            type="button" 
            value="Add!" 
            onClick={addWallet}
        />
        </div>
    );
}

export default AddWallet;