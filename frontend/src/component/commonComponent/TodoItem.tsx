import React, { useState } from 'react';
import { TodoItem, generateUUID } from './types';
import {BsFillCheckSquareFill} from 'react-icons/bs'

interface Props {
    // Define your component props here
}

const TodoItemComponent: React.FC<Props> = (props) => {
    const [todoItemList, setTodoItemList] = useState<TodoItem[]>([
        {
            title: 'Your Task Title here',
            isCompleted: true,
            todoItemid: generateUUID(),
            edit: false,
        }
    ]);

    const [label, setLabel] = useState('');
    const [status, setStatus] = useState('pending');
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLabel(event.target.value);
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value);
    };

    const handleTitleClick = () => {
        setTodoItemList((prevTodoItemList) => {
            const updatedTodoItemList = [...prevTodoItemList];
            updatedTodoItemList[0].edit = true;
            return updatedTodoItemList;
        });
    };

    const handleTitleBlur = () => {
        setTodoItemList((prevTodoItemList) => {
            const updatedTodoItemList = [...prevTodoItemList];
            updatedTodoItemList[0].edit = false;
            updatedTodoItemList[0].title = label;
            return updatedTodoItemList;
        });
    };

    return (
        <>
            <div className='flex justify-between items-center w-full mb-5'>
                <div className='flex items-center'>
                    <input type="checkbox" className='w-4 h-4' checked={isChecked} onChange={handleCheckboxChange} />
                    {todoItemList[0].edit ? (
                        <input
                            type="text"
                            placeholder="Label"
                            value={label}
                            className='bg-transparent text-white outline-none text-sm pl-2'
                            onChange={handleLabelChange}
                            onBlur={handleTitleBlur}
                        />
                    ) : (
                        <label
                            style={{ wordBreak: 'break-word' }}
                            className={`${isChecked ? 'line-through' : 'none'} text-white pl-2 w-[200px] text-sm cursor-pointer`}
                            onClick={handleTitleClick}
                        >
                            {todoItemList[0].title}
                        </label>
                    )}
                </div>
                <select value={status} onChange={handleSelectChange} disabled={isChecked} className=' bg-transparent text-blue-500 outline-none text-xs cursor-pointer'>
                    <option value="pending">Pending</option>
                    <option value="done">Done</option>
                    <option value="in-progress">In Progress</option>
                </select>
            </div>
            <button className='flex items-center gap-2 bg-red-100 rounded-lg px-2 text-blue-600 text-xs cursor-pointer font-bold'><BsFillCheckSquareFill/>AddNewTask</button>
        </>
    );
};

export default TodoItemComponent;
