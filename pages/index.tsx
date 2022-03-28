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
  const [walletNames, setWalletNames] = useState<string[]>([""]);
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    const set = async () => {
      console.log("useEffect!");
      const cache = window.localStorage.getItem(`data:${hashCode(userUid)}`);
      if(cache === null) {
        let temp:wallet[] = (await (await (fetch(`/api/get/${userUid}`))).json()).wallets;
        let names = temp.map(({name},i) => {return name;});
        window.localStorage.setItem(`data:${hashCode(userUid)}`, JSON.stringify(temp));
        setWallets(temp);
        setWalletNames(names);
        console.log("caching");
      }
      else{
        let data:wallet[] = JSON.parse(cache);
        setWallets(data);
        setWalletNames(data.map(({name},i) => { return name;}));
        console.log("use caches");
      }
    }
    
    if(userUid) set();
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
          walletNames : walletNames,
          currIndex : currIndex,
          uid : userUid,
          setCurrIndex : setCurrIndex,
          setWallets : setWallets,
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
