import React from 'react';
import Header from '../component/commonComponent/Header';
import DashboardLeftMenu from '../component/DashboardLeftMenu';
import DashboardRightMenu from '../component/DashboardRightMenu';

interface Props {
    // Define your component props here
}

const Dashboard: React.FC<Props> = (props) => {
    return (
        <>
            <div className="fixed top-0 w-full">
                <Header />
            </div>
            <div className="w-full h-screen pt-[44px]">
                <div className='w-[70%] flex gap-5 h-full mx-auto pt-[44px]'>
                    <div className=' w-[20%]'>
                        <DashboardLeftMenu />
                    </div>
                    <div className=' w-[70%]'>
                        <DashboardRightMenu/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;