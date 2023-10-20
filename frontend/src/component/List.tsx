import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { List } from '../component/commonComponent/types';
import CardComponent from './commonComponent/Card';
// import Card from './Card';

const ListComponent: React.FC = () => {
    const [list, setList] = useState<List[]>([
        {
            listId: uuid(),
            listTitle: 'list',
            edit: false,
            card: []
        },
    ]);

    const updateColumTitle = (listId: string) => {
        const updatedList = list.map((listItem) => {
            if (listItem.listId === listId) {
                return { ...listItem, edit: true };
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
        const newlistTitle = `list ${newlist.length + 1}`;
        newlist.push({
            listId: uuid(),
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
                    cardId: uuid(),
                });
            }
            return listItem;
        });

        setList(updatedList);
    };


    const [addNewCardData, setAddNewCardData] = useState<boolean>(false);

    return (
        <div className='inline-flex items-center'>
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
                        {list.card?.map((cardItem) => (
                            <CardComponent key={cardItem.cardId} />
                        ))}
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
            {addNewCardData && (
                <div className='backdrop-blur-md bg-[#80808087] w-screen h-screen fixed top-0 left-0 z-20'>
                    <form className=' absolute top-[30%] left-[35%] w-[500px]'>
                        <div className='mt-5 grid'>
                            <label htmlFor='' className='text-black font-bold text-xl'>Title</label>
                            <input type='text' className='h-[40px] rounded-md' />
                        </div>
                        <div className='mt-5 grid'>
                            <label htmlFor='' className='text-black font-bold text-xl'>Description</label>
                            <input type='text' className='h-[40px] rounded-md' />
                        </div>
                        <button type='submit' className='bg-black text-white font-bold w-full h-10 text-3xl rounded mt-5'>Add</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ListComponent;