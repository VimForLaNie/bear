import type { NextPage } from 'next';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { fireAuth } from 'utils/firebase';

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

const Home: NextPage = (props) => {
  const [userAuth, setUserAuth] = useState(false);
  const [userUid, setUserUid] = useState("");
  const [userData, setUserData] = useState<wallet[]>([]);
  const [walletNames, setWalletNames] = useState<string[]>([""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [removeIndex, setRemoveIndex] = useState(1);
  const [newWalletName, setNewWalletName] = useState("");
  const [updateAmount, setUpdateAmount] = useState(0);
  const [transferTarget, setTransferTarget] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  
  const Post = async (data:wallet[]) => {
    fetch(`/api/post/${userUid}`, {
      method: 'POST', 
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'force-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
  }

  useEffect(() => {
   const set = async () => {
     let temp:wallet[] = (await (await (fetch(`/api/get/${userUid}`))).json()).wallets;
     if(!temp) return;
     let names = temp.map(({name},i) => {return name;});
     setUserData(temp);
     setWalletNames(names);
   }
   if(userUid) set();
  });

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
  
  const addTransaction = async () => {
    let t_data = userData;

    t_data[currentIndex].value += updateAmount;
    let temp:transaction = { from : "thin air", to : walletNames[currentIndex], amount : parseInt(String(updateAmount)), date: String(new Date()) };
    t_data[currentIndex].transactions.push(temp); 

    const res = (await Post(t_data));

    setUserData(t_data); 
    setUpdateAmount(0); //reset
  }

  const rmTransaction = async () => {
    let t_data = userData; 
  
    if(!t_data[currentIndex].transactions.length) { console.log("no"); return; }
    t_data[currentIndex].value -= (t_data[currentIndex].transactions.splice(removeIndex - 1, 1))[0].amount;;

    const res = (await Post(t_data));
  
    setUserData(t_data);
    setRemoveIndex(1); //reset 
  }

  const addWallet = async () => {
    let temp = userData;
    temp.push({ name : newWalletName,value : 0,transactions : [],});

    const res = (await Post(temp));

    setUserData(temp);
  }

  const Tranfer = async () => {
    let t_data = userData;

    t_data[currentIndex].value -= transferAmount;
    let temp1:transaction = { 
      from : walletNames[currentIndex], 
      to : walletNames[transferTarget], 
      amount : -transferAmount, 
      date: String(new Date()) 
    };
    t_data[currentIndex].transactions.push(temp1);

    let newIndex = transferTarget;
    t_data[newIndex].value += transferAmount;
    let temp2:transaction = { 
      from : walletNames[currentIndex], 
      to : walletNames[transferTarget], 
      amount : transferAmount, 
      date: String(new Date()) 
    };
    t_data[newIndex].transactions.push(temp2);

    const res = (await Post(t_data));

    setUserData(t_data); 
  }

  if(userAuth && userData.length){ 
    return ( 
      <>
        <div> 
          <select name="name" id="name" onChange={e => setCurrentIndex(parseInt(e.currentTarget.value))}>
            {walletNames?.map((e,i) => {
              return <option key={i} value={i}>{e}</option>
            })}
          </select>
          <input 
            type="number" 
            placeholder="amount" 
            value={updateAmount} 
            onChange={e => setUpdateAmount(parseInt(e.currentTarget.value))}
          />
          <input 
            type="button" 
            value="Submit" 
            onClick={addTransaction}
          />
          <input 
            type="number" 
            min="1" max={userData[currentIndex].transactions.length}
            placeholder='which one to remove' 
            value={removeIndex} 
            onChange={e => setRemoveIndex(parseInt(e.currentTarget.value))}
          />
          <input 
            type="button" 
            value="Send" 
            onClick={rmTransaction}
          />
        </div>
        <h1>{userData[currentIndex]?.value}</h1>
        <div>
          {
            userData[currentIndex]?.transactions.map((e:transaction,i:number)=>{
              return <div key={i}>
                <p>from : {e.from}</p><p>to : {e.to}</p> <p> for : {e.amount}</p> <p> @{e.date}</p> <br/>
              </div>
            }).reverse()
          }
        </div>
        <div>
          <input 
            type="text" 
            placeholder="name" 
            value={newWalletName} 
            onChange={e => setNewWalletName(e.currentTarget.value)}/> 
          <input 
            type="button" 
            value="Add!" 
            onClick={addWallet}
          />
        </div>
        <div>
          <select name="to" id="to" value={transferTarget} onClick={e => setTransferTarget(parseInt(e.currentTarget.value))} onChange={e => setTransferTarget(parseInt(e.currentTarget.value))}>
            {walletNames?.map((e,i) => {
              if(i != currentIndex) return <option key={i} value={i}>{e}</option>
            })}
          </select>
          <input 
            type="number" 
            value={transferAmount} 
            onChange={e => setTransferAmount(parseInt(e.currentTarget.value))}/>
          <input 
            type="button" 
            value="Tranfer" 
            onClick={Tranfer} 
          />
        </div>
        <input 
          type="button" 
          value="logout" 
          onClick={() => fireAuth.signOut()}
        />
      </> 
    );
  }
  else {
    return (<Link href="/login">Go to Login</Link>);
  }
}

export default Home;
