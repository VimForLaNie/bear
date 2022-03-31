import { useContext } from 'react';
import { Ctx } from 'utils/Context';
import styles from 'styles/components/displayTransaction.module.css';
import Card from './transactionCard';

const DisplayTransactions = () => {
    
    const { currWallet } = useContext(Ctx);

    return (
        <div className="flex flex-col max-w-xl self-center">
          {
            currWallet?.transactions.map((e:transaction,i:number)=>{
              return <Card key={i} from={e.from} to={e.to} amount={e.amount} date={e.date}></Card>
            }).reverse()
          }
        </div>
    );
}

export default DisplayTransactions;