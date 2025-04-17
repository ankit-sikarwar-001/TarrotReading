import React from 'react';
import { FaStar } from 'react-icons/fa';

const Testimonialscard = () => {
  return (
    <div className='w-full sm:w-[90%] md:w-[400px] bg-gray-500 border-2 border-yellow-400 rounded-lg p-4 text-white space-y-3'>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, suscipit maxime?
      </p>
      <div className='flex items-center'>
        <FaStar className="text-yellow-300" />
        <FaStar className="text-yellow-300" />
        <FaStar className="text-yellow-300" />
        <span className='pl-5'>Lorem</span>
      </div>
    </div>
  );
};

export default Testimonialscard;
