import React, { useState } from 'react';
import { BiLogoTrello, BiSolidHome } from 'react-icons/bi';
import { GoProjectTemplate } from 'react-icons/go';
import { GrFormAdd } from "react-icons/gr";

interface Props {
    // Define your component props here
}

const DashboardLeftMenu: React.FC<Props> = (props) => {
    const [activeTab, setActiveTab] = useState<string>('boards'); // Initialize state to track active tab

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className='w-full h-full'>
            <div className='border-b-2'>
                <h1
                    onClick={() => handleTabClick('boards')}
                    className={`flex items-center gap-4 h-8 p-2 cursor-pointer rounded-md ${activeTab === 'boards' ? 'bg-[#E9F2FF] text-[#2173E7]' : 'hover:bg-[#E9F2FF] hover:text-[#2173E7]'
                        } transition-colors`}
                >
                    <span>
                        <BiLogoTrello size={20} color={activeTab === 'boards' ? '#2173E7' : 'black'} />
                    </span>
                    Boards
                </h1>
                <h1
                    onClick={() => handleTabClick('templates')}
                    className={`flex items-center gap-4 h-8 p-2 cursor-pointer rounded-md ${activeTab === 'templates' ? 'bg-[#E9F2FF] text-[#2173E7]' : 'hover:bg-[#E9F2FF] hover:text-[#2173E7]'
                        } transition-colors`}
                >
                    <span>
                        <GoProjectTemplate size={20} color={activeTab === 'templates' ? '#2173E7' : 'black'} />
                    </span>
                    Templates
                </h1>
                <h1
                    onClick={() => handleTabClick('home')}
                    className={`flex items-center gap-4 h-8 p-2 cursor-pointer rounded-md ${activeTab === 'home' ? 'bg-[#E9F2FF] text-[#2173E7]' : 'hover:bg-[#E9F2FF] hover:text-[#2173E7]'
                        } transition-colors`}
                >
                    <span>
                        <BiSolidHome size={20} color={activeTab === 'home' ? '#2173E7' : 'black'} />
                    </span>
                    Home
                </h1>
            </div>
            <h1 className='flex items-center justify-between'>Workspaces<span className='hover:bg-gray-200 rounded cursor-pointer'><GrFormAdd size={20} color='black' /></span></h1>
        </div>
    );
};

export default DashboardLeftMenu;
