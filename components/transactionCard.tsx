import moment from "moment-timezone";
import { FC } from "react";
import styles from 'styles/components/Card.module.css';

const Card:FC<transaction> = (props) => {

    return(
        <div className={styles.card}>
            <p>from : {props.from}</p>
            <p>to : {props.to}</p> 
            <p>for : {props.amount}</p> 
            <p>@{moment.unix(props.date).tz(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`).format()}</p>
        </div>
    );
}

export default Card;