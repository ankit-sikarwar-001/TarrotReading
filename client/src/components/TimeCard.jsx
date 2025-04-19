import React from 'react';
import { motion } from 'framer-motion';

const TimeCard = ({ card, isShuffling }) => {
  return (
    <motion.div
      className="w-[200px] h-[300px] border-2 border-yellow-400 rounded-lg flex items-center justify-center text-white text-center p-4"
      animate={isShuffling ? { rotateY: 360 } : { rotateY: 0 }}
      transition={{ duration: 1 }}
      style={{ backgroundColor: '#4A3A6A' }}
    >
      {!card ? (
        <p className='text-sm'>Your card will appear here</p>
      ) : (
        <div className="flex flex-col items-center">
          <img src={`/images/${card.title}.png`} alt={card.title} className="w-full h-[200px] object-cover rounded" />
          <h2 className="mt-3 font-bold">{card.title}</h2>
          <p className="text-xs mt-1">{card.description}</p>
        </div>
      )}
    </motion.div>
  );
};

export default TimeCard;
