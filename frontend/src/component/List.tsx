import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardComponent from '../commonComponent/Card';
import { List} from '../commonComponent/types';
import { CgClose } from 'react-icons/cg';
import axios from 'axios';

const ListComponent: React.FC = () => {
    const { boardId } = useParams();
    const [list, setList] = useState<List[]>([]);
    const [listDelete, setListDelete] = useState<string>("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newListTitle, setNewListTitle] = useState('');

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/list/board/${boardId}`);
                const listData = response.data;
                setList(listData);
            } catch (error) {
                console.error('Error fetching data from the API', error);
            }
        };
        fetchList();
    }, []);

    const addNewlist = async (boardId: string, title: string) => {
        try {
            const response = await axios.post(`http://localhost:5000/list/${boardId}`, {
                title: title,
            });

            const newList = response?.data;
            setList((prevLists) => [...prevLists, newList]);
        } catch (error) {
            console.error('Error adding a new list', error);
        }
    };

    const handleAddNewListClick = () => {
        setIsFormOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newListTitle.trim() === '') {
            console.error('List title cannot be empty.');
            return;
        }

        if (boardId) {
            addNewlist(boardId, newListTitle);
            setNewListTitle('');
            setIsFormOpen(false);
        } else {
            console.error('boardId is undefined');
        }
    };

    const deleteList = async (id: string | undefined) => {
 
        try {
            const response = await axios.delete(`http://localhost:5000/list/${id}`);
            if (response.status === 200) {
                if (id) {
                    const updatedLists = list.filter((list) => list.id !== id);
                    setList(updatedLists);
                } else {
                    console.log('noMatched');
                }
            }
        } catch (error) {
            console.error('Error deleting list:', error);
        }
    };

    const deletePop = (id: string | undefined) => {
        if (id) {
            setListDelete(id);
        } else {
            console.log('noMatched');
        }
    }

    return (
        <div className='items-start flex'>
            {list.map((list) => (
                <div key={list.id} className={`p-3 bg-[#101204] w-[380px] rounded-xl h-fit ml-3`}>
                    <div className='flex justify-between items-center pb-3 relative'>
                        <p className='text-[#AEB9C5] text-sm hover:text-red-500 cursor-pointer'>
                            {list.title}
                        </p>
                        <img
                            className='md:w-5 md:h-5 hover:bg-red-500 rounded-sm cursor-pointer'
                            src='/assetes/more.svg'
                            alt='more'
                            onClick={() => deletePop(list.id)}
                        />
                        {!!listDelete && list.id === listDelete && (
                            <div className='bg-white h-auto w-auto p-5 rounded-md shadow-lg absolute right-0 top-0 z-10'>
                                <p>Are You Sure You Want to Delete this List</p>
                                <button className='text-sm text-red-500 font-bold bg-black px-3 py-1 rounded-md' onClick={() => deleteList(list.id)}>Confirm</button>
                            </div>
                        )}
                    </div>
                    <CardComponent listID={list.id} />
                </div>
            ))}
            {isFormOpen ? (
                <form onSubmit={handleSubmit} className='h-fit w-[300px] mx-3 bg-white p-2 rounded-lg'>
                    <input
                        type='text'
                        placeholder='Enter a title for the new list...'
                        id='newListTitle'
                        name='newListTitle'
                        value={newListTitle}
                        onChange={(e) => setNewListTitle(e.target.value)}
                        className='w-full outline-none px-3 py-2 mt-2 text-gray-700 rounded-md border-none mb-3'
                    />
                    <div className='flex items-center gap-4'>
                        <button
                            type='submit'
                            className='bg-blue-500 text-white font-bold py-1 px-2 text-sm rounded-sm hover:bg-blue-700'>
                            Add List
                        </button>
                        <CgClose size={20} color='black' onClick={() => setIsFormOpen(false)} className='hover:bg-red-200 hover:rounded-sm cursor-pointer' />
                    </div>
                </form>
            ) : (
                <button className='bg-blue-500 w-[300px] mx-3 px-6 h-12 rounded-lg font-bold hover:text-orange-600 hover:bg-black' onClick={handleAddNewListClick}>
                    Add Another List
                </button>
            )}
        </div>
    );
};

export default ListComponent;
