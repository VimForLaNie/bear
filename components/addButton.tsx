import { useState } from "react";

const AddButton = () => {
    const [Popup, setPopup] = useState(false);

    const transactionModalRef = document.querySelector('#tran-modal');
    const walletModalRef = document.querySelector('#wallet-modal');
    const transferModalRef = document.querySelector('#transfer-modal');

    const showModal = (index:number) => {
        switch(index){
            case 1:
                if(transactionModalRef == null) return;
                transactionModalRef.showModal();
                break;
            case 2:
                if(walletModalRef == null) return;
                walletModalRef.showModal();
                break;
            case 3:
                if(transferModalRef == null) return;
                transferModalRef.showModal();
                break;
            default:
                console.log("no index");
                break;
        }
    }

    return (
        <div className="fixed right-10 bottom-10 flex flex-col w-32">
            { Popup && 
            <div className="flex flex-col items-start">
                <button className="p-2 m-2 bg-slate-400 hover:bg-slate-300 transition" onClick={() => {showModal(1); setPopup(!Popup)}}>Add Transaction</button>
                <button className="p-2 m-2 bg-slate-400 hover:bg-slate-300 transition" onClick={() => {showModal(2); setPopup(!Popup)}}>Add Wallet</button>
                <button className="p-2 m-2 bg-slate-400 hover:bg-slate-300 transition" onClick={() => {showModal(3); setPopup(!Popup)}}>Transfer</button>
            </div>
            }
            <button 
            className="rounded-full w-32 bg-blue-500 h-32 text-center text-6xl hover-lightup"
            onClick={() => {setPopup(!Popup)}}
            >
                <span data-text="+"></span>{/* + svg plus icon */}
            </button>
        </div>
        
    );
}

export default AddButton;