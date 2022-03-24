import { useContext } from "react";
import { currIndexCtx, walletNamesCtx } from "utils/Context";

const SetWallet = () => {
    
    const { setCurrentIndex } = useContext(currIndexCtx);
    const { walletNames } = useContext(walletNamesCtx);
    
    return (
        <div>
            <select name="name" id="name" onChange={e => setCurrentIndex(parseInt(e.currentTarget.value))} className="minimal">
            {walletNames?.map((e,i) => {
              return <option key={i} value={i}>{e}</option>
            })}
            </select>
        </div>
        
    );
}

export default SetWallet;