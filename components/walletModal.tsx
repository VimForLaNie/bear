import AddWallet from "./addWallet";

const WalletModal = () => {
    const ModalRef = document.querySelector('#wallet-modal');

    const closeModal = () => {
        if(ModalRef == null) return;
        console.log("close");
        // @ts-ignore
        ModalRef.close();
    }

    return (
        <dialog id="wallet-modal" className=" p-8">
            <button className=" absolute top-0 right-0 p-2 m-1" onClick={closeModal}><span data-text="X"></span></button>
            <AddWallet></AddWallet>
        </dialog>
    );
}

export default WalletModal;