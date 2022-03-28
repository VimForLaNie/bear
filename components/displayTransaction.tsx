import { useContext } from 'react';
import { Ctx } from 'utils/Context';
import styles from 'styles/components/displayTransaction.module.css';
import Card from './transactionCard';

const DisplayTransactions = () => {
    
    const { wallets, currIndex } = useContext(Ctx);

    return (
        <div className={styles.display}>
          {
            wallets[currIndex]?.transactions.map((e:transaction,i:number)=>{
              return <Card key={i} from={e.from} to={e.to} amount={e.amount} date={e.date}></Card>
            }).reverse()
          }
        </div>
    );
}

export default DisplayTransactions;