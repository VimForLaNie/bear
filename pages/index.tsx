import type { NextPage } from 'next';
import { fireAuth, fireStore } from 'utils/firebase';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Home: NextPage = (props) => {
  const [Auth, setAuth] = useState(false);
  const [Uid, setUid] = useState("");
  const [data, setData] = useState<any>([]);
  const [amount, setAmount] = useState("");
  const [Index, setIndex] = useState(1);

  const db = fireStore.collection('user');

  useEffect(() => {
   const set = async () => {
     setData((await db.doc(String(Uid)).get()).data()?.wallets)
   }
   if(Uid) set();
  },[Uid,db]);

  fireAuth.onAuthStateChanged((user) => {
    if(user){
      setAuth(true);
      setUid(user.uid);
    }
    else{
      setAuth(false);
      setUid("");
    }
  });
  
  const addTransaction = async () => {
    const Cash = data[0];
    Cash.value += parseInt(String(amount));
    Cash.transactions = [...Cash.transactions, amount]; 
    setData([Cash]); //need fix
    db.doc(String(Uid)).update({
      wallets : data,
    }).then(() => console.log("yes"));

    setAmount(""); //reset
  }

  const rmTransaction = async () => {
    const Cash = data[0];

    let temp = Cash.transactions;
    let change = 0;
  
    if(!temp) { console.log("no"); return; }
    
    if(Index > -1) change = -temp.splice(Index - 1, 1);

    Cash.transactions = temp;
    Cash.value += change;

    setData([Cash]);
    db.doc(String(Uid)).update({
      wallets : data,
    }).then(() => console.log("yay"));
    
    setIndex(1); //reset 
  }

  if(Auth){ 
    return ( 
      <>
        <div> 
          <input type="text" id="amount" placeholder='amount' value={amount} onChange={e => setAmount(e.currentTarget.value)}></input>
          <input type="button" value="Submit" onClick={addTransaction}/>
          <input 
            type="number" 
            id="index" 
            min="1" max={data[0]?.transactions.length}
            placeholder='which one to remove' 
            value={Index} 
            onChange={e => setIndex(parseInt(e.currentTarget.value))}>
          </input>
          <input type="button" value="Send" onClick={rmTransaction}/>
        </div>
        <h1>{data[0]?.value}</h1>
        <div>
          {
            data[0]?.transactions.map((e:number,i:number)=>{
              return <p key={i}>{e}</p>
            })
          }
        </div>
        <input type="button" value="logout" onClick={() => fireAuth.signOut()}></input>
      </> 
    );
  }
  else {
    return (<Link href="/login">Go to Login</Link>);
  }
}

export default Home;
