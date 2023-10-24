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

    const addNewCard = (id: string | undefined) => {
        const updatedList = list.map((listItem) => {
            if (listItem.id === id) {
                const newCardTitle = `card${listItem.card ? listItem.card.length + 1 : 1}`;
                if (!listItem.card) {
                    listItem.card = [];
                }
                listItem.card.push({
                    cardTitle: newCardTitle,
                    edit: false,
                    cardId: generateUUID(),
                });
            }
            return listItem;
        });
        setList(updatedList);
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

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }
        const updatedList = list.map(listItem => ({
            ...listItem,
            card: listItem.card ? [...listItem.card] : undefined,
        }));
        const sourceList = updatedList[Number(source.droppableId)];
        const destList = updatedList[Number(destination.droppableId)];
        if (!sourceList || !destList) {
            return;
        }
        if (sourceList.card && destList.card) {
            const movedCard = sourceList.card[source.index];
            sourceList.card.splice(source.index, 1);
            destList.card.splice(destination.index, 0, movedCard);
        }
        setList(updatedList);
    };

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
                    <div className='md:max-h-[698px] overflow-y-scroll'>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        {list.card?.map((item, index) => (
                                            <Draggable key={item.cardId} draggableId={item.cardId.toString()} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <CardComponent key={item.cardId} /* Pass data to your CardComponent here */ />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                    <div className='flex justify-between items-center pt-3'>
                        <div className='flex items-center gap-2 cursor-pointer text-[#AEB9C5] hover:text-red-500' onClick={() => addNewCard(list.id)}>
                            <p className='text-lg'>+</p>
                            <p className='text-sm'>Add a Card</p>
                        </div>
                        <img className='md:w-5 md:h-5 hover:bg-red-500 rounded-sm cursor-pointer' src='/assetes/addform.svg' alt='more' />
                    </div>
                </div>
            ))}
            <button className='bg-blue-500 w-[179px] mx-3 px-6 h-12 rounded-lg font-bold hover:text-orange-600 hover:bg-black' onClick={handleAddNewListClick}>
                Add Another List
            </button>
        </div>
    );
};

export default ListComponent;
