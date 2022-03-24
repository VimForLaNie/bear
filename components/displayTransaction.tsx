import { useContext } from 'react';
import { currIndexCtx, userCtx } from 'utils/Context';
import styles from 'styles/components/displayTransaction.module.css';
import Card from './transactionCard';

const DisplayTransactions = () => {
    
    const { userData } = useContext(userCtx);
    const { currentIndex } = useContext(currIndexCtx);

    return (
        <div className={styles.display}>
          {
            userData[currentIndex]?.transactions.map((e:transaction,i:number)=>{
              return <Card key={i} from={e.from} to={e.to} amount={e.amount} date={e.date}></Card>
            }).reverse()
          }
        </div>
    );
}

export default DisplayTransactions;