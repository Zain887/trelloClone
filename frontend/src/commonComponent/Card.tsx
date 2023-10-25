import React, { useEffect, useState } from 'react';
import { Card } from '../commonComponent/types';
import { MdModeEditOutline } from 'react-icons/md';
import axios from 'axios';
import TodoComponent from './Todo';

interface CardComponentProps {
	listID: string | undefined;
}

const CardComponent: React.FC<CardComponentProps> = ({ listID }) => {
	const [card, setCard] = useState<Card[]>([]);
	const [cardTitle, setCardTitle] = useState('');
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [cardDescription, setCardDescription] = useState('');

	const handleEditClick = () => {
		setIsFormOpen(true);
	};

	useEffect(() => {
		const fetchCard = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/card/list/${listID}`);
				const listData = response.data;
				setCard(listData);
			} catch (error) {
				console.error('Error fetching data from the API', error);
			}
		};
		if (listID) {
			fetchCard();
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!cardTitle || !cardDescription) {
			console.log('Card title and description are required.');
			return;
		}
		try {
			const response = await axios.post(`http://localhost:5000/card/${listID}`, {
				title: cardTitle,
				description: cardDescription,
			});
			if (response.status === 201) {
				console.log('Data sent successfully.');
				setCardTitle('');
				setCardDescription('');
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
	return (
		<>
			<div className='md:max-h-[698px] overflow-y-scroll'>
				<div className='my-5'>
					{card.map((item) => (
						<div key={item.id} className='bg-[#282E33] mb-2 rounded-lg p-3 h-auto break-words relative'>
							<div className='float-right'>
								<MdModeEditOutline size={20} color='White' />
							</div>
							<p className='text-[#AEB9C5] text-sm bg-transparent outline-none w-full cursor-pointer'>
								{item.title}
							</p>
							<p className='text-[#AEB9C5] text-sm bg-transparent outline-none w-full cursor-pointer'>
								{item.description}
							</p>
							<TodoComponent/>
						</div>
					))}
				</div>
				{isFormOpen && (
					<div className='h-full w-full fixed top-0 left-0 backdrop-blur-md z-10'>
						<form onSubmit={handleSubmit} className='bg-white w-[500px] h-auto p-5 rounded-md shadow-md absolute top-[35%] left-[35%]'>
							<label htmlFor='cardTitle' className='block text-gray-700 text-sm font-bold'>Card Title</label>
							<input
								type='text'
								id='cardTitle'
								name='cardTitle'
								value={cardTitle}
								onChange={(e) => setCardTitle(e.target.value)}
								className='w-full px-3 py-2 mt-2 text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400'
							/>
							<label htmlFor='cardDescription' className='block text-gray-700 text-sm font-bold mt-4'>Card Description</label>
							<input
								type='text'
								id='cardDescription'
								name='cardDescription'
								value={cardDescription}
								onChange={(e) => setCardDescription(e.target.value)}
								className='w-full px-3 py-2 mt-2 text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400'
							/>
							<div className='flex justify-between items-center'>
								<button
									type='submit'
									className='mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700'>
									Create
								</button>
								<button
									className='mt-4 ml-2 text-red-500 font-bold py-2 px-4 rounded-md hover:bg-red-100' onClick={() => setIsFormOpen(false)}>
									Cancel
								</button>
							</div>
						</form>
					</div>
				)}
			</div>
			<div className='flex justify-between items-center pt-3'>
				<div className='flex items-center gap-2 cursor-pointer text-[#AEB9C5] hover:text-red-500' onClick={handleEditClick}>
					<p className='text-lg'>+</p>
					<p className='text-sm'>Add a Card</p>
				</div>
				<img className='md:w-5 md:h-5 hover:bg-red-500 rounded-sm cursor-pointer' src='/assetes/addform.svg' alt='more' />
			</div>
		</>
	);
};

export default CardComponent;
