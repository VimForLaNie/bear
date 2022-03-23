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
    interface userContext {
        userData : wallet[],
        userUid : string,
        setUserData(data:wallet[]): void,
    }
}