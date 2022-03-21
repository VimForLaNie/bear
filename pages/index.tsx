import type { NextPage } from 'next';
import { fireAuth, fireStore } from 'utils/firebase';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface transaction {
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
  const [Auth, setAuth] = useState(false);
  const [Uid, setUid] = useState("");
  const [data, setData] = useState<wallet[]>([{name : "", value : 0, transactions : [{to : "", amount : 0, date : ""}]}]);
  const [amount, setAmount] = useState("");
  const [Index, setIndex] = useState(0);
  const [Names, setNames] = useState<string[]>();
  const [Rm, setRm] = useState(1);

  const db = fireStore.collection('user');

  useEffect(() => {
   const set = async () => {
     let temp:wallet[] = (await fireStore.collection('user').doc(String(Uid)).get()).data()?.wallets;
     let names = temp.map(({name}) => {return name});
     setData(temp);
     setNames(names);
   }
   if(Uid) set();
  },[Uid]);

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
    let temp:transaction = { to : "Cash", amount : parseInt(String(amount)), date: String(new Date()) };
    Cash.transactions = [...Cash.transactions, temp]; 
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
    
    if(Rm > -1) change = -temp.splice(Rm - 1, 1);

    Cash.transactions = temp;
    Cash.value += change;

    setData([Cash]);
    db.doc(String(Uid)).update({
      wallets : data,
    }).then(() => console.log("yay"));
    
    setRm(1); //reset 
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
            value={Rm} 
            onChange={e => setRm(parseInt(e.currentTarget.value))}>
          </input>
          <input type="button" value="Send" onClick={rmTransaction}/>
        </div>
        <h1>{data[0]?.value}</h1>
        <div>
          {
            data[0]?.transactions.map((e:transaction,i:number)=>{
              return <div key={i}>
                <p>to : {e.to}</p> <p> for : {e.amount}</p> <p> @{e.date}</p> <br></br>
              </div>
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
