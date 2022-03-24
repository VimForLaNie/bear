import Add from './addTransaction';
import AddWallet from './addWallet';
import Transfer from './Transfer';
import SetWallet from './selectWallet';
import styles from 'styles/components/Menu.module.css';

const Menu = () => {
    return (
        <div className={styles.Menu}>
            <SetWallet></SetWallet>
            <Add></Add>
            <AddWallet></AddWallet>
            <Transfer></Transfer>
        </div>
    );
}

export default Menu;