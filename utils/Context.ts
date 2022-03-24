import { createContext } from 'react';

const userCtx = createContext<userContext>({
    userData: [],
    userUid: "",
    setUserData: () => {}
});

const currIndexCtx = createContext<currIndexContext>({
    currentIndex: 0,
    setCurrentIndex: () => {}
});

const walletNamesCtx = createContext<{walletNames : string[]}>({
    walletNames : [],
});

export {userCtx, currIndexCtx, walletNamesCtx};