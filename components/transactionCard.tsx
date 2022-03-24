import { FC } from "react";
import styles from 'styles/components/Card.module.css';

const Card:FC<transaction> = (props) => {

    return(
        <div className={styles.card}>
            <p>from : {props.from}</p>
            <p>to : {props.to}</p> 
            <p>for : {props.amount}</p> 
            <p>@{props.date}</p>
        </div>
    );
}

export default Card;