import React from 'react';
import Header from '../commonComponent/Header';
import { useLocation } from 'react-router-dom';
import BoradLeftBar from '../commonComponent/BoardLeftBar';
import ListComponent from '../component/List';


interface Props {
    // Define your component props here
}

const Board: React.FC<Props> = (props) => {
    const location = useLocation();
    const backgroundImage = location.state?.src || ''; // Get the src from location state
    return (
        <>
            <div className="fixed top-0 w-full">
                <Header />
            </div>
            <div className='flex'>
                <BoradLeftBar />
                <div className="w-full h-screen pl-96 pt-[54px] bg-cover bg-no-repeat overflow-y-scroll" style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <ListComponent/>
                </div>
            </div>
        </>
    );
};

export default Board;