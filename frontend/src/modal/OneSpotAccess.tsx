import React, { useState } from 'react';
import Modal from 'react-modal';
import { CgClose } from 'react-icons/cg';
import { PiCreditCardFill } from 'react-icons/pi';
import { BsEye } from 'react-icons/bs';
import Comment from '../component/Comment';
import CardDescription from '../component/CardDescription';
import ModalRightMenubar from './ModalRightMenubar';

Modal.setAppElement('#root');

interface OneSpotAccessProps {
    isModalOpen?: boolean;
    onRequestClose: () => void;
    cardTitle: string;
    cardId: string;
}

const OneSpotAccess: React.FC<OneSpotAccessProps> = ({ isModalOpen = false, onRequestClose, cardTitle, cardId }) => {
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={onRequestClose}
            contentLabel="Example Modal"
            className='w-[800px] bg-[#F1F2F4] rounded-md border-none p-5 outline-none'
        >
            <div className='flex items-start justify-between mb-5'>
                <div className='flex items-start'>
                    <PiCreditCardFill size={20} color='black' className='cursor-pointer' />
                    <p className=' text-xl text-[#263858] font-bold pl-4'>{cardTitle}<br /> <span className='text-sm font-normal leading-[2px]'>In list <u>list Progress-Bugs</u></span></p>
                </div>
                <CgClose size={20} color='black' onClick={onRequestClose} className=' hover:bg-red-200 hover:rounded-xl cursor-pointer' />
            </div>
            <div className='flex items-start gap-5 justify-between'>
                <div className='w-[80%]'>
                    <div className='mb-3'>
                        <div className='font-bold text-[#263858]'>
                            <p className='text-xs'>Notification</p>
                        </div>
                        <p className='text-[14px] w-fit flex items-center gap-2 bg-[#E4E6EA] hover:bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                            <BsEye size={16} />
                            Watch
                        </p>
                    </div>
                    <CardDescription cardID={cardId} />
                    <Comment cardID={cardId} />
                </div>
                <div className='w-[20%]'>
                    <ModalRightMenubar />
                </div>
            </div>
        </Modal>
    );
}

export default OneSpotAccess;
