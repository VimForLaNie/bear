import moment from "moment-timezone";
import { FC } from "react";

const Card:FC<transaction> = (props) => {
    const time = moment.unix(props.date).tz(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`).toObject();
    return(
        <article className=" max-w-xl bg-blue-500 rounded-2xl p-4 m-2 self-center hover-float text-slate-50 transition-all">
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