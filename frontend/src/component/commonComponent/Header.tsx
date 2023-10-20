import React from 'react';
import {CgMenuGridO, CgTrello, CgLogOff} from 'react-icons/cg';
import {BiSolidDoorOpen} from 'react-icons/bi';

import { useNavigate } from 'react-router-dom';

interface Props {
  // Define your component props here
}

const Header: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  return (
    <header className="border-b-2 backdrop-blur-sm text-white py-2 px-4">
    <div className="flex items-center justify-between">
        <CgMenuGridO size={20} color='gray' className='mr-5'/>
      <h1 className="text-xl font-semibold flex items-center text-gray-500"><CgTrello size={20} color='gray' className='mr-1'/>Trello Board</h1>
      <nav>
        <ul className="flex space-x-4">
        <li className="flex items-center cursor-pointer " onClick={()=> {navigate('/')}}>
          <h1 className='text-xs font-bold text-[#008000]'>Back to Lobbay</h1>
            <BiSolidDoorOpen size={20} color='green'/>
            </li>
          <li className="hover:underline cursor-pointer " onClick={()=> {navigate('/login')}}>
            <CgLogOff size={20} color='red'/>
            </li>
        </ul>
      </nav>
    </div>
  </header>
  );
};

export default Header;