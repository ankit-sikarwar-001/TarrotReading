import React from 'react'
import TimeCard from '../components/TimeCard'
import { useState } from 'react'
import Testimonialscard from '../components/Testimonialscard'
import { useNavigate } from 'react-router-dom'
import Cards from '../components/Cards'

const Home = () => {
  const navigate = useNavigate()

  // timecard for shuffle card 
  const tarotDeck = [
    { title: 'The Fool', description: 'New beginnings, adventure, spontaneity' },
    { title: 'The Magician', description: 'Power, skill, concentration' },
    { title: 'The High Priestess', description: 'Intuition, secrets, mystery' },
    { title: 'The Empress', description: 'Fertility, beauty, nature, nurturing' },
    { title: 'The Emperor', description: 'Authority, structure, control, fatherhood' },
    { title: 'The HieroPhant', description: 'Tradition, spiritual wisdom, conformity' },
    { title: 'The Lovers', description: 'Love, harmony, partnerships, choices' },
    { title: 'The Chariot', description: 'Determination, willpower, triumph' },
    { title: 'Strength', description: 'Courage, inner strength, compassion' },
    { title: 'The Hermit', description: 'Introspection, solitude, guidance' },
    { title: 'Wheel of Fortune', description: 'Fate, cycles, destiny, turning points' },
    { title: 'Justice', description: 'Fairness, truth, law, cause and effect' },
    { title: 'The Hanged Man', description: 'Pause, surrender, new perspective' },
    { title: 'Death', description: 'Transformation, endings, transition' },
    { title: 'Temperance', description: 'Balance, patience, moderation' },
    { title: 'The Devil', description: 'Addiction, materialism, temptation' },
    { title: 'The Tower', description: 'Sudden change, upheaval, chaos' },
    { title: 'The Star', description: 'Hope, inspiration, serenity' },
    { title: 'The Moon', description: 'Illusion, intuition, uncertainty' },
    { title: 'The Sun', description: 'Joy, success, positivity, vitality' },
    { title: 'Judgement', description: 'Rebirth, inner calling, absolution' },
    { title: 'The World', description: 'Completion, achievement, travel' },
    // Minor Arcana Example
    { title: 'Ace of Wands', description: 'Inspiration, potential, new opportunities in creativity or career' }
  ];


  const [shuffledCards, setShuffledCards] = useState([null, null, null]);
  const [isShuffling, setIsShuffling] = useState(false);

  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => {
      const selected = [...tarotDeck].sort(() => 0.5 - Math.random()).slice(0, 3);
      setShuffledCards(selected);
      setIsShuffling(false);
    }, 1000); // Match TimeCard animation duration
  };


  return (
    <>
      <div className=' flex flex-col  justify-center items-center px-5  '>
        <div className='text-white h-[80vh] flex flex-col justify-center text-center gap-7  '>
          <h1 className='font-bold text-6xl '>Discover Your Destiny</h1>
          <p> Uncover the mysteries of your future  with our immersive tarot reading experience</p>

          <div>
            <a href="#tarotCard">
              <button className="bg-yellow-400 text-black cursor-pointer px-5 py-2 rounded-xl">
                Begin your reading
              </button>
            </a>

          </div>
        </div>


        <div id='tarotCard' className='text-white text-center flex flex-col '>

          <h1 className='font-bold text-4xl mb-7 '> <span className="text-[#D4AF37]">✧</span> Interactive Tarrot Reading  <span className="text-[#D4AF37]">✧</span></h1>
          <p> Focus on your question and select three cards for your present past and future </p>
          <div>
            <button onClick={handleShuffle} className='bg-purple-400 px-7 py-2 mt-3 rounded-xl cursor-pointer'>
              Shuffle Cards
            </button>

          </div>
        </div>


        {/* time cards */}
        <div className='text-white flex flex-col md:flex-row mt-10 justify-around items-center w-full gap-10 px-4'>
          <div className='text-white flex flex-col md:flex-row mt-10 justify-around items-center w-full gap-10 px-4'>
            {['Past', 'Present', 'Future'].map((label, idx) => (
              <div key={label} className='flex flex-col justify-center items-center gap-2 text-center w-full md:w-1/3'>
                <p className='font-bold text-xl text-yellow-400'>{label}</p>
                <p>
                  {label === 'Past'
                    ? 'Influences from your past'
                    : label === 'Present'
                      ? 'Your Current Situation'
                      : 'What lies ahead'}
                </p>
                <TimeCard card={shuffledCards[idx]} isShuffling={isShuffling} />
              </div>
            ))}
          </div>


        </div>



        {/* shooping cards */}
        <div className="text-white mt-40 flex flex-col justify-center items-center w-full px-4 sm:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
            <span className="text-[#D4AF37]">✧</span> Featured Spiritual Items <span className="text-[#D4AF37]">✧</span>
          </h1>
          <div className="flex flex-wrap gap-6 justify-center items-center w-full max-w-6xl">
            <Cards condi={true} />
          </div>
        </div>



        <div>
          <button onClick={() => { navigate("/shop"), scrollTo(0, 0) }} className='hover:bg-yellow-400 hover:text-black cursor-pointer text-yellow-400 border-2 border-yellow-400 rounded-xl px-5 py-2'>View All Products</button>
        </div>

{/* testimonials */}
<div className='text-white mt-40 px-4'>
        <h1 className='text-4xl font-bold mb-16 text-center'> <span className="text-[#D4AF37]">✧</span> Customer Testimonials  <span className="text-[#D4AF37]">✧</span></h1>

        <div className="flex flex-col md:flex-row justify-center items-center md:gap-8 gap-6">
          <Testimonialscard
            quote="The reading I received was surprisingly accurate. It helped me gain clarity during a difficult time in my life. Highly recommended!"
            name="Sarah K."
          />
          <Testimonialscard
            quote="The tarot deck I purchased is beautiful and high quality. The energy from these cards feels so right for my practice. The guidebook is very helpful too."
            name="Michael T."
            rating={4}
          />
        </div>
      </div>

      </div>



      





    </ >
  )
}

export default Home
