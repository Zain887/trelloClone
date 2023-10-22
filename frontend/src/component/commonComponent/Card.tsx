import React, { useState } from 'react';
import { List, Card } from '../commonComponent/types';
import { v4 as uuid } from 'uuid';

const CardComponent: React.FC = () => {
    const [list, setList] = useState<List[]>([
        {
            listId: uuid(),
            card: [
                {
                    cardId: uuid(),
                    cardTitle: 'Your Card Title',
                    edit: false,
                },
            ],
        },
    ]);

    const handleEditCard = (listId: string, cardId: string) => {
        const updatedList = list.map((listItem) => {
            if (listItem.listId === listId) {
                const updatedCardList = listItem.card?.map((card) => {
                    if (card.cardId === cardId) {
                        if (card.cardTitle === 'Your Card Title') {
                            return { ...card, edit: true };
                        }
                    }
                    return card;
                });
                return { ...listItem, card: updatedCardList };
            }
            return listItem;
        });

        setList(updatedList);
    };


    const handleCardTitleChange = (listId: string, cardId: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedList = list.map((listItem) => {
            if (listItem.listId === listId) {
                const updatedCardList = listItem.card?.map((card) => {
                    if (card.cardId === cardId) {
                        return { ...card, cardTitle: event.target.value };
                    }
                    return card;
                });
                return { ...listItem, card: updatedCardList };
            }
            return listItem;
        });

        setList(updatedList);
    };

    const handleSaveCard = (listId: string, cardId: string) => {
        const updatedList = list.map((listItem) => {
            if (listItem.listId === listId) {
                const updatedCardList = listItem.card?.map((card) => {
                    if (card.cardId === cardId) {
                        return { ...card, edit: false };
                    }
                    return card;
                });
                return { ...listItem, card: updatedCardList };
            }
            return listItem;
        });

        setList(updatedList);
    };


    return (
        <>
            {list.map((column, listIndex) => (
                <div key={column.listId} className='my-5'>
                    {column.card?.map((card, cardIndex) => (
                        <div key={card.cardId} className='bg-[#282E33] mb-2 rounded-lg p-3 h-auto break-words relative'>
                            {card.edit ? (
                                <input
                                    type='text'
                                    autoFocus
                                    value={card.cardTitle}
                                    onChange={(e) => handleCardTitleChange(column.listId, card.cardId, e)}
                                    onBlur={() => handleSaveCard(column.listId, card.cardId)}
                                    className='text-[#AEB9C5] text-sm bg-transparent outline-none w-full'
                                />
                            ) : (
                                <p
                                    className='text-[#AEB9C5] text-sm bg-transparent outline-none w-full cursor-pointer'
                                    onClick={() => handleEditCard(column.listId, card.cardId)}
                                >
                                    {card.cardTitle}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default CardComponent;
