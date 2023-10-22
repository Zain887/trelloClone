import React, { useState } from 'react';
import { List, Todo, generateUUID } from '../commonComponent/types';
import TodoComponent from './Todo';

const CardComponent: React.FC = () => {
	const [list, setList] = useState<List[]>([
		{
			listId: generateUUID(),
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

	const handleEditCard = (listId: string, cardId: string) => {
		const updatedList = list.map((listItem) => {
			if (listItem.listId === listId) {
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

	const handleCreateTodo = (listId: string, cardId: string) => {
		const updatedList = list.map((listItem) => {
			if (listItem.listId === listId) {
				const updatedCardList = listItem.card?.map((card) => {
					if (card.cardId === cardId) {
						const newTodo: Todo = {
							todoId: generateUUID(),
							name: 'New Task Name',
							description: 'New Task Description',
						};
						const updatedCard = { ...card };

						if (updatedCard.todos === undefined) {
							updatedCard.todos = [newTodo];
						} else {
							updatedCard.todos.push(newTodo);
						}
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

	const handleUpdateTodo = (listId: string, cardId: string, updatedTodo: Todo) => {
		const updatedList = list.map((listItem) => {
			if (listItem.listId === listId) {
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
			{list.map((column) => (
				<div key={column.listId} className='my-5'>
					{column.card?.map((card) => (
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

							{card.todos?.map((todo) => (
								<TodoComponent
									key={todo.todoId}
									todo={todo}
									onUpdateTodo={(updatedTodo) =>
										handleUpdateTodo(column.listId, card.cardId, updatedTodo)
									}
								/>
							))}
							<button className='w-full text-white hover:text-green-500' onClick={() => handleCreateTodo(column.listId, card.cardId)}>Create new Task</button>
						</div>
					))}
				</div>
			))}
		</>
	);
};

export default CardComponent;
