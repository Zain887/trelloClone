import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiTimeFive, BiLogoTrello } from 'react-icons/bi';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiTwotoneSetting, AiOutlineInfoCircle, AiFillPlusSquare } from 'react-icons/ai';
import { FaToolbox } from 'react-icons/fa';
import { MdOutlinePeopleOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Board, Member } from '../commonComponent/types';

interface Props {
    // ActiveBoard: string;
}

const DashboardRightMenu: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    const [boardName, setBoardName] = useState('');
    const [updateBoard, setUpdateBoard] = useState<boolean>(false);
    const [board, setBoard] = useState<Board[]>([])
    const [recentView, setRecentView] = useState<{ src: string; title: string }[]>([]);
    const [member, setMember] = useState<Member[]>([]);

    const guestWorkspace = [
        { src: '/images/tree-bg.jpg', title: 'Assetize Today Web' },
        { src: '/images/art-bg.jpg', title: 'Assetize Today Web' },
        { src: '/images/art-bg2.jpg', title: 'Assetize Today Web' },
        { src: '/images/art-bg.jpeg', title: 'Assetize Today Web' },
    ];

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/board?userId=${localStorage.getItem('userId')}`);
                const data = response.data;
                setBoard(data);
            } catch (error) {
                console.error('Error fetching boards', error);
            }
        };
        fetchBoards();
    }, []);

    const gotoBoardArea = (index: string) => {
        const selectedBoard = board.find((boardSec) => boardSec.id === index);
        if (selectedBoard) {
            const title = selectedBoard.title || "Untitled";
            const { id: boardId } = selectedBoard;
            navigate(`/board/${boardId}`, {
                state: { src: '/images/art-bg2.jpg', title, boardId }
            });

            const updateRecentView = { src: '/images/art-bg2.jpg', title, boardId };
            recentView.push(updateRecentView);
            setRecentView([...recentView].splice(-4));
            // saveDataToLocalStorage();
        }
    };


    const gotoRecentView = (index: number) => {
        const selectedItem = recentView[index];
        if (selectedItem) {
            navigate(`/board/${selectedItem.title}`, { state: { src: selectedItem.src, title: selectedItem.title } });
        }
    };

    const addNewBoard = async () => {
        setUpdateBoard(true);
        if (boardName.trim() === '') {
            return;
        }
        const newBoardData = {
            title: boardName,
            list: []
        };
        try {
            const response = await axios.post(`http://localhost:5000/board?userId=${userId}`, newBoardData);
            const newBoard = response.data;
            // Store the new board's ID in localStorage
            const boardIds = JSON.parse(localStorage.getItem('boardIds') || '[]');
            boardIds.push(newBoard.id);
            localStorage.setItem('boardIds', JSON.stringify(boardIds));
            // Update the state with the newly created board
            setBoard((prevBoards) => [...prevBoards, newBoard]);
            setBoardName('');
            setUpdateBoard(false);
        } catch (error) {
            console.error('Error adding a new board', error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addNewBoard();
        setUpdateBoard(false);
    };
    const userId = localStorage.getItem('userId');
    console.log(userId);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/members`)
                const member = response.data;
                setMember(member);
            }
            catch (error) {
                console.error('Error fetching data from the API', error);
            }
        }; fetchMember();
    }, []);
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
                                <img src={image.src} alt={image.title} style={{ width: '100%', height: '100%' }} />
                                <p className="absolute top-3 left-3 text-white font-bold">
                                    {image.title}
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
                            <h1 className='text-sm'>Members ({member.length})</h1>
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
                                {boardSec.title}
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
                        <label className='text-white font-bold text-lg'>Enter the Board Name</label>
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
                            <img src={image.src} alt={image.title} style={{ width: '100%', height: '100%' }} />
                            <p className="absolute top-3 left-3 text-white font-bold">
                                {image.title}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default DashboardRightMenu;
