import { useContext, useState } from 'react';

import Post from 'utils/post';
import {userCtx, currIndexCtx, walletNamesCtx} from 'utils/Context';

const RemoveTransaction = () => {

    const [removeIndex, setRemoveIndex] = useState(1);
    const { userData, userUid, setUserData } = useContext(userCtx);
    const { currentIndex } = useContext(currIndexCtx);
    const { walletNames } = useContext(walletNamesCtx);

    const rmTransaction = async () => {
        let t_data = userData; 
      
        if(!t_data[currentIndex].transactions.length) { console.log("no"); return; }
        t_data[currentIndex].value -= (t_data[currentIndex].transactions.splice(removeIndex - 1, 1))[0].amount;;
    
        const res = (await Post(t_data,userUid));
      
        setUserData(t_data);
        setRemoveIndex(1); //reset 
    }

    return (
        <div>
        <input 
            type="number" 
            min="1" max={userData[currentIndex].transactions.length}
            placeholder='which one to remove' 
            value={removeIndex} 
            onChange={e => setRemoveIndex(parseInt(e.currentTarget.value))}
          />
          <input 
            type="button" 
            value="Delete" 
            onClick={rmTransaction}
          />
        </div>
    );
}

export default RemoveTransaction;