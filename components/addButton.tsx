const AddButton = () => {
    const ModalRef = document.querySelector('#modal');

    const showModal = () => {
        if(ModalRef == null) return;
        ModalRef.showModal();
    }

    return (
        <button 
            className="rounded-full w-32 bg-blue-500 h-32 fixed right-5 bottom-5 text-center text-6xl hover-lightup"
            onClick={showModal}
        >
            <span data-text="+"></span>{/* + svg plus icon */}
        </button>
    );
}

export default AddButton;