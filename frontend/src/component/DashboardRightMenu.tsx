import React, { useState, useEffect } from 'react';
import { BiTimeFive, BiLogoTrello } from 'react-icons/bi';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiTwotoneSetting, AiOutlineInfoCircle, AiFillPlusSquare } from 'react-icons/ai';
import { FaToolbox } from 'react-icons/fa';
import { MdOutlinePeopleOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Board } from './commonComponent/types';
import { v4 as uuid } from 'uuid';


interface Props {
    // ActiveBoard: string;
}

const DashboardRightMenu: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    const [boardName, setBoardName] = useState('');
    const [updateBoard, setUpdateBoard] = useState<boolean>(false);
    const [board, setBoard] = useState<Board[]>([])
    const [recentView, setRecentView] = useState<{ src: string; alt: string }[]>([]);

    const guestWorkspace = [
        { src: '/images/tree-bg.jpg', alt: 'Assetize Today Web' },
        { src: '/images/art-bg.jpg', alt: 'Assetize Today Web' },
        { src: '/images/art-bg2.jpg', alt: 'Assetize Today Web' },
        { src: '/images/art-bg.jpeg', alt: 'Assetize Today Web' },
    ];


    useEffect(() => {
        const savedBoard = localStorage.getItem('board');
        if (savedBoard) {
            setBoard(JSON.parse(savedBoard));
        }

        const savedRecentView = localStorage.getItem('recentView');
        if (savedRecentView) {
            setRecentView(JSON.parse(savedRecentView));
        }
    }, []);

    const saveDataToLocalStorage = () => {
        localStorage.setItem('board', JSON.stringify(board));
        localStorage.setItem('recentView', JSON.stringify(recentView));
    };


    const gotoBoardArea = (index: string) => {
        const selectedBoard = board.find((boardSec) => boardSec.id === index);
        if (selectedBoard) {
            navigate(`/board/${selectedBoard.name}`, {
                state: { src: '/images/art-bg2.jpg', alt: selectedBoard.name },
            });
            const updateRecentView = { src: '/images/art-bg2.jpg', alt: selectedBoard.name };
            recentView.push(updateRecentView);
            setRecentView([...recentView].splice(-4));
            saveDataToLocalStorage();
        }
    };
    const gotoRecentView = (index: number) => {
        const selectedItem = recentView[index];
        if (selectedItem) {
            navigate(`/board/${selectedItem.alt}`, { state: { src: selectedItem.src, alt: selectedItem.alt } });
        }
    };
    const addNewBoard = () => {
        setUpdateBoard(true);
        if (boardName.trim() === '') {
            return;
        }

        const newBoard = [...board];
        newBoard.push({
            id: uuid(),
            name: boardName,
        });
        setBoard(newBoard);
        setBoardName('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addNewBoard();
        setUpdateBoard(false);
        saveDataToLocalStorage();
    };
    return (
        <div className="w-full h-full">
            {/* #########################################################Recent View#################################################### */}
            <section className='mb-12'>
                <h1 className="flex gap-4 items-center text-lg font-medium">
                    <span>
                        <BiTimeFive size={22} color="black" />
                    </span>
                    Recently viewed
                </h1>

                {recentView.length > 0 && (
                    <div className="flex flex-wrap justify-around">
                        {recentView.map((image, index) => (
                            <div
                                key={index}
                                className="relative w-56 h-32 bg-gray-300 overflow-hidden mt-4 rounded cursor-pointer"
                                onClick={() => gotoRecentView(index)} // Added this line

                            >
                                <img src={image.src} alt={image.alt} style={{ width: '100%', height: '100%' }} />
                                <p className="absolute top-3 left-3 text-white font-bold">
                                    {image.alt}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            {/* #########################################################Your Area#################################################### */}
            <section className='mb-12'>
                <h1 className="flex gap-4 items-center text-lg font-medium mb-4">
                    YOUR WORKSPACES
                </h1>
                <div className='flex justify-between items-center'>
                    <h1 className="flex gap-4 items-center text-sm font-medium">
                        <span className='w-6 h-6 rounded overflow-hidden'>
                            <img src="/images/art-bg.jpg" alt="" style={{ width: '100%', height: '100%' }} />
                        </span>
                        asdf
                    </h1>
                    <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-2 bg-slate-100 rounded-md px-2 py-1 cursor-pointer'>
                            <BiLogoTrello size={16} color="black" />
                            <h1 className='text-sm'>Boards</h1>
                        </div>
                        <div className='flex items-center gap-2 bg-slate-100 rounded-md px-2 py-1 cursor-pointer'>
                            <HiOutlineViewGrid size={16} color="black" />
                            <h1 className='text-sm'>Views</h1>
                        </div>
                        <div className='flex items-center gap-2 bg-slate-100 rounded-md px-2 py-1 cursor-pointer'>
                            <BsFillPersonFill size={16} color="black" />
                            <h1 className='text-sm'>Members (6)</h1>
                        </div>
                        <div className='flex items-center gap-2 bg-slate-100 rounded-md px-2 py-1 cursor-pointer'>
                            <AiTwotoneSetting size={16} color="black" />
                            <h1 className='text-sm'>Settings</h1>
                        </div>
                        <div className='flex items-center gap-2 bg-[#DFD8FD] rounded-md px-2 py-1 cursor-pointer'>
                            <FaToolbox size={16} color="white" className='bg-[#6E5DC6] p-1 rounded' />
                            <h1 className='text-sm'>Upgrade</h1>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-around">
                    {board.map((boardSec) => (
                        <div
                            key={boardSec.id}
                            className="relative w-56 h-32 bg-gray-300 overflow-hidden mt-4 rounded cursor-pointer"
                            onClick={() => gotoBoardArea(boardSec.id)}
                        >
                            <img src='/images/art-bg2.jpg' style={{ width: '100%', height: '100%' }} />
                            <p className="absolute top-3 left-3 text-white font-bold">
                                {boardSec.name}
                            </p>
                        </div>
                    ))}
                    <div className="flex justify-center items-center relative w-56 h-32 bg-gray-900 overflow-hidden mt-4 rounded cursor-pointer"
                        onClick={() => addNewBoard()}
                    >
                        <p className="flex items-center gap-4 text-green-600 font-bold">
                            <span><AiFillPlusSquare size={20} color='green' /></span> AddNew
                        </p>
                    </div>
                </div>
            </section>
            {updateBoard && (
                <div className='fixed top-0 left-0 bg-[#000000ad] w-full h-full z-10 backdrop-blur-md'>
                    <form onSubmit={handleSubmit} className='w-96 h-auto p-5 absolute top-[35%] left-[40%]'>
                        <label htmlFor="" className='text-white font-bold text-lg'>Enter the Board Name</label>
                        <br />
                        <input
                            className='my-5 w-full h-12 text-3xl p-2 box-border rounded-lg outline-none'
                            type="text"
                            placeholder="Enter Board Name"
                            value={boardName}
                            onChange={(e) => setBoardName(e.target.value)}
                        />
                        <br />
                        <button type="submit" className='w-full h-12 bg-blue-600 text-lg text-center rounded-lg text-white uppercase font-bold'>Submit</button>
                    </form>
                </div>
            )}
            {/* #########################################################Guest Area#################################################### */}
            <section className='mb-12'>
                <h1 className="flex gap-4 items-center text-lg font-medium mb-4">
                    GUEST WORKSPACES
                    <span>
                        <AiOutlineInfoCircle size={22} color="black" />
                    </span>
                </h1>
                <div className='flex justify-between items-center'>
                    <h1 className="flex gap-4 items-center text-sm font-medium">
                        <span className='w-6 h-6 rounded overflow-hidden'>
                            <MdOutlinePeopleOutline size={22} color='black' />
                        </span>
                        Assetize
                    </h1>

                </div>
                <div className="flex flex-wrap justify-around">
                    {guestWorkspace.map((image, index) => (
                        <div
                            key={index}
                            className="relative w-56 h-32 bg-gray-300 overflow-hidden mt-4 rounded cursor-pointer"
                        >
                            <img src={image.src} alt={image.alt} style={{ width: '100%', height: '100%' }} />
                            <p className="absolute top-3 left-3 text-white font-bold">
                                {image.alt}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default DashboardRightMenu;
