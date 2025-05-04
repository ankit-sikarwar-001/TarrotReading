import React, { useContext } from 'react'
import TimeCard from '../components/TimeCard'
import { useState } from 'react'
import Testimonialscard from '../components/Testimonialscard'
import { useNavigate } from 'react-router-dom'
import Cards from '../components/Cards'
import toast from 'react-hot-toast'
import { AppContext } from '../appContext/AppContext'

const Home = () => {
  const navigate = useNavigate()

  const { allitems } = useContext(AppContext)
  const [user, setUser] = useState({
    name: "",
    age: "",
    // contact : ""
  })

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
    const { name, age } = user;
    if (!name || !age ) {
      toast.error("Please fill out all the fields.");
      return;
    }
    // if(contact.length != 10 ){
    //   toast.error("Please enter your number properly.");
    //   return;
    // }
    setIsShuffling(true);
    setUser({
      name: "",
      age: "",
      // contact: ""
    })
    setTimeout(() => {
      const selected = [...tarotDeck].sort(() => 0.5 - Math.random()).slice(0, 3);
      setShuffledCards(selected);
      setIsShuffling(false);
    }, 1000); // Match TimeCard animation duration
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className=' flex flex-col  justify-center items-center px-5 relative ]  pb-40 '>
        <div className='relative h-[80vh] w-full'>

          {/* Overlay content */}
          <div className='text-white h-full flex flex-col justify-center text-center gap-7 relative '>
            <h1 className='font-bold text-6xl'>Discover Your Destiny</h1>
            <p>Uncover the mysteries of your future with our immersive tarot reading experience</p>
            <div>
              <a href="#tarotCard">
                <button className="bg-yellow-400 text-black cursor-pointer px-5 py-2 rounded-xl">
                  Begin your reading
                </button>
              </a>
            </div>
          </div>
        </div>

        <div id='tarotCard' className='relative z-5 bottom-12'></div>

        <div className='text-white text-center flex flex-col '>

          <h1 className='font-bold text-4xl mb-2 '>
            <span className="text-[#D4AF37]">✧</span>
            Interactive Tarrot Reading  <span className="text-[#D4AF37]">✧</span>
          </h1>

          <p> Focus on your question and select three cards for your present past and future </p>
          <div>
            <div>
              <form className="mt-4 space-y-4 bg-[#1f1f1f] p-6 rounded-lg" >
                <input required name="name" value={user.name} onChange={handleChange} placeholder="name" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                <input required type='number' name="age" value={user.age} onChange={handleChange} placeholder="age" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                {/* <input type="number" required name="contact" value={user.contact} onChange={handleChange} placeholder="Phone No." className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" /> */}
                 </form>
            </div>
            <button onClick={handleShuffle} className='bg-purple-400 px-7 py-2 mt-7 rounded-xl cursor-pointer'>
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
          <button onClick={() => { navigate("/shop"), scrollTo(0, 0) }} className='hover:bg-yellow-400 hover:text-black cursor-pointer text-yellow-400 border-2 border-yellow-400 rounded-xl px-5 py-2'>{allitems.length === 0 ? "Products is coming soon..." : "View All Products"}</button>
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
