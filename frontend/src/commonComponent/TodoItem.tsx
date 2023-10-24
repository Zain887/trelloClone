import React, { useState } from 'react';
import { Enum, TodoItem, generateUUID } from './types';
import { BsFillCheckSquareFill } from 'react-icons/bs';

interface Props {
    // Define your component props here
}

const TodoItemComponent: React.FC<Props> = (props) => {
    const [todoItemList, setTodoItemList] = useState<TodoItem[]>([
        {
            title: 'New Task',
            isCompleted: false,
            todoItemid: generateUUID(),
            edit: false,
            status: Enum.pending,
        },
    ]);

    const handleCheckboxChange = (index: number) => {
        const updatedItems = [...todoItemList];
        updatedItems[index].isCompleted = !updatedItems[index].isCompleted;
        setTodoItemList(updatedItems);
    };

    const handleLabelChange = (index: number, newValue: string) => {
        const updatedItems = [...todoItemList];
        updatedItems[index].title = newValue;
        setTodoItemList(updatedItems);
    };

    const handleTitleClick = (index: number) => {
        const updatedItems = [...todoItemList];
        updatedItems[index].edit = true;
        setTodoItemList(updatedItems);
    };

    const handleTitleBlur = (index: number) => {
        const updatedItems = [...todoItemList];
        updatedItems[index].edit = false;
        setTodoItemList(updatedItems);
    };

    const handleSelectChange = (index: number, newValue: Enum) => {
        const updatedItems = [...todoItemList];
        updatedItems[index].status = newValue;
        setTodoItemList(updatedItems);
    };

    const addNewTodoItem = () => {
        const newTodoItem = {
            title: 'New Task',
            isCompleted: false,
            todoItemid: generateUUID(),
            edit: false,
            status: Enum.pending,
        };
        setTodoItemList((prevTodoItemList) => [...prevTodoItemList, newTodoItem]);
    };
    return (
        <>
            {todoItemList.map((item, index) => (
                <div className='flex justify-between items-center w-full mb-5' key={item.todoItemid}>
                    <div className='flex items-center'>
                        <input
                            type='checkbox'
                            className='w-4 h-4'
                            checked={item.isCompleted}
                            onChange={() => handleCheckboxChange(index)}
                        />
                        {item.edit ? (
                            <input
                                type='text'
                                placeholder='Label'
                                value={item.title}
                                className='bg-transparent text-white outline-none text-sm pl-2'
                                onChange={(e) => handleLabelChange(index, e.target.value)}
                                onBlur={() => handleTitleBlur(index)}
                            />
                        ) : (
                            <label
                                style={{ wordBreak: 'break-word' }}
                                className={`${item.isCompleted ? 'line-through' : ''} text-white pl-2 w-[200px] text-sm cursor-pointer`}
                                onClick={() => handleTitleClick(index)}
                            >
                                {item.title}
                            </label>
                        )}
                    </div>
                    <select
                        value={item.status}
                        onChange={(e) => handleSelectChange(index, parseInt(e.target.value))}
                        disabled={item.isCompleted}
                        className='bg-transparent text-blue-500 outline-none text-xs cursor-pointer'
                    >
                        <option value={Enum.pending}>Pending</option>
                        <option value={Enum.Inprogress}>In Progress</option>
                        <option value={Enum.Complete}>Complete</option>
                    </select>
                </div>
            ))}
            <button className='flex items-center gap-2 bg-red-100 rounded-lg px-2 text-blue-600 text-xs cursor-pointer font-bold mb-5'
                onClick={addNewTodoItem}
            >
                <BsFillCheckSquareFill />
                AddNewTask
            </button>
        </>
    );
};

export default TodoItemComponent;
