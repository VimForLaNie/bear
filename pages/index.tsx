import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { fireAuth, fireStore } from 'utils/firebase';
import { useState, useEffect } from 'react';
// import { useState } from 'react';

const user = fireAuth.currentUser;

const Home: NextPage = (props) => {
  const router = useRouter();
  const [Data, setData] = useState({});

  const get = async () => {
    const res = await fetch('/api/hello');
    const data = await res.json();
    setData(data);
  }
  
  if(user){
    return(
      <div>
        data : {JSON.stringify(Data)}
        <input type="button" value="Add" onClick={get}></input>
      </div>
    )
  }
  else{
    // typeof window !== 'undefined' && router.push('/login');
    return (<></>)
  }
}

export default Home;
