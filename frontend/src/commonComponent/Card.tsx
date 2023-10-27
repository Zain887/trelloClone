import React, { useEffect, useState } from 'react';
import { Card } from '../commonComponent/types';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import axios from 'axios';
import TodoComponent from './Todo';
import { CgClose } from 'react-icons/cg';
import OneSpotAccess from '../modal/OneSpotAccess';

interface CardComponentProps {
	listID: string | undefined;
}

const CardComponent: React.FC<CardComponentProps> = ({ listID }) => {
	const [card, setCard] = useState<Card[]>([]);
	const [cardTitle, setCardTitle] = useState('');
	const [currentCardId, setCurrentCardId] = useState('');
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [currentCardTitle, setCurrentCardTitle] = useState('');

	const cardTitleEdit = () => {
		setIsFormOpen(true);
	};

	useEffect(() => {
		const fetchCard = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/card/list/${listID}`);
				const cardData = response.data;
				setCard(cardData);
			} catch (error) {
				console.error('Error fetching data from the API', error);
			}
		};
		if (listID) {
			fetchCard();
		}
	}, []);

	const AddnewCard = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!cardTitle) {
			console.log('Card title is required.');
			return;
		}
		try {
			const response = await axios.post(`http://localhost:5000/card/${listID}`, {
				title: cardTitle,
			});
			if (response.status === 201) {
				console.log('Data sent successfully.');
				setCardTitle('');
				setIsFormOpen(false);
				const updatedResponse = await axios.get(`http://localhost:5000/card/list/${listID}`);
				const updatedListData = updatedResponse.data;
				setCard(updatedListData);
			} else {
				console.error('Failed to send data.');
			}
		} catch (error) {
			console.error('Error sending data:', error);
		}
	};

	const deleteTodoItem = async (id: string) => {
		try {
			await axios.delete(`http://localhost:5000/card/${id}`);
			setCard((prevTodoList) => prevTodoList.filter((item) => item.id !== id));
		} catch (error) {
			console.error(error);
		}
	}

	const openCardController = (id: string) => {
		setCurrentCardId(id)
		const cardToOpen = card.find((item) => item.id === id);
		if (cardToOpen) {
			setCurrentCardTitle(cardToOpen.title);
			openModal();
		}
	};

	const [isModalOpen, setModalOpen] = useState(false);
	const openModal = () => {
		setModalOpen(true);
	};
	const closeModal = () => {
		setModalOpen(false);
	};
	return (
		<>
			<div className='md:max-h-[698px] overflow-y-scroll'>
				<div className='my-5'>
					{card.map((item) => (
						<div key={item.id} className='bg-[#282E33] mb-2 rounded-lg p-3 h-auto break-words relative'>
							<div className='float-right flex gap-2'>
								<MdModeEditOutline size={20} color='White' className='cursor-pointer' onClick={() => openCardController(item.id)} />
								<MdDelete size={20} color='red' className='cursor-pointer' onClick={() => deleteTodoItem(item.id)} />
							</div>
							<p className='text-[#AEB9C5] text-sm bg-transparent outline-none w-full cursor-pointer'>
								{item.title}
							</p>
						</div>
					))}
					<OneSpotAccess isModalOpen={isModalOpen} onRequestClose={closeModal} cardTitle={currentCardTitle} cardId={currentCardId}/>
				</div>
				{isFormOpen ? (
					<div className='h-auto w-full'>
						<form onSubmit={AddnewCard} className='h-auto'>
							<textarea
								placeholder='Edit a title for this card...'
								id='cardTitle'
								name='cardTitle'
								value={cardTitle}
								onChange={(e) => setCardTitle(e.target.value)}
								className='outline-none w-full px-3 py-2 mt-2 text-gray-700 rounded-md border border-gray-300'
							/>
							<div className='flex items-center gap-4'>
								<button
									type='submit'
									className='bg-blue-500 text-white font-bold py-1 px-2 text-sm rounded-sm hover:bg-blue-700'>
									Add card
								</button>
								<CgClose size={20} color='White' onClick={() => setIsFormOpen(false)} className=' hover:bg-red-200 hover:rounded-sm cursor-pointer' />
							</div>
						</form>
					</div>
				) : (
					<div className='flex justify-between items-center pt-3'>
						<div className='flex items-center gap-2 cursor-pointer text-[#AEB9C5] hover-text-red-500' onClick={cardTitleEdit}>
							<p className='text-lg'>+</p>
							<p className='text-sm'>Add a Card</p>
						</div>
						<img className='md:w-5 md:h-5 hover-bg-red-500 rounded-sm cursor-pointer' src='/assetes/addform.svg' alt='more' />
					</div>
				)}
			</div>

		</>
	);
};

export default CardComponent;
