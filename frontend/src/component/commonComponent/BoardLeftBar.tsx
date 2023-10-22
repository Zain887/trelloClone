import React, { useState } from 'react';
import { IoIosPeople } from 'react-icons/io';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

interface Props {
    // Define your component props here
}

const BoraddLeftBar: React.FC<Props> = (props) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const location = useLocation();
    const boardName = location.state && location.state.alt;
    return (
        <>
            <div className='backdrop-blur-md w-96 h-full top-[46px] p-5 fixed z-10'>
                <h1 className='text-white font-bold uppercase'>{boardName}</h1>
                <div className='flex items-center justify-between'>
                    <h1
                        className={`flex items-center gap-4 h-8 p-2 cursor-pointer rounded-md text-[#2173E7]`}
                    >
                        <span>
                            <IoIosPeople size={20} color="#2173E7" />
                        </span>
                        Board Members
                    </h1>
                    <div className='cursor-pointer' onClick={() => { setIsEdit(true) }}>
                        <BsFillPlusSquareFill size={20} color="#2173E7" />
                    </div>
                </div>
                <div className='mt-5'>
                    <h1 className='text-white'>Admin@admin.com</h1>
                </div>
                {isEdit && (
                    <form>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value='admin@admin.com'
                            className=' h-10 w-full p-5 bg-teal-400 font-bold rounded-lg mt-5'
                        />
                        <button className='bg-blue-500 rounded-md py-2 px-3 mt-5' type="submit">Add Member</button>
                    </form>
                )}
            </div>
        </>
    );
};

export default BoraddLeftBar;