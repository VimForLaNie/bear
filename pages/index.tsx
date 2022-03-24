import type { NextPage } from 'next';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import crypto from 'crypto';

import { fireAuth } from 'utils/firebase';
import { userCtx, currIndexCtx, walletNamesCtx } from 'utils/Context';
import Menu from 'components/Menu';
import DisplayTransactions from 'components/displayTransaction';

const Home: NextPage = (props) => {
  const [userAuth, setUserAuth] = useState(false);
  const [userUid, setUserUid] = useState("");
  const [userData, setUserData] = useState<wallet[]>([]);

  const [walletNames, setWalletNames] = useState<string[]>([""]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const userCtxValue = { userData, userUid, setUserData };
  const currentIndexCtxValue = { currentIndex, setCurrentIndex };
  const walletNamesCtxValue = { walletNames };
  
  const hashCode = (str:string) => {
    return str.split('').reduce((prevHash, currVal) => (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
  }

  useEffect(() => {
    const set = async () => {
      const cache = window.localStorage.getItem(`data:${hashCode(userUid)}`);
      if(cache === null) {
        let temp:wallet[] = (await (await (fetch(`/api/get/${userUid}`))).json()).wallets;
        let names = temp.map(({name},i) => {return name;});
        window.localStorage.setItem(`data:${hashCode(userUid)}`, JSON.stringify(temp));
        setUserData(temp);
        setWalletNames(names);
        console.log("caching");
      }
      else{
        let data:wallet[] = JSON.parse(cache);
        setUserData(data);
        setWalletNames(data.map(({name},i) => { return name;}));
        console.log("use caches");
      }
    }
    
    if(userUid) set();
    console.log("useEffect!");
   },[userUid]);

  fireAuth.onAuthStateChanged((user) => {
    if(user){
      setUserAuth(true);
      setUserUid(user.uid);
    }
    else{
      setUserAuth(false);
      setUserUid("");
    }
  });

  if(userAuth && userData.length){ 
    return ( 
      <>
      <userCtx.Provider value={userCtxValue}>
      <currIndexCtx.Provider value={currentIndexCtxValue}>
      <walletNamesCtx.Provider value={walletNamesCtxValue}>
        <Menu></Menu>
        <h1>{walletNames[currentIndex]} : {userData[currentIndex]?.value}</h1>
        <DisplayTransactions></DisplayTransactions>
        <input 
          type="button" 
          value="logout" 
          onClick={() => fireAuth.signOut()}
        />
      </walletNamesCtx.Provider>
      </currIndexCtx.Provider>
      </userCtx.Provider> 
      </> 
    );
  }
  else {
    return (<Link href="/login">Go to Login</Link>);
  }
}

export default Home;
