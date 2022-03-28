import { useContext, useRef } from "react";
import { Ctx } from "utils/Context";

const SetWallet = () => {
    const { setCurrIndex, walletNames } = useContext(Ctx);
    
    return (
        <div>
            <select 
                name="name" 
                id="name" 
                onChange={(e) => {setCurrIndex(parseInt(e.currentTarget.value))}} 
                className="minimal">
                    {walletNames?.map((e,i) => {
                    return <option key={i} value={i}>{e}</option>
                    })}
            </select>
        </div>
        
    );
}

export default SetWallet;