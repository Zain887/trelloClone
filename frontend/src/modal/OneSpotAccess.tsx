import React, { useState } from 'react';
import Modal from 'react-modal';
import { CgClose, CgAttachment } from 'react-icons/cg';
import { IoIosSettings, IoMdAdd, IoIosInformationCircleOutline } from 'react-icons/io';
import { PiCreditCardFill } from 'react-icons/pi';
import { HiRectangleStack } from 'react-icons/hi2';
import { LuMoveRight } from 'react-icons/lu';
import { MdOutlineContentCopy, MdOutlineArchive } from 'react-icons/md';
import { BsFillPersonFill, BsTagFill, BsCheckSquareFill, BsClockFill, BsFillCreditCard2BackFill, BsFillShareFill, BsEye, BsTextParagraph } from 'react-icons/bs';
import { HiTemplate } from 'react-icons/hi';
import { RxActivityLog } from 'react-icons/rx';

Modal.setAppElement('#root');

const OneSpotAccess = () => {
    const [isModalOpen, setModalOpen] = useState(true);
    const [hideBtn, setHideBtn] = useState<string>('Hide Details')
    const [isEditing, setIsEditing] = useState(false);
    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<string[]>([]);


    const closeModal = () => {
        setModalOpen(false);
    };
    const handleClick = () => {
        if (hideBtn === 'Hide Details') {
            setHideBtn('Show Details');
        } else {
            setHideBtn('Hide Details');
        }
    };

    const handleCommentClick = () => {
        setIsEditing(true);
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleSaveClick = () => {
        if (comment.trim() !== '') {
            setComments([...comments, comment]);
            setIsEditing(false);
            setComment('');
        }
    };

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className='w-[800px] bg-[#F1F2F4] rounded-md border-none p-5 outline-none'
        >
            <div className='flex items-start justify-between mb-5'>
                <div className='flex items-start'>
                    <PiCreditCardFill size={20} color='black' className='cursor-pointer' />
                    <p className=' text-xl text-[#263858] font-bold pl-4'>CardName <br /> <span className='text-sm font-normal leading-[2px]'>In list <u>list Progress-Bugs</u></span></p>
                </div>
                <CgClose size={20} color='black' onClick={closeModal} className=' hover:bg-red-200 hover:rounded-xl cursor-pointer' />
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
                    <div className='flex items-start mb-3'>
                        <BsTextParagraph size={20} />
                        <p className='pl-2 font-bold text-[#263858] text-lg'>Description</p>
                    </div>
                    <div className='pl-[30px]'>
                        <p className='text-sm h-14 bg-[#E4E6EA] p-2 rounded-sm w-full hover:bg-gray-300 cursor-pointer'>Add a more detailed description....</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center mb-3 mt-5'>
                            <RxActivityLog size={16} />
                            <p className='pl-2 font-bold text-[#263858] text-lg'>Activity</p>
                        </div>
                        <p className='text-[14px] bg-[#E4E6EA] hover:bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1' onClick={handleClick}>
                            {hideBtn}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                        {isEditing ? (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Write a comment..."
                                    className="p-3 font-normal text-sm w-full outline-none"
                                    value={comment}
                                    onChange={handleCommentChange}
                                />
                                <button onClick={handleSaveClick} disabled={comment.trim() === ''}>
                                    Save
                                </button>
                                <input type="checkbox" /><label>Watch</label>
                            </div>
                        ) : (
                            <p
                                className="font-normal text-sm text-[#263858] cursor-pointer p-3 bg-white w-full rounded-lg shadow-md hover:bg-slate-100"
                                onClick={handleCommentClick}
                            >
                                Write a Comment...
                            </p>
                        )}
                    </div>
                    {comments.map((comment, index) => (
                        <div className='flex items-center gap-2 mb-3'>
                            <div className="w-8 h-8 rounded-full bg-gray-300"></div>

                            <p key={index} className='font-normal text-sm text-[#263858] cursor-pointer p-3 bg-white w-full rounded-lg shadow-md hover:bg-slate-100'>{comment}</p>
                        </div>
                    ))}

                </div>
                <div className='w-[20%]'>
                    <div className='mb-3'>
                        <div className='flex items-center justify-between font-bold text-[#263858]'>
                            <p className='text-xs'>Suggested</p>
                            <IoIosSettings size={16} color='#263858' className='bg-[#D0D4DB] p-[2px] rounded-md' />
                        </div>
                        <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover:bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                            <BsFillPersonFill size={16} />
                            join
                        </p>
                    </div>
                    <div className='mb-3'>
                        <div className='font-bold text-[#263858]'>
                            <p className='text-xs'>Add to Card</p>
                        </div>
                        <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover:bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                            <BsFillPersonFill size={16} />
                            Members
                        </p>
                        <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover:bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                            <BsTagFill size={16} className='-rotate-90' />
                            Labels
                        </p>
                        <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover:bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                            <BsCheckSquareFill size={16} />
                            Checklist
                        </p>
                        <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover:bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                            <BsClockFill size={16} />
                            Dates
                        </p>
                        <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover:bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                            <CgAttachment size={16} className='rotate-45' />
                            Attachment
                        </p>
                        <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover:bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                            <BsFillCreditCard2BackFill size={16} />
                            Cover
                        </p>
                        <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover:bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                            <HiRectangleStack size={16} />
                            Custom Fields
                        </p>
                    </div>
                    <div className='mb-3'>
                        <div className='font-bold text-[#263858]'>
                            <p className='text-xs'>Power-Ups</p>
                        </div>
                        <p className='text-[14px] flex items-center gap-2 hover:bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                            <IoMdAdd size={16} />
                            Add Power-Ups
                        </p>
                    </div>
                    <div className='mb-3'>
                        <div className='flex items-center justify-between font-bold text-[#263858]'>
                            <p className='text-xs'>Suggested</p>
                            <IoIosInformationCircleOutline size={16} color='#263858' className='bg-[#D0D4DB] p-[2px] rounded-md' />
                        </div>
                        <p className='text-[14px] flex items-center gap-2 hover:bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                            <IoMdAdd size={16} />
                            Add button
                        </p>
                    </div>
                    <div className='mb-3'>
                        <div className='font-bold text-[#263858]'>
                            <p className='text-xs'>Actions</p>
                        </div>
                        <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover:bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                            <LuMoveRight size={16} />
                            Move
                        </p>
                        <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover:bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                            <MdOutlineContentCopy size={16} className='-rotate-90' />
                            Copy
                        </p>
                        <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover:bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                            <HiTemplate size={16} />
                            Make Template
                        </p>
                        <hr className='border-b mt-2 border-gray-300' />
                        <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover:bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                            <MdOutlineArchive size={16} />
                            Archive
                        </p>
                        <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover:bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                            <BsFillShareFill size={16} />
                            share
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default OneSpotAccess;
