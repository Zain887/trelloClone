import React, { useState, useEffect } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Board, generateUUID } from './types';

interface Props {
  board: Board;
  boardID: number;
  deleteBoard: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const BoardPage: React.FC<Props> = ({ board, deleteBoard, boardID }) => {
  const [isNameEdit, setIsNameEdit] = useState<boolean>(true);
  const [isDescriptionEdit, setIsDescriptionEdit] = useState<boolean>(true);
  const [editTitle, setEditTitle] = useState(board.name);
  const [editDescription, setEditDescription] = useState(board.description);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedName = localStorage.getItem(`boardName_${boardID}`);
    if (storedName !== null) {
      setEditTitle(storedName);
    }

    const storedDescription = localStorage.getItem(`boardDescription_${boardID}`);
    if (storedDescription !== null) {
      setEditDescription(storedDescription);
    }
  }, [boardID]);

  const handleEditNameClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (board.name === 'Title') {
      setIsNameEdit(false);
    }
  };

  const handleEditDescriptionClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (board.description === 'Description Here') {
      setIsDescriptionEdit(false);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditDescription(event.target.value);
  };

  const handleBlur = () => {
    // Save the edited data to localStorage
    localStorage.setItem(`boardName_${boardID}`, editTitle);
    localStorage.setItem(`boardDescription_${boardID}`, editDescription);

    // Update the board data and set isEdit to true
    board.name = editTitle;
    board.description = editDescription;

    setIsNameEdit(true);
    setIsDescriptionEdit(true);
  };

  // Ensure the board.id is of type number or generate a UUID if it's not set
  if (typeof board.id !== 'number') {
    board.id = generateUUID();
  }

  return (
    <div className='cursor-pointer'>
      <div className="flex justify-between items-center">
        {isNameEdit ? (
          <h1 className='text-white text-sm w-full overflow-hidden' onClick={handleEditNameClick}>
            {board.name}
          </h1>
        ) : (
          <input
            type="text"
            className='text-sm bg-transparent w-full text-white outline-none'
            value={editTitle}
            onChange={handleNameChange}
            onBlur={handleBlur}
            onClick={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
          />
        )}
        <div className='cursor-pointer' onClick={deleteBoard}>
          <RiDeleteBin5Fill size={20} color='red' />
        </div>
      </div>
      <p className='text-xs text-red-500'>User ID: {board.userID}</p>
      <div className='pt-5 h-[260px] overflow-y-auto cursor-default'>
        {isDescriptionEdit ? (
          <p className='text-white text-sm w-full break-words' onClick={handleEditDescriptionClick}>
            {board.description}
          </p>
        ) : (
          <input
            type="text"
            className='text-sm bg-transparent text-white outline-none w-full'
            value={editDescription}
            onChange={handleDescriptionChange}
            onBlur={handleBlur}
            onClick={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
          />
        )}
      </div>
    </div>
  );
};

export default BoardPage;
