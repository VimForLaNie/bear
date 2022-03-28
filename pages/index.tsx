import type { NextPage } from 'next';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import hashCode from 'utils/hash';

import { fireAuth } from 'utils/firebase';
import { Ctx } from 'utils/Context';
import Menu from 'components/Menu';
import DisplayTransactions from 'components/displayTransaction';

const Home: NextPage = (props) => {
  const [userAuth, setUserAuth] = useState(false);
  const [userUid, setUserUid] = useState("");

  const [wallets, setWallets] = useState<wallet[]>([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [currWallet, setCurrWallet] = useState<wallet>({name : "",value : 0, transactions : []});
  const [walletNames, setWalletNames] = useState<string[]>([""]);
  

  useEffect(() => {
    const set = async () => {
      console.log("useEffect!");
      let data:wallet[];
      const cache = window.localStorage.getItem(`data:${hashCode(userUid)}`);
      if(cache === null) {
        data = (await (await (fetch(`/api/get/${userUid}`))).json()).wallets;
        window.localStorage.setItem(`data:${hashCode(userUid)}`, JSON.stringify(data));
        console.log("caching");
      }
      else{
        data = JSON.parse(cache);
        console.log("use caches");
      }
      return data;
    }
    
    if(userUid) set().then(data => {
      setWallets(data);
      setWalletNames(data.map(({name},i) => {return name;}));
      setCurrWallet(data[currIndex]);
    });
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

  if(userAuth && wallets.length){ 
    return ( 
      <>
        <Ctx.Provider value={{
          wallets : wallets,
          currWallet : currWallet,
          walletNames : walletNames,
          currIndex : currIndex,
          uid : userUid,
          setCurrIndex : setCurrIndex,
          setWallets : setWallets,
          setCurrWallet : setCurrWallet,
          setWalletNames : setWalletNames,
        }}>
          <Menu></Menu>
          <h1>{walletNames[currIndex]} : {wallets[currIndex]?.value}</h1>
          <DisplayTransactions></DisplayTransactions>
          <input 
            type="button" 
            value="logout" 
            onClick={() => fireAuth.signOut()}
          />
        </Ctx.Provider>
      </> 
    );
  }
  else {
    return (<Link href="/login">Go to Login</Link>);
  }
}

export default Home;
