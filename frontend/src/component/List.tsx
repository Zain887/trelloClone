import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardComponent from '../commonComponent/Card';
import { List, generateUUID } from '../commonComponent/types';
import { DropResult, DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';
const ListComponent: React.FC = () => {
    const { boardId } = useParams();
    const [list, setList] = useState<List[]>([]);
    const [listDelete, setListDelete] = useState<string>("");

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

    const addNewlist = async (boardId: string, newTitle: string) => {
        try {
            const response = await axios.post(`http://localhost:5000/list/${boardId}`, {
                title: newTitle,
            });
            const newList = response.data;
            setList((prevLists) => [...prevLists, newList]);
        } catch (error) {
            console.error('Error adding a new list', error);
        }
    };

    const handleAddNewListClick = () => {
        if (boardId) {
            addNewlist(boardId, 'list');
        } else {
            console.error('boardId is undefined');
        }
    };

    const updateColumTitle = async (id: string | undefined, newTitle: string | undefined) => {
        try {
            const response = await axios.patch(`http://localhost:5000/list/${id}`, {
                title: newTitle,
            });

            if (response.status === 200) {
                const updatedList = list.map((listItem) => {
                    if (listItem.id === id) {
                        return { ...listItem, title: newTitle, edit: true };
                    }
                    return listItem;
                });
                setList(updatedList);
            } else {
                console.error('Failed to update list title');
            }
        }
        catch (error) {
            console.error('Error updating list title:', error);
        }
    };

    const columTilteEdit = (id: string | undefined, event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedList = list.map((listItem) => {
            if (listItem.id === id) {
                return { ...listItem, title: event.target.value };
            }
            return listItem;
        });
        setList(updatedList);
    };

    const columTilteUpdated = async (id: string | undefined, newTitle: string | undefined) => {
        try {
            const response = await axios.patch(`http://localhost:5000/list/${id}`, {
                title: newTitle,
            });

            if (response.status === 200) {
                const updatedList = list.map((listItem) => {
                    if (listItem.id === id) {
                        return { ...listItem, title: newTitle, edit: false };
                    }
                    return listItem;
                });
                setList(updatedList);
            } else {
                console.error('Failed to update list title');
            }
        }
        catch (error) {
            console.error('Error updating list title:', error);
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
        <div className='inline-flex items-start'>
            {list.map((list) => (
                <div key={list.id} className={`p-3 bg-[#101204] md:w-[380px] rounded-xl h-fit ml-3`}>
                    <div className='flex justify-between items-center pb-3 relative'>
                        {list.edit ? (
                            <input
                                type='text'
                                onChange={(event) => columTilteEdit(list.id, event)}
                                onBlur={() => columTilteUpdated(list.id, list.title)}
                                autoFocus
                                value={list.title}
                                className='text-[#AEB9C5] text-sm bg-transparent outline-none w-full'
                            />
                        ) : (
                            <p className='text-[#AEB9C5] text-sm hover:text-red-500 cursor-pointer' onClick={() => updateColumTitle(list.id, list.title)}>
                                {list.title}
                            </p>
                        )}
                        <img
                            className='md:w-5 md:h-5 hover:bg-red-500 rounded-sm cursor-pointer'
                            src='/assetes/more.svg'
                            alt='more'
                            onClick={() => deletePop(list.id)}
                        />
                        {!!listDelete && list.id === listDelete && (
                            <div className='bg-white h-auto w-auto p-5 rounded-md shadow-lg absolute right-0 top-0 z-10'>
                                <p>Are You Sure You Want to Delet this List</p>
                                <button className='text-sm text-red-500 font-bold bg-black px-3 py-1 rounded-md' onClick={() => deleteList(list.id)}>Confirm</button>
                            </div>
                        )}
                    </div>
                    <CardComponent listID={list.id} />
                </div>
            ))}
            <button className='bg-blue-500 w-[179px] mx-3 px-6 h-12 rounded-lg font-bold hover:text-orange-600 hover:bg-black' onClick={handleAddNewListClick}>
                Add Another List
            </button>
        </div>
    );
};

export default ListComponent;
