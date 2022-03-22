import type { NextApiRequest, NextApiResponse } from 'next'

import { fireStore } from 'utils/firebase';

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
    const { uid } = req.query;
    const body = await req.body;
    if(body){
        fireStore.collection('user').doc(String(uid)).update({
            wallets : body,
        })
        .then(() => {res.status(200).json(JSON.stringify("yay"));})
        .catch((err) => {res.status(405).json(JSON.stringify(err))})
    }
    else{
        res.status(405).json(JSON.stringify("empty body"));
    }
}

export default handler;