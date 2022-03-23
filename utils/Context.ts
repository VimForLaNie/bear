import { createContext } from 'react';

const userCtx = createContext<userContext>({
    userData: [],
    userUid: "",
    setUserData: () => {}
});

const currIndexCtx = createContext({
    currentIndex: 0,
});

const walletNamesCtx = createContext<{walletNames : string[]}>({
    walletNames : [],
});

export {userCtx, currIndexCtx, walletNamesCtx};