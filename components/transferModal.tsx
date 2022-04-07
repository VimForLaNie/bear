import Transfer from "./Transfer";

const TransferModal = () => {
    const ModalRef = document.querySelector('#transfer-modal');

    const closeModal = () => {
        if(ModalRef == null) return;
        console.log("close");
        ModalRef.close();
    }

    return (
        <dialog id="transfer-modal" className="">
            <button className="absolute top-0 right-0 p-2 m-1" onClick={closeModal}><span data-text="X"></span></button>
            <Transfer></Transfer>
        </dialog>
    );
}

export default TransferModal;