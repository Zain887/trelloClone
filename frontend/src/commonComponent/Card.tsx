import React, { useState } from 'react';
import { List, Todo, generateUUID } from './types';
import {MdModeEditOutline} from 'react-icons/md';
import TodoComponent from './Todo';

const CardComponent: React.FC = () => {
	const [list, setList] = useState<List[]>([
		{
			id: generateUUID(),
			card: [
				{
					cardId: generateUUID(),
					cardTitle: 'Edit Your Card Title',
					edit: false,
					todos: [],
					createTodo: false,
				},
			],
		},
	]);

	const handleEditCard = (id: string | undefined, cardId: string) => {
		const updatedList = list.map((listItem) => {
			if (listItem.id === id) {
				const updatedCardList = listItem.card?.map((card) => {
					if (card.cardId === cardId) {
						if (card.cardTitle === 'Edit Your Card Title') {
							return { ...card, edit: true };
						}
						return card;
					}
					return card;
				});
				return { ...listItem, card: updatedCardList };
			}
			return listItem;
		});
		setList(updatedList);
	};

	const handleUpdateTodo = (id: string | undefined, cardId: string, updatedTodo: Todo) => {
		const updatedList = list.map((listItem) => {
			if (listItem.id === id) {
				const updatedCardList = listItem.card?.map((card) => {
					if (card.cardId === cardId) {
						const updatedTodos = card.todos?.map((todo) => {
							if (todo.todoId === updatedTodo.todoId) {
								return updatedTodo;
							}
							return todo;
						});

						const updatedCard = { ...card, todos: updatedTodos };

						return updatedCard;
					}
					return card;
				});
				return { ...listItem, card: updatedCardList };
			}
			return listItem;
		});
		setList(updatedList);
	};

	const handleCardTitleChange = (id: string | undefined, cardId: string, event: React.ChangeEvent<HTMLInputElement>) => {
		const updatedList = list.map((listItem) => {
			if (listItem.id === id) {
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

	const handleSaveCard = (id: string | undefined, cardId: string) => {
		const updatedList = list.map((listItem) => {
			if (listItem.id === id) {
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
			{list.map((column) => (
				<div key={column.id} className='my-5'>
					{column.card?.map((card) => (
						<div key={card.cardId} className='bg-[#282E33] mb-2 rounded-lg p-3 h-auto break-words relative flex'>
							{card.edit ? (
								<input
									type='text'
									autoFocus
									value={card.cardTitle}
									onChange={(e) => handleCardTitleChange(column.id, card.cardId, e)}
									onBlur={() => handleSaveCard(column.id, card.cardId)}
									className='text-[#AEB9C5] text-sm bg-transparent outline-none w-full'
								/>
							) : (
								<p
									className='text-[#AEB9C5] text-sm bg-transparent outline-none w-full cursor-pointer'
									onClick={() => handleEditCard(column.id, card.cardId)}
								>
									{card.cardTitle}
								</p>
							)}
							<MdModeEditOutline size={20} color='White' onClick={()=>{console.log(column.id)}}/>
							{card.todos?.map((todo) => (
								<TodoComponent
									key={todo.todoId}
									todo={todo}
									onUpdateTodo={(updatedTodo) =>
										handleUpdateTodo(column.id, card.cardId, updatedTodo)
									}
								/>

							))}
							{/* <button className='w-full text-white hover:text-green-500' onClick={() => handleCreateTodo(column.id, card.cardId)}>Create new Task</button> */}
						</div>
					))}
				</div>
			))}
		</>
	);
};

export default CardComponent;
