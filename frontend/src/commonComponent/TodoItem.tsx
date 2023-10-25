import React, { useState } from 'react';
import { TodoItem, generateUUID, Enum } from './types';
import { BsFillCheckSquareFill } from 'react-icons/bs';

interface Props {
    // Define your component props here
}

const TodoItemComponent: React.FC<Props> = (props) => {
    const [todoItemList, setTodoItemList] = useState<TodoItem[]>([
        {
            id: generateUUID(),
            text: 'New Task',
            status: Enum.pending,
            comments: [],
        },
    ]);

    const handleCheckboxChange = (index: number) => {
        const updatedItems = [...todoItemList];
        updatedItems[index].status = updatedItems[index].status === Enum.Complete ? Enum.pending : Enum.Complete;
        setTodoItemList(updatedItems);
    };

    const handleLabelChange = (index: number, newValue: string) => {
        const updatedItems = [...todoItemList];
        updatedItems[index].text = newValue;
        setTodoItemList(updatedItems);
    };

    const handleSelectChange = (index: number, newValue: Enum) => {
        const updatedItems = [...todoItemList];
        updatedItems[index].status = newValue;
        setTodoItemList(updatedItems);
    };

    const addNewTodoItem = () => {
        const newTodoItem: TodoItem = {
            id: generateUUID(),
            text: 'New Task',
            status: Enum.pending,
            comments: [],
        };
        setTodoItemList((prevTodoItemList) => [...prevTodoItemList, newTodoItem]);
    };

    return (
        <>
            {todoItemList.map((item, index) => (
                <div className='flex justify-between items-center w-full mb-5' key={item.id}>
                    <div className='flex items-center'>
                        <input
                            type='checkbox'
                            className='w-4 h-4 '
                            checked={item.status === Enum.Complete}
                            onChange={() => handleCheckboxChange(index)}
                        />
                        <input
                            type='text'
                            placeholder='Label'
                            value={item.text}
                            className='bg-transparent text-black outline-none text-sm pl-2'
                            onChange={(e) => handleLabelChange(index, e.target.value)}
                        />
                    </div>
                    <select
                        value={item.status}
                        onChange={(e) => handleSelectChange(index, parseInt(e.target.value))}
                        disabled={item.status === Enum.Complete}
                        className='bg-transparent text-blue-500 outline-none text-xs cursor-pointer'
                    >
                        <option value={Enum.pending}>Pending</option>
                        <option value={Enum.Inprogress}>In Progress</option>
                        <option value={Enum.Complete}>Complete</option>
                    </select>
                </div>
            ))}
            <button className='flex items-center gap-2 bg-red-100 rounded-lg px-2 py-1 text-blue-600 text-xs cursor-pointer font-bold mb-5'
                onClick={addNewTodoItem}
            >
                <BsFillCheckSquareFill />
                Add New Task
            </button>
        </>
    );
};

export default TodoItemComponent;
