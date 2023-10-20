import React, { useState } from 'react';
import { BiTimeFive, BiLogoTrello } from 'react-icons/bi';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiTwotoneSetting, AiOutlineInfoCircle } from 'react-icons/ai';
import { FaToolbox } from 'react-icons/fa';
import { MdOutlinePeopleOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface Props {
    // ActiveBoard: string;
}
const DashboardRightMenu: React.FC<Props> = (props) => {
    const navigate = useNavigate();

    const guest = [
        { src: '/images/tree-bg.jpg', alt: 'Assetize Today Web' },
        { src: '/images/art-bg.jpg', alt: 'Assetize Today Web' },
        { src: '/images/art-bg2.jpg', alt: 'Assetize Today Web' },
        { src: '/images/art-bg.jpeg', alt: 'Assetize Today Web' },
    ];

    const board = [
        { src: '/images/tree-bg.jpg', alt: 'Assetize Today Web' },
        { src: '/images/art-bg.jpg', alt: 'Assetize Board 2 Clone' },
        { src: '/images/art-bg2.jpg', alt: 'Assetize Board 3 Clone' },
        { src: '/images/art-bg.jpeg', alt: 'Assetize Board 4 Clone' },
    ];

    const [recentView, setRecentView] = useState<{ src: string; alt: string }[]>([]);

    const recentViewBoard = (index: number) => {
        const selectedBoard = board[index];
        navigate(`/board/${selectedBoard.alt}`, { state: { src: selectedBoard.src, alt:selectedBoard.alt } });
        const updateRecentView = { src: selectedBoard.src, alt: selectedBoard.alt, }
        recentView.push(updateRecentView);
        setRecentView([...recentView].splice(-4));
        localStorage.setItem('recentView', JSON.stringify(recentView));
    }

    return (
        <div className="w-full h-full">
            {/* #########################################################Recent View#################################################### */}
            <section className='mb-12'>
                <h1 className="flex gap-4 items-center text-lg font-medium">
                    <span>
                        <BiTimeFive size={22} color="black" />
                    </span>
                    Recently viewed
                </h1>

                {recentView.length > 0 && (
                    <div className="flex flex-wrap justify-between items-baseline">
                        {recentView.map((image, index) => (
                            <div
                                key={index}
                                className="relative w-56 h-32 bg-gray-300 overflow-hidden mt-4 rounded cursor-pointer"
                            >
                                <img src={image.src} alt={image.alt} style={{ width: '100%', height: '100%' }} />
                                <p className="absolute top-3 left-3 text-white font-bold">
                                    {image.alt}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            {/* #########################################################Your Area#################################################### */}
            <section className='mb-12'>
                <h1 className="flex gap-4 items-center text-lg font-medium mb-4">
                    YOUR WORKSPACES
                </h1>
                <div className='flex justify-between items-center'>
                    <h1 className="flex gap-4 items-center text-sm font-medium">
                        <span className='w-6 h-6 rounded overflow-hidden'>
                            <img src="/images/art-bg.jpg" alt="" style={{ width: '100%', height: '100%' }} />
                        </span>
                        asdf
                    </h1>
                    <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-2 bg-slate-100 rounded-md px-2 py-1 cursor-pointer'>
                            <BiLogoTrello size={16} color="black" />
                            <h1 className='text-sm'>Boards</h1>
                        </div>
                        <div className='flex items-center gap-2 bg-slate-100 rounded-md px-2 py-1 cursor-pointer'>
                            <HiOutlineViewGrid size={16} color="black" />
                            <h1 className='text-sm'>Views</h1>
                        </div>
                        <div className='flex items-center gap-2 bg-slate-100 rounded-md px-2 py-1 cursor-pointer'>
                            <BsFillPersonFill size={16} color="black" />
                            <h1 className='text-sm'>Members (6)</h1>
                        </div>
                        <div className='flex items-center gap-2 bg-slate-100 rounded-md px-2 py-1 cursor-pointer'>
                            <AiTwotoneSetting size={16} color="black" />
                            <h1 className='text-sm'>Settings</h1>
                        </div>
                        <div className='flex items-center gap-2 bg-[#DFD8FD] rounded-md px-2 py-1 cursor-pointer'>
                            <FaToolbox size={16} color="white" className='bg-[#6E5DC6] p-1 rounded' />
                            <h1 className='text-sm'>Upgrade</h1>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between items-baseline">
                    {board.map((image, index) => (
                        <div
                            key={index}
                            className="relative w-56 h-32 bg-gray-300 overflow-hidden mt-4 rounded cursor-pointer"
                            onClick={() => recentViewBoard(index)}
                        >
                            <img src={image.src} alt={image.alt} style={{ width: '100%', height: '100%' }} />
                            <p className="absolute top-3 left-3 text-white font-bold">
                                {image.alt}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
            {/* #########################################################Guest Area#################################################### */}
            <section className='mb-12'>
                <h1 className="flex gap-4 items-center text-lg font-medium mb-4">
                    GUEST WORKSPACES
                    <span>
                        <AiOutlineInfoCircle size={22} color="black" />
                    </span>
                </h1>
                <div className='flex justify-between items-center'>
                    <h1 className="flex gap-4 items-center text-sm font-medium">
                        <span className='w-6 h-6 rounded overflow-hidden'>
                            <MdOutlinePeopleOutline size={22} color='black' />
                        </span>
                        Assetize
                    </h1>

                </div>
                <div className="flex flex-wrap justify-between items-baseline">
                    {guest.map((image, index) => (
                        <div
                            key={index}
                            className="relative w-56 h-32 bg-gray-300 overflow-hidden mt-4 rounded cursor-pointer"
                        >
                            <img src={image.src} alt={image.alt} style={{ width: '100%', height: '100%' }} />
                            <p className="absolute top-3 left-3 text-white font-bold">
                                {image.alt}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div >
    );
};

export default DashboardRightMenu;
