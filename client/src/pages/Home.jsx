import React from 'react'
import TimeCard from '../components/TimeCard'
import ProductCart from '../components/ProductCart'
import Testimonialscard from '../components/Testimonialscard'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className=' flex flex-col  justify-center items-center px-5  '>
      <div className='text-white h-[80vh] flex flex-col justify-center text-center gap-7  '>
        <h1 className='font-bold text-6xl '>Discover Your Destiny</h1>
        <p> Uncover the mysteries of your future  with our immersive tarot reading experience</p>

        <div>
          <button className='bg-yellow-400 text-black cursor-pointer px-5 py-2 rounded-xl '>Begin your reading</button>

        </div>
      </div>


      <div className='text-white text-center flex flex-col '>
        <h1 className='font-bold text-4xl mb-7 '>Interactive Tarrot Reading</h1>
        <p> Focus on your question and select three cards for your present past and future </p>
        <div>
          <button className='bg-purple-400 px-7 py-2 mt-3 rounded-xl cursor-pointer'> Shuffle Cards</button>
        </div>
      </div>


      {/* time cards */}
      <div className='text-white flex flex-col md:flex-row mt-10 justify-around items-center w-full gap-10 px-4'>

  <div className='flex flex-col justify-center items-center gap-2 text-center w-full md:w-1/3'>
    <p className='font-bold text-xl text-yellow-400'>Past</p>
    <p>Influences from your past</p>
    <TimeCard />
  </div>

  <div className='flex flex-col gap-2 justify-center items-center text-center w-full md:w-1/3'>
    <p className='font-bold text-xl text-yellow-400'>Present</p>
    <p>Your Current Situation</p>
    <TimeCard />
  </div>

  <div className='flex flex-col gap-2 justify-center items-center text-center w-full md:w-1/3'>
    <p className='font-bold text-xl text-yellow-400'>Future</p>
    <p>What lies ahead</p>
    <TimeCard />
  </div>

</div>



      {/* shooping cards */}
      <div className='text-white gap-20  mt-40 flex flex-col justify-center items-center  w-full'>
        <h1 className='text-4xl font-bold'>Featured Spiritual Items</h1>
        <div className='flex flex-col sm:flex-row flex-wrap gap-5 justify-center items-center'>
  <ProductCart />
  <ProductCart />
  <ProductCart />
</div>


        <div>
          <button onClick={()=> navigate("/shop")} className='hover:bg-yellow-400 hover:text-black cursor-pointer text-yellow-400 border-2 border-yellow-400 rounded-xl px-5 py-2'>View All Products</button>
        </div>
      </div>



    {/* testimonials */}
<div className='text-white mt-40 px-4'>
  <h1 className='text-4xl font-bold mb-16 text-center'>Customer Testimonials</h1>

  <div className='flex flex-col lg:flex-row gap-10 md:gap-10 justify-center items-center'>
    <Testimonialscard />
    <Testimonialscard />
  </div>
</div>





      {/* footer */}
      <Footer />
    </div>
  )
}

export default Home
