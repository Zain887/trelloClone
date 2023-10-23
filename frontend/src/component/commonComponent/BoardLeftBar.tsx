import React, { useState, useEffect } from 'react';
import { IoIosPeople } from 'react-icons/io';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

interface Props {
    // Define your component props here
}

const BoraddLeftBar: React.FC<Props> = (props) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [membersList, setMembersList] = useState<string[]>([]);
    const location = useLocation();
    const boardName = location.state && location.state.alt;

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleAddMember = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim() !== '') {
            setMembersList([...membersList, email]);
            setEmail('');
            setIsEdit(false);
        }
    };

    useEffect(() => {
        // Load membersList from localStorage on component mount
        const storedMembers = localStorage.getItem('membersList');
        if (storedMembers) {
            setMembersList(JSON.parse(storedMembers));
        }
    }, []);

    useEffect(() => {
        // Save membersList to localStorage whenever it changes
        localStorage.setItem('membersList', JSON.stringify(membersList));
    }, [membersList]);

    return (
        <>
            <div className='backdrop-blur-md w-96 h-full top-[46px] p-5 fixed z-10'>
                <h1 className='text-white font-bold uppercase'>{boardName}</h1>
                <div className='flex items-center justify-between'>
                    <h1 className={`flex items-center gap-4 h-8 p-2 cursor-pointer rounded-md text-[#2173E7]`}>
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
                    {membersList.map((member, index) => (
                        <h1 key={index} className='text-white'>
                            {member}
                        </h1>
                    ))}
                </div>
            </div>
            {isEdit && (
                <div className='fixed top-0 left-0 w-full h-full backdrop-blur-md text-center z-10'>
                    <form onSubmit={handleAddMember} className='bg-white w-96 h-auto p-5 rounded-md absolute top-[40%] left-[40%]'>
                        <label htmlFor="" className=' text-lg font-bold'>Add Member Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={handleEmailChange}
                            className='h-10 w-full p-5 bg-teal-400 font-bold rounded-lg mt-5'
                        />
                        <button className='bg-blue-500 rounded-md py-2 px-3 mt-5' type="submit">
                            Invite Members
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default BoraddLeftBar;
