import { useContext, useState } from 'react';

import { userCtx } from 'utils/Context';
import Post from 'utils/post';

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
        <div>
        <input 
            type="text" 
            placeholder="name" 
            value={newWalletName} 
            onChange={e => setNewWalletName(e.currentTarget.value)}
        /> 
        <input 
            type="button" 
            value="Add!" 
            onClick={addWallet}
        />
        </div>
    );
}

export default AddWallet;