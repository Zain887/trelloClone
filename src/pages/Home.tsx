import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardPage from '../component/commonComponent/BoardPage';
import { Board } from '../component/commonComponent/types';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [boardList, setBoardList] = useState<Board[]>([]);
    useEffect(() => {
        const storedBoardList = localStorage.getItem('boardList');
        if (storedBoardList) {
            setBoardList(JSON.parse(storedBoardList));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('boardList', JSON.stringify(boardList));
    }, [boardList]);

    const addNewBoard = () => {
        const newBoard: Board = {
            name: `Title`,
            description: `Description Here`,
            userID: 789,
        };
        boardList.push(newBoard);
        setBoardList([...boardList]);
    };

    const deleteBoard = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
        event.stopPropagation();
        const updatedBoardList = [...boardList];
        updatedBoardList.splice(index, 1);
        setBoardList(updatedBoardList)
    }

    const handleBoardClick = (event: React.MouseEvent<HTMLDivElement>, boardId: number | string | undefined) => {
        event.stopPropagation();
        navigate(`/board/${boardId}`);
    };
    return (
        <div className='bg-black h-screen p-5 overflow-hidden overflow-y-auto'>
            <div className='flex justify-center items-center'>
                <div className='text-center'>
                    <h1 className='text-3xl text-red-700 font-extrabold mb-4'>Welcome to the Boards Lobby</h1>
                    <div className="animate-bounce">
                        <p className="text-2xl mb-2 text-white">This is a Boards Lobby Area</p>
                        <p className="text-2xl text-white">Where you can add a new board & go to another board as a Guest</p>
                    </div>
                    <button
                        className='bg-red-500 text-white font-extrabold text-3xl py-3 px-5 rounded mt-4 hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105'
                        onClick={() => {
                            navigate('/login');
                        }}
                    >
                        Logout
                    </button>
                    <button
                        className='bg-red-500 ml-5 text-white font-extrabold text-3xl py-3 px-5 rounded mt-4 hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105'
                        onClick={() => { addNewBoard() }}>
                        Add New Board
                    </button>
                </div>
            </div>
            <hr className='my-5' />
            <h1 className=' text-white text-3xl'>Boards List</h1>
            <div className='flex flex-wrap justify-evenly gap-5 overflow-y-auto overflow-x-hidden  h-[655px] w-full bg-[#2f4f4f] rounded-lg p-5'>
                {boardList.map((board, index) => (
                    <div key={index} className='bg-gray-900 w-80 h-80 rounded-2xl p-3' onClick={(event) => handleBoardClick(event, board.id)}>
                        <BoardPage
                            boardID={index}
                            key={index}
                            board={board}
                            deleteBoard={(event) => deleteBoard(event, index)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
