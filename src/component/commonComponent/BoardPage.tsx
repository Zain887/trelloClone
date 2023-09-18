import React from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { Board, generateUUID } from './types';

interface Props {
  board: Board;
  deleteBoard: (event:React.MouseEvent<HTMLDivElement>) => void
}

const BoardPage: React.FC<Props> = ({ board, deleteBoard }) => {
  // Ensure the board.id is of type number or generate a UUID if it's not set
  if (typeof board.id !== 'number') {
    board.id = generateUUID();
  }

  return (
    <div className='cursor-pointer'>
      <div className="flex justify-between items-center">
        <h1 className=' text-white text-sm'>
          {board.name}
        </h1>
        <div className='cursor-pointer' onClick={deleteBoard}>
          <RiDeleteBin5Fill size={20} color='red' />
        </div>
      </div>
      <p className='text-xs text-red-500'>User ID: {board.userID}</p>
      <div className='pt-5 h-[260px] overflow-y-auto cursor-default'>
        <p className='text-white text-sm'>{board.description}</p>
      </div>
    </div>
  );
};

export default BoardPage;
