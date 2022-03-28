export {};

declare global {
    interface transaction {
        from : string,
        to : string,
        amount : number,
        date : string,
    }
    interface wallet {
        name : string,
        value : number,
        transactions : transaction[],
    }
    interface Ctx {
        wallets : wallet[],
        uid : string,
        currIndex : number,
        walletNames : string[],

        setWallets(data:wallet[]) : void,
        setCurrIndex(newIndex:number) : void,
    }
}