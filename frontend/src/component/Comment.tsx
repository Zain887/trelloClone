import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { RxActivityLog } from 'react-icons/rx';
import { Comment } from '../commonComponent/types';

interface Props {
    cardID: string;
}

const CommentComponent: React.FC<Props> = ({ cardID }) => {
    const [hideBtn, setHideBtn] = useState<string>('Hide Details');
    const [isEditing, setIsEditing] = useState(false);
    const [comment, setComment] = useState<string>('');
    const [editComment, setEditComment] = useState<string>('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [editingCommentID, setEditingCommentID] = useState<string | null>(null);
    const [userID, setUserID] = useState<string | null>(null);

    useEffect(() => {
        // Fetch comments when the component mounts
        fetchComments();
        // Get the user ID from local storage
        const storedUserID = localStorage.getItem('userId');
        setUserID(storedUserID);
    }, [cardID]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/comment/card/${cardID}`);
            if (response.status === 200) {
                setComments(response.data);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleClick = () => {
        if (hideBtn === 'Hide Details') {
            setHideBtn('Show Details');
        } else {
            setHideBtn('Hide Details');
        }
    };

    const handleCommentClick = () => {
        setIsEditing(true);
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleEditComment = async (id: string) => {
        if (editComment.trim() === '') {
            return;
        }

        try {
            const response = await axios.patch(`http://localhost:5000/comment/${id}`, {
                comment: editComment, // Send the edited comment
            });

            if (response.status === 200) {
                // Replace the edited comment in the client-side comments
                const updatedComments = comments.map((c) =>
                    c.id === id ? { ...c, comment: editComment } : c
                );
                setComments(updatedComments);
                setEditingCommentID(null); // Clear editing state
                setIsEditing(false);
                setEditComment(''); // Clear the edited comment text
            } else {
                console.error('Failed to save the edited comment.');
            }
        } catch (error) {
            console.error('Error saving the edited comment:', error);
        }
    };

    const handleDeleteComment = async (id: string) => {
        try {
            const response = await axios.delete(`http://localhost:5000/comment/${id}`);
            if (response.status === 200) {
                const updatedComments = comments.filter((c) => c.id !== id);
                setComments(updatedComments);
            } else {
                console.error('Failed to delete the comment.');
            }
        } catch (error) {
            console.error('Error deleting the comment:', error);
        }
    };

    const handleSaveClick = async () => {
        if (comment.trim() === '') {
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/comment/card/${cardID}?userId=${userID}`, {
                comment: comment,
            });

            if (response.status === 201) {
                setComments((prevComments) => [...prevComments, response.data]);
                setIsEditing(false);
                setComment('');
            } else {
                console.error('Failed to save the comment.');
            }
        } catch (error) {
            console.error('Error saving the comment:', error);
        }
    };

    return (
        <>
            <div className='flex justify-between items-center'>
                <div className='flex items-center mb-3 mt-5'>
                    <RxActivityLog size={16} />
                    <p className='pl-2 font-bold text-[#263858] text-lg'>Activity</p>
                </div>
                <p className='text-[14px] bg-[#E4E6EA] hover:bg-gray-300 cursor-pointer rounded-sm mt-2 px-2 py-1' onClick={handleClick}>
                    {hideBtn}
                </p>
            </div>
            <div className="flex items-start gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                {isEditing ? (
                    <div className='w-full'>
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            className="p-3 font-normal text-sm w-full outline-none rounded-lg shadow-md hover:bg-slate-100"
                            value={comment}
                            onChange={handleCommentChange}
                        />
                        <div className='flex items-center'>
                            <button onClick={handleSaveClick} disabled={comment.trim() === ''} className={`px-3 rounded-sm text-white my-4 mr-3 ${comment.trim() === '' ? 'bg-gray-400' : 'bg-blue-600'}`}>
                                Save
                            </button>
                            <input type="checkbox" className='w-4 h-4 mr-3' /><label>Watch</label>
                        </div>
                    </div>
                ) : (
                    <p
                        className="font-normal text-sm text-[#263858] cursor-pointer p-3 bg-white w-full rounded-lg shadow-md hover:bg-slate-100"
                        onClick={handleCommentClick}
                    >
                        Write a Comment...
                    </p>
                )}
            </div>
            {hideBtn === 'Hide Details' && (
                <>
                    {comments.map((comment) => (
                        <div key={comment.id}>
                            <div className='flex items-center gap-2 mt-3'>
                                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                                <p className='font-normal text-sm text-[#263858] cursor-pointer p-3 bg-white w-full rounded-lg shadow-md hover:bg-slate-100'>{comment.comment}</p>
                            </div>
                            <div className='ml-9'>
                                <u className='text-sm cursor-pointer' onClick={() => handleDeleteComment(comment.id)}>Delete</u>&nbsp;
                                <u className='text-sm cursor-pointer' onClick={() => handleEditComment(comment.id)}>Edit</u>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default CommentComponent;
