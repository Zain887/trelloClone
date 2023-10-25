import React, { useEffect, useState } from 'react';
import { TodoItem, generateUUID } from './types';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

interface Props {
    cardId: string | undefined;
    todoId: string | undefined;
}

const TodoItemComponent: React.FC<Props> = ({ cardId, todoId }) => {
    const [newTaskLabel, setNewTaskLabel] = useState<string>('');
    const [todoItemList, setTodoItemList] = useState<TodoItem[]>([]);

    useEffect(() => {
        const fetchTodoItems = async () => {
            try {
                if (cardId && todoId) {
                    const response = await axios.get(`http://localhost:5000/todo-items/todo/${todoId}`);
                    const listData = response.data;
                    setTodoItemList(listData);
                }
            } catch (error) {
                console.error('Error fetching data from the API', error);
            }
        };

        fetchTodoItems();
    }, []);

    const handleCheckboxChange = (index: number) => {
        const updatedItems = [...todoItemList];
        updatedItems[index].status = updatedItems[index].status === 'todo' ? 'in_progress' : 'done';
        setTodoItemList(updatedItems);
    };

    const handleLabelChange = (index: number, newValue: string) => {
        const updatedItems = [...todoItemList];
        updatedItems[index].text = newValue;
        setTodoItemList(updatedItems);
    };

    const handleSelectChange = (index: number, newValue: string) => {
        const updatedItems = [...todoItemList];
        updatedItems[index].status = newValue;
        setTodoItemList(updatedItems);
    };

    const addNewTodoItem = async () => {
        if (newTaskLabel.trim() === '') {
            return;
        }
        try {
            const response = await axios.post(`http://localhost:5000/todo-items/${cardId}/${todoId}`, {
                id: generateUUID(),
                text: newTaskLabel,
                status: 'todo',
                comments: [],
            });
            setTodoItemList([...todoItemList, response.data]);
            setNewTaskLabel('');
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTodoItem = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/todo-items/${id}`);
            setTodoItemList((prevTodoItemList) => prevTodoItemList.filter((item) => item.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {todoItemList.map((item, index) => (
                <div className='flex justify-between items-center w-full mb-5' key={item.id}>
                    <div className='flex items-center'>
                        <input
                            type='checkbox'
                            className='w-4 h-4 '
                            checked={item.status === 'done'}
                            onChange={() => handleCheckboxChange(index)}
                        />
                        {item.status === 'done' ? (
                            <span className='text-sm pl-2 w-[220px]'>{item.text}</span>
                        ) : (
                            <input
                                type='text'
                                placeholder='Label'
                                value={item.text}
                                className='bg-transparent text-black outline-none text-sm pl-2'
                                onChange={(e) => handleLabelChange(index, e.target.value)}
                            />
                        )}
                    </div>
                    <select
                        value={item.status}
                        onChange={(e) => handleSelectChange(index, e.target.value)}
                        disabled={item.status === 'done'}
                        className='bg-transparent text-blue-500 outline-none text-xs cursor-pointer'
                    >
                        <option value='todo'>todo</option>
                        <option value='in_progress'>in_progress</option>
                        <option value='done'>done</option>
                    </select>
                    <div className='cursor-pointer' onClick={() => deleteTodoItem(item.id)}>
                        <MdDelete size={20} color='red' />
                    </div>
                </div>
            ))}
            <div className='flex items-center w-full mb-5 justify-between'>
                <input
                    type='text'
                    placeholder='Add New TodoItem'
                    value={newTaskLabel}
                    onChange={(e) => setNewTaskLabel(e.target.value)}
                    className='w-[60%] border-b-2 border-black bg-transparent text-black outline-none text-sm pl-2'
                />
                <button
                    className='flex items-center gap-2 bg-red-100 rounded-lg px-2 py-1 text-blue-600 text-xs cursor-pointer font-bold'
                    onClick={addNewTodoItem}
                >
                    <BsFillCheckSquareFill />
                    Add New Task
                </button>
            </div>
        </>
    );
};

export default TodoItemComponent;
