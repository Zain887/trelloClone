import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsTextParagraph } from 'react-icons/bs'

interface Props {
    cardID: string
}

const CardDescription: React.FC<Props> = ({ cardID }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState("Add a more detailed description...");

    useEffect(() => {
        const fetchDescription = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/card/${cardID}`);
                if (response.status === 200) {
                    setDescription(response.data.description);
                }
            } catch (error) {
                console.error('Error fetching description:', error);
            }
        };

        fetchDescription();
    }, [cardID]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.patch(`http://localhost:5000/card/${cardID}`, {
                description: description,
            });
            if (response.status === 200) {
                console.log('card Description Edit Successfully')
            }
        } catch (error) {
            console.error('Error updating description:', error);
        }

        setIsEditing(false);
    };


    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    return (
        <>
            <div className='flex items-start mb-3'>
                <BsTextParagraph size={20} />
                <p className='pl-2 font-bold text-[#263858] text-lg'>Description</p>
            </div>
            {isEditing ? (
                <div className='pl-[30px]'>
                    <textarea
                        value={description}
                        onChange={handleChange}
                        rows={4}
                        className='text-sm bg-[#E4E6EA] p-2 rounded-sm w-full hover:bg-gray-300 cursor-pointer'
                    ></textarea>
                    <div className='mt-2'>
                        <button onClick={handleSaveClick} className='bg-blue-500 text-white text-sm px-2 py-1 rounded-sm mr-2'>Save</button>
                        <button onClick={handleCancelClick} className='hover:bg-gray-300 text-black px-2 text-sm py-1 rounded-sm'>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className='pl-[30px]'>
                    <p
                        onClick={handleEditClick}
                        className='text-sm min-h-14 bg-[#E4E6EA] p-2 rounded-sm w-full hover:bg-gray-300 cursor-pointer'
                    >
                        {description}
                    </p>
                </div>
            )}
        </>
    );
};

export default CardDescription;
