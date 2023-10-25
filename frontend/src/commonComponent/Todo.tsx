import React, { useState } from 'react';
import { Todo, generateUUID } from './types';
import { IoMdCloseCircle } from 'react-icons/io';
import TodoItemComponent from './TodoItem';

interface TodoComponentProps { }

const TodoComponent: React.FC<TodoComponentProps> = () => {
    const [todoList, setTodoList] = useState<Todo[]>([
        {
            id: generateUUID(),
            title: 'Todo 1',
        },
        {
            id: generateUUID(),
            title: 'Todo 2',
        },
    ]);

    const [newTodo, setNewTodo] = useState<string>('');

    const addTodo = () => {
        if (newTodo) {
            const newTodoItem: Todo = {
                id: generateUUID(),
                title: newTodo,
            };
            setTodoList((prevTodoList) => [...prevTodoList, newTodoItem]);
            setNewTodo(''); // Clear the input field after adding a todo.
        }
    };

    return (
        <>
            <div className='fixed backdrop-blur-md w-full h-full top-0 left-0 z-10'>
                <div className='bg-white rounded-md w-[500px] h-auto p-5 top-[15%] absolute left-[35%]'>
                    <h1 className='flex items-center justify-between font-bold'>Todo List <span><IoMdCloseCircle size={25} color='red' /></span></h1>
                    <div className='mb-5 h-[570px] overflow-y-auto'>
                        {todoList.map((item) => (
                            <div className='border-2 p-2 rounded-md my-2'>
                                <div key={item.id}>
                                    <p>{item.title}</p>
                                </div>
                                <TodoItemComponent />
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
