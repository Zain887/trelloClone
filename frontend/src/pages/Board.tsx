import React from 'react';
import Header from '../component/commonComponent/Header';
import { useLocation } from 'react-router-dom';


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
            <div className="w-full h-screen pt-[44px] bg-cover bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>

            </div>
        </>
    );
};

export default Board;