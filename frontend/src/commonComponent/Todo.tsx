import React, { useEffect, useState } from 'react';
import { Todo, generateUUID } from './types';
import { IoMdCloseCircle } from 'react-icons/io';
import TodoItemComponent from './TodoItem';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';

interface TodoComponentProps {
    cardId: string | undefined;
    close: () => void;
}

const TodoComponent: React.FC<TodoComponentProps> = ({ cardId, close }) => {
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/todo/card/${cardId}`);
                const listData = response.data;
                setTodoList(listData);
            } catch (error) {
                console.error('Error fetching data from the API', error);
            }
        };
        if (cardId) {
            fetchTodo();
        }
    }, [])
    const addTodo = async () => {
        try {
            if (newTodo) {
                const response = await axios.post(`http://localhost:5000/todo/${cardId}`, {
                    title: newTodo,
                });
                const newTodoItem: Todo = response.data;
                setTodoList((prevTodoList) => [...prevTodoList, newTodoItem]);
                setNewTodo('');
            }
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };
    const deleteTodoItem = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/todo/${id}`);
            setTodoList((prevTodoList) => prevTodoList.filter((item) => item.id !== id));
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <div className='fixed backdrop-blur-md w-full h-full top-0 left-0 z-10'>
                <div className='bg-white rounded-md w-[500px] h-auto p-5 top-[15%] absolute left-[35%]'>
                    <h1 className='flex items-center justify-between font-bold'>Todo List <span onClick={close}><IoMdCloseCircle size={25} color='red' /></span></h1>
                    <div className='mb-5 max-h-[570px] overflow-y-auto'>
                        {todoList.map((item) => (
                            <div key={item.id} className='border-2 p-2 rounded-md my-2'>
                                <div className='flex items-center justify-between mb-4'>
                                    <p>{item.title}</p>
                                    <div className='cursor-pointer' onClick={() => deleteTodoItem(item.id)}>
                                        <MdDelete size={20} color='red' />
                                    </div>
                                </div>
                                <TodoItemComponent todoId={item.id} cardId={cardId} />
                            </div>
                        ))}
                    </div>
                    <div className='mt-5 flex items-end border-2 border-blue-700 rounded-md overflow-hidden p-2'>
                        <input
                            type='text'
                            placeholder='Add a new todo'
                            className='outline-none border-b-2 border-black w-full'
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                        />
                        <button onClick={addTodo} className='bg-blue-700 rounded-md text-white font-bold px-2 w-32'>Add Todo</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TodoComponent;
