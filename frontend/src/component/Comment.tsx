import React,{useState} from 'react';
import {RxActivityLog} from 'react-icons/rx';

interface Props {
}

const Comment: React.FC<Props> = (props) => {

    const [hideBtn, setHideBtn] = useState<string>('Hide Details')
    const [isEditing, setIsEditing] = useState(false);
    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<string[]>([]);

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

    const handleSaveClick = () => {
        if (comment.trim() !== '') {
            setComments([...comments, comment]);
            setIsEditing(false);
            setComment('');
        }
    };

    const handleEditComment = (index: number) => {
    };

    const handleDeleteComment = (index: number) => {
        const updatedComments = comments.slice();
        updatedComments.splice(index, 1);
        setComments(updatedComments);
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
                            <button onClick={handleSaveClick} disabled={comment.trim() === ''} className={`px-3 rounded-sm text-white my-4 mr-3 ${comment.trim() === '' ? 'bg-gray-400' : 'bg-blue-600'
                                }`}>
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
                    {comments.map((comment, index) => (
                        <>
                            <div className='flex items-center gap-2 mt-3'>
                                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                                <p key={index} className='font-normal text-sm text-[#263858] cursor-pointer p-3 bg-white w-full rounded-lg shadow-md hover:bg-slate-100'>{comment}</p>
                            </div>
                            <div className='ml-9'>
                                <u className='text-sm cursor-pointer' onClick={() => handleDeleteComment(index)}>Delete</u>&nbsp;
                                <u className='text-sm cursor-pointer' onClick={() => handleEditComment(index)}>Edit</u>
                            </div>
                        </>
                    ))}
                </>
            )}
        </>
    );
};

export default Comment;