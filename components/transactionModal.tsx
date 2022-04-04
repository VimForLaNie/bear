import { useRef, useState } from "react";
import AddTransaction from "./addTransaction";

const TransactionModal = () => {
    const ModalRef = document.querySelector('#modal');
    const checkBoxRef = useRef<HTMLInputElement>(null);
    const [Postive, setPostive] = useState(true);

    const closeModal = () => {
        if(ModalRef == null) return;
        console.log("close");
        ModalRef.close();
    }

    return (
        <dialog id="modal" className="max-w-fit h-32">
            <button className=" absolute top-0 right-0 p-2 m-1" onClick={closeModal}><span data-text="X"></span></button>
            <div className="m-2 p-2 bg-slate-300 flex flex-row">
                <label className="switch">
                    <input type="checkbox" ref={checkBoxRef} onChange={() => setPostive(!Postive)}/>
                    <span className="slider round"></span>
                </label>
                <AddTransaction mode={Postive}></AddTransaction>
            </div>
              
        </dialog>
    );
}

export default TransactionModal;