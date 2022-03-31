import moment from "moment-timezone";
import { FC } from "react";
import styles from 'styles/components/Card.module.css';

const Card:FC<transaction> = (props) => {

    return(
        <div className=" max-w-xl bg-blue-500 rounded-2xl p-4 m-2 self-center hover-float text-slate-50 transition-all">
            <p>from : {props.from}</p>
            <p>to : {props.to}</p> 
            <p>for : {props.amount}</p> 
            <p>@{moment.unix(props.date).tz(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`).format()}</p>
        </div>
    );
}

export default Card;