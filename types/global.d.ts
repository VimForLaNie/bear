import { Dispatch, SetStateAction } from "react";

export {};

declare global {
    interface transaction {
        from : string,
        to : string,
        amount : number,
        date : number,
    }
    interface wallet {
        name : string,
        value : number,
        transactions : transaction[],
    }
    interface Ctx {
        wallets : wallet[],
        currWallet : wallet,
        uid : string,
        currIndex : number,
        walletNames : string[],

        setWallets : Dispatch<SetStateAction<wallet[]>>,
        setCurrIndex : Dispatch<SetStateAction<number>>,
        setCurrWallet : Dispatch<SetStateAction<wallet>>,
        setWalletNames : Dispatch<SetStateAction<string[]>>,
    }
}