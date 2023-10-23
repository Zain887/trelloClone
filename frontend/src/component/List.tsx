import React, { useState } from 'react';
import CardComponent from './commonComponent/Card';
import { List, generateUUID } from '../component/commonComponent/types';
import { DropResult, DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
const ListComponent: React.FC = () => {
    const [list, setList] = useState<List[]>([
        {
            listId: generateUUID(),
            listTitle: 'list',
            edit: false,
            card: [],
        },
    ]);

    const updateColumTitle = (listId: string) => {
        const updatedList = list.map((listItem) => {
            if (listItem.listId === listId) {
                if (listItem.listTitle === "list") {
                    return { ...listItem, edit: true };
                }
            }
            return listItem;
        });
        setList(updatedList);
    };

    const columTilteEdit = (listId: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedList = list.map((listItem) => {
            if (listItem.listId === listId) {
                return { ...listItem, listTitle: event.target.value };
            }
            return listItem;
        });
        setList(updatedList);
    };

    const columTilteUpdated = (listId: string) => {
        const updatedList = list.map((listItem) => {
            if (listItem.listId === listId) {
                return { ...listItem, edit: false };
            }
            return listItem;
        });
        setList(updatedList);
    };

    const addNewlist = () => {
        const newlist = [...list];
        const newlistTitle = 'list';
        newlist.push({
            listId: generateUUID(),
            listTitle: newlistTitle,
            edit: false,
        });
        setList(newlist);
    };

    const addNewCard = (listId: string) => {
        const updatedList = list.map((listItem) => {
            if (listItem.listId === listId) {
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
                <div key={list.listId} className={`p-3 bg-[#101204] md:w-[380px] rounded-xl h-fit ml-3`}>
                    <div className='flex justify-between items-center pb-3'>
                        {list.edit ? (
                            <input
                                type='text'
                                onChange={(event) => columTilteEdit(list.listId, event)}
                                onBlur={() => columTilteUpdated(list.listId)}
                                autoFocus
                                value={list.listTitle}
                                className='text-[#AEB9C5] text-sm bg-transparent outline-none w-full'
                            />
                        ) : (
                            <p className='text-[#AEB9C5] text-sm hover:text-red-500 cursor-pointer' onClick={() => updateColumTitle(list.listId)}>
                                {list.listTitle}
                            </p>
                        )}
                        <img
                            className='md:w-5 md:h-5 hover:bg-red-500 rounded-sm cursor-pointer'
                            src='/assetes/more.svg'
                            alt='more'
                        />
                    </div>
                    <div className='md:max-h-[698px] overflow-y-scroll'>
                        {/* {list.card?.map((cardItem) => (
                            <CardComponent key={cardItem.cardId} />
                        ))} */}
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
                        <div className='flex items-center gap-2 cursor-pointer text-[#AEB9C5] hover:text-red-500' onClick={() => addNewCard(list.listId)}>
                            <p className='text-lg'>+</p>
                            <p className='text-sm'>Add a Card</p>
                        </div>
                        <img className='md:w-5 md:h-5 hover:bg-red-500 rounded-sm cursor-pointer' src='/assetes/addform.svg' alt='more' />
                    </div>
                </div>
            ))}
            <button className='bg-blue-500 w-[179px] mx-3 px-6 h-12 rounded-lg font-bold hover:text-orange-600 hover:bg-black' onClick={addNewlist}>
                Add Another List
            </button>
        </div>
    );
};

export default ListComponent;
