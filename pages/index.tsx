import type { NextPage } from 'next';
import { fireAuth } from 'utils/firebase';
import { useState } from 'react';
import Link from 'next/link';

const user = fireAuth.currentUser;

const Home: NextPage = (props) => {
  const [Data, setData] = useState({});
  const [Auth, setAuth] = useState(true);
  const [Uid, setUid] = useState("");

  const get = async () => {
    const res = await fetch(`/api/get/${Uid}`);
    const data = await res.json();
    setData(data);
  }
  
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

  if(Auth){
    return ( 
      <div>
        data : {JSON.stringify(Data)}
        <input type="button" value="Add" onClick={get}></input>
      </div> 
    );
  }
  else{
    return <Link href="/login">Go to Login</Link>
  }
}

export default Home;
