import { createContext } from 'react';

const Ctx = createContext<Ctx>({
    wallets : [],
    currWallet : {name : "", value : 0, transactions : []},
    walletNames : [],
    uid : "",
    currIndex : 0,
    setWallets : () => {},
    setCurrIndex : () => {},
    setCurrWallet : () => {},
})

export {Ctx};