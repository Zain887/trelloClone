import React, { useState } from 'react';
import { CgClose, CgAttachment } from 'react-icons/cg';
import { IoIosSettings, IoMdAdd, IoIosInformationCircleOutline } from 'react-icons/io';
import { HiRectangleStack } from 'react-icons/hi2';
import { LuMoveRight } from 'react-icons/lu';
import { MdOutlineContentCopy, MdOutlineArchive } from 'react-icons/md';
import { BsFillPersonFill, BsTagFill, BsCheckSquareFill, BsClockFill, BsFillCreditCard2BackFill, BsFillShareFill, BsEye } from 'react-icons/bs';
import { HiTemplate } from 'react-icons/hi';

interface Props {
    // Define your component props here
}

const ModalRightMenubar: React.FC<Props> = (props) => {
    const [CheckList, setCheckList] = useState<boolean>(false);

    const closeChecklist = () => {
        setCheckList(false);
        console.log('hello');
    };
    return (
        <>
            <div className='mb-3'>
                <div className='flex items-center justify-between font-bold text-[#263858]'>
                    <p className='text-xs'>Suggested</p>
                    <IoIosSettings size={16} color='#263858' className='bg-[#D0D4DB] p-[2px] rounded-md' />
                </div>
                <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover-bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                    <BsFillPersonFill size={16} />
                    join
                </p>
            </div>
            <div className='mb-3'>
                <div className='font-bold text-[#263858]'>
                    <p className='text-xs'>Add to Card</p>
                </div>
                <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover-bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                    <BsFillPersonFill size={16} />
                    Members
                </p>
                <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover-bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                    <BsTagFill size={16} className='-rotate-90' />
                    Labels
                </p>
                <div className='relative' onClick={() => setCheckList(true)}>
                    <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover-bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                        <BsCheckSquareFill size={16} />
                        Checklist
                    </p>
                    {CheckList && (
                        <div className='h-auto bg-white w-80 rounded-md absolute top-[35px] right-[-170px] z-10 p-5'>
                            <div className='flex items-center justify-between'>
                                <p className='text-sm'>Add Checklist</p>
                                <CgClose size={20} color='black' className='hover-bg-gray-200 hover-rounded cursor-pointer' onClick={closeChecklist} />
                            </div>
                            <label htmlFor="">Title</label>
                            <input type="text" className='w-full h-10 border-2 outline-none px-2 rounded-md' />
                            <button className='w-fit py-1 px-4 rounded-sm text-white font-bold mt-3 bg-blue-500'>Add</button>
                        </div>
                    )}
                </div>
                <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover-bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                    <BsClockFill size={16} />
                    Dates
                </p>
                <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover-bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                    <CgAttachment size={16} className='rotate-45' />
                    Attachment
                </p>
                <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover-bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                    <BsFillCreditCard2BackFill size={16} />
                    Cover
                </p>
                <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover-bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                    <HiRectangleStack size={16} />
                    Custom Fields
                </p>
            </div>
            <div className='mb-3'>
                <div className='font-bold text-[#263858]'>
                    <p className='text-xs'>Power-Ups</p>
                </div>
                <p className='text-[14px] flex items-center gap-2 hover-bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                    <IoMdAdd size={16} />
                    Add Power-Ups
                </p>
            </div>
            <div className='mb-3'>
                <div className='flex items-center justify-between font-bold text-[#263858]'>
                    <p className='text-xs'>Suggested</p>
                    <IoIosInformationCircleOutline size={16} color='#263858' className='bg-[#D0D4DB] p-[2px] rounded-md' />
                </div>
                <p className='text-[14px] flex items-center gap-2 hover-bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                    <IoMdAdd size={16} />
                    Add button
                </p>
            </div>
            <div className='mb-3'>
                <div className='font-bold text-[#263858]'>
                    <p className='text-xs'>Actions</p>
                </div>
                <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover-bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                    <LuMoveRight size={16} />
                    Move
                </p>
                <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover-bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                    <MdOutlineContentCopy size={16} className='-rotate-90' />
                    Copy
                </p>
                <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover-bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                    <HiTemplate size={16} />
                    Make Template
                </p>
                <hr className='border-b mt-2 border-gray-300' />
                <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover-bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                    <MdOutlineArchive size={16} />
                    Archive
                </p>
                <p className='text-[14px] flex items-center gap-2 bg-[#E4E6EA] hover-bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1'>
                    <BsFillShareFill size={16} />
                    share
                </p>
            </div>
        </>
    );
};

export default ModalRightMenubar;