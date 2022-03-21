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
  const [Names, setNames] = useState<string[]>([""]);
  const [Add, setAdd] = useState("");
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
    let t_data = data;

    t_data[Index].value += parseInt(String(amount));
    let temp:transaction = { to : Names[Index], amount : parseInt(String(amount)), date: String(new Date()) };
    t_data[Index].transactions.push(temp); 

    setData(t_data); 
    db.doc(String(Uid)).update({
      wallets : t_data,
    }).then(() => console.log("yes"));

    setAmount(""); //reset
  }

  const rmTransaction = async () => {
    let t_data = data; 
  
    if(!t_data[Index].transactions.length) { console.log("no"); return; }
    t_data[Index].value -= (t_data[Index].transactions.splice(Rm - 1, 1))[0].amount;;

    setData(t_data);
    db.doc(String(Uid)).update({
      wallets : t_data,
    }).then(() => console.log("yay"));
    
    setRm(1); //reset 
  }

  const addWallet = () => {
    db.doc(String(Uid)).update({
      wallets : [...data, { name : Add,value : 0,transactions : [],}]
    }).then(() => {console.log("added")});

    setData([...data, { name : Add,value : 0,transactions : [],}]);
  }

  if(Auth){ 
    return ( 
      <>
        <div> 
          <select name="name" id="name">
            {Names?.map((e,i) => {
              return <option key={i} value={i}>{e}</option>
            })}
          </select>
          <input type="text" id="amount" placeholder='amount' value={amount} onChange={e => setAmount(e.currentTarget.value)}/>
          <input type="button" value="Submit" onClick={addTransaction}/>
          <input 
            type="number" 
            id="index" 
            min="1" max={data[Index].transactions.length}
            placeholder='which one to remove' 
            value={Rm} 
            onChange={e => setRm(parseInt(e.currentTarget.value))}/>
          <input type="button" value="Send" onClick={rmTransaction}/>
        </div>
        <h1>{data[Index]?.value}</h1>
        <div>
          {
            data[Index]?.transactions.map((e:transaction,i:number)=>{
              return <div key={i}>
                <p>to : {e.to}</p> <p> for : {e.amount}</p> <p> @{e.date}</p> <br/>
              </div>
            }).reverse()
          }
        </div>
        <div>
          <input type="text" placeholder="name" value={Add} onChange={e => {setAdd(e.currentTarget.value)}}/>
          <input type="button" value="Add!" onClick={addWallet}/>
        </div>
        <input type="button" value="logout" onClick={() => fireAuth.signOut()}/>
      </> 
    );
  }
  else {
    return (<Link href="/login">Go to Login</Link>);
  }
}

export default Home;
