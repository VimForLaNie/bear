import { createContext } from 'react';

const Ctx = createContext<Ctx>({
    wallets : [],
    walletNames : [],
    uid : "",
    currIndex : 0,
    setWallets : () => {},
    setCurrIndex : () => {},
})

export {Ctx};