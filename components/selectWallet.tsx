import { useContext } from "react";
import { Ctx } from "utils/Context";

const SetWallet = () => {
    const { setCurrIndex, walletNames, setCurrWallet, wallets } = useContext(Ctx);
    
    const update = (index:number) => {
        setCurrIndex(index);
        setCurrWallet(wallets[index]);
    }

    return (
        <div>
            <select 
                name="name" 
                id="name" 
                onChange={(e) => {update(parseInt(e.currentTarget.value))}} 
                className="minimal">
                    {walletNames?.map((e,i) => {
                    return <option key={i} value={i}>{e}</option>
                    })}
            </select>
        </div>
        
    );
}

export default SetWallet;