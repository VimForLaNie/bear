import type { NextApiRequest, NextApiResponse } from 'next'
import { fireStore, fireAuth } from 'utils/firebase';

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
    const { uid } = req.query;
    const data = await fireStore.collection('user').doc(String(uid)).get();
    if(data.data()){
        res.status(200).json(data.data());
    }
    else {
        res.status(404).json(JSON.stringify("uid not found"));
    }
}

export default handler;