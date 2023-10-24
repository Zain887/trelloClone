import React, { useState } from 'react';
import Modal from 'react-modal';


Modal.setAppElement('#root');

interface Props {
    isOpen: boolean;
    closeModal: () => void;
}

const ListModal: React.FC<Props> = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className=''>
            <button onClick={openModal}>Open Modal</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <h2>Modal Content</h2>
                <p>Hello, this is a modal!</p>
                <button onClick={closeModal}>Close Modal</button>
            </Modal>
        </div>
    );
};

export default ListModal;
