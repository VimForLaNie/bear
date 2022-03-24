import type { NextPage } from 'next';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { fireAuth } from 'utils/firebase';
import { userCtx, currIndexCtx, walletNamesCtx } from 'utils/Context';
import Menu from 'components/Menu';

const Home: NextPage = (props) => {
  const [userAuth, setUserAuth] = useState(false);
  const [userUid, setUserUid] = useState("");
  const [userData, setUserData] = useState<wallet[]>([]);

  const [walletNames, setWalletNames] = useState<string[]>([""]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const userCtxValue = { userData, userUid, setUserData };
  const currentIndexCtxValue = { currentIndex, setCurrentIndex };
  const walletNamesCtxValue = { walletNames };
  
  useEffect(() => {
    const set = async () => {
      let temp:wallet[] = (await (await (fetch(`/api/get/${userUid}`))).json()).wallets;
      if(!temp) return;
      let names = temp.map(({name},i) => {return name;});
      setUserData(temp);
      setWalletNames(names);
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
        <div>
          {
            userData[currentIndex]?.transactions.map((e:transaction,i:number)=>{
              return <div key={i}>
                <p>from : {e.from}</p><p>to : {e.to}</p> <p> for : {e.amount}</p> <p> @{e.date}</p> <br/>
              </div>
            }).reverse()
          }
        </div>
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
