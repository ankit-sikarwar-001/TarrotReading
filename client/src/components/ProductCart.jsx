import React from 'react'

const ProductCart = () => {
  return (
    <div className=" bg-gray-500 rounded-2xl shadow-md overflow-hidden ">
    <img className="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1744616451172-5f540c944b9b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D" alt={"img"} />
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Fresh Organic Vegetables</h2>
      <p className="text-white text-sm mb-4">Get the best quality vegetables directly from local farmers.</p>
     <div className='flex justify-between items-center'>
        <p className="text-lg text-yellow-400 font-bold mb-2">$19.99</p>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-500 transition duration-300 cursor-pointer">Add to Cart</button>
     </div>
    </div>
  </div>
  )
}

export default ProductCart
