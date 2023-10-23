import React, { useState } from 'react';
import { Todo } from './types';
import TodoItemComponent from './TodoItem';

interface TodoComponentProps {
    todo: Todo;
    onUpdateTodo: (updatedTodo: Todo) => void;
}

const TodoComponent: React.FC<TodoComponentProps> = ({ todo, onUpdateTodo }) => {
    const [editedTodo, setEditedTodo] = useState(todo);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleUpdateClick = () => {
        setIsEditing(false);
        onUpdateTodo(editedTodo);
    };

    return (
        <div className='w-full h-auto overflow-hidden mt-5 pt-2 border-t-2 border-red-500'>
            {isEditing ? (
                <div>
                    <input
                        className='w-full h-auto outline-none p-2'
                        type="text"
                        value={editedTodo.name}
                        onChange={(e) => setEditedTodo({ ...editedTodo, name: e.target.value })}
                    />
                    <input
                        className='outline-none w-full h-auto p-2'
                        type="text"
                        value={editedTodo.description}
                        onChange={(e) => setEditedTodo({ ...editedTodo, description: e.target.value })}
                    />
                    <button onClick={handleUpdateClick} className='bg-green-500 w-full rounded-md text-white font-bold my-2'>Update Todo</button>
                </div>
            ) : (
                <div className='w-full overflow-hidden break-words'>
                    <h1 className='text-white'>{todo.name}</h1>
                    <p className='text-white font-light'>{todo.description}</p>
                    <button onClick={handleEditClick} className='bg-red-500 w-full rounded-md text-white font-bold my-2'>Edit Todo</button>
                </div>
            )}
            <TodoItemComponent/>
        </div>
    );
};

export default TodoComponent;
