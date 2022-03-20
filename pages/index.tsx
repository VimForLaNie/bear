import type { NextPage } from 'next';
import { fireAuth, fireStore } from 'utils/firebase';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const user = fireAuth.currentUser;

const Home: NextPage = (props) => {
  const [Auth, setAuth] = useState(true);
  const [Uid, setUid] = useState("");
  const [data, setData] = useState<any>();
  const [amount, setAmount] = useState("");
  const [Index, setIndex] = useState("-1");

  useEffect(() => {
   const set = async () => {
     setData((await fireStore.collection('user').doc(String(Uid)).get()).data())
   }
   if(Uid) set();
  },[Uid,data]);

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
    fireStore.collection('user').doc(String(Uid)).update({
      value : parseInt(data?.value) + parseInt(String(amount)),
      transactions : [...(data?.transactions || []),amount],
    }).then(() => console.log("yes"));

    setAmount(""); //reset
  }

  const rmTransaction = async () => {
    let temp = data?.transactions;
    console.log(temp);
    if(!temp) { console.log("fuck"); return; }
    const i = parseInt(Index);
    if(i !== NaN && i > -1) temp.splice(i - 1, 1)
    // setData(temp);
    fireStore.collection('user').doc(String(Uid)).update({
      transactions : temp,
    }).then(() => console.log("yay"));

    setIndex(""); //reset 
  }

  if(Auth){
    return ( 
      <>
        <div> 
          <input type="text" id="amount" placeholder='amount' value={amount} onChange={e => setAmount(e.currentTarget.value)}></input>
          <input type="button" value="Submit" onClick={addTransaction}/>
          <input type="text" id="index" placeholder='which one to remove' value={Index} onChange={e => setIndex(e.currentTarget.value)}></input>
          <input type="button" value="Send" onClick={rmTransaction}/>
        </div>
        <div>
          {
            data?.transactions.map((e:number,i:number)=>{
              return <p key={i}>{e}</p>
            }).reverse()
          }
        </div>
      </> 
    );
  }
  else{
    return (<Link href="/login">Go to Login</Link>);
  }
}

export default Home;
