import moment from "moment-timezone";
import { FC, useContext } from "react";
import { Ctx } from "utils/Context";
import hashCode from "utils/hash";
import Post from "utils/post";

interface Props {
    from : string,
    to : string,
    amount : number,
    date : number,
    index : number,
}

const Card:FC<Props> = (props) => {
    const time = moment.unix(props.date).tz(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`).toObject();

    const { currWallet, wallets, setCurrWallet, setWallets, currIndex, uid } = useContext(Ctx);

    const delTransaction = async (index:number) => {
        let temp = currWallet;
        temp.transactions.splice(index, 1);
        temp.value -= props.amount;
        setCurrWallet(temp);
        setWallets([...wallets.slice(0,currIndex), temp, ...wallets.slice(currIndex+1,wallets.length)]);

        window.localStorage.setItem(`data:${hashCode(uid)}`,JSON.stringify(wallets));
        const res = (await Post(wallets,uid));
    }

    return(
        <article 
            className=" max-w-xl bg-blue-500 rounded-2xl p-4 m-2 self-center hover-float text-slate-50 transition-all"
            onClick={() => { delTransaction(props.index) }}
        >
            <h1 style={{color : props.amount > 0 ? "green" : "red"}} className=" text-2xl" >{Math.abs(props.amount)}</h1>
            <h2>{props.from} {"-->"} {props.to}</h2>
            <h2>
                <time>{time.date}/{time.months}/{time.years}</time><br/>
                <time>{time.hours}:{time.minutes}:{time.seconds}</time>
            </h2>
        </article>
    );
}

export default Card;