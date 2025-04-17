import React, { useContext } from 'react'
import { AppContext } from '../appContext/AppContext'

const CartItem = ({ productId, quantity }) => {
  const { cartItems, setCartItems  } = useContext(AppContext)

  const cartItem = cartItems.find(item => item.id === productId)
  if (!cartItem) return null

  const handlePlus = () => {
    const updated = cartItems.map(p =>
      p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
    )
    setCartItems(updated)
  }

  const handleMinus = () => {
    const updated = cartItems
      .map(p => {
        if (p.id === productId) {
          return p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : null
        }
        return p
      })
      .filter(Boolean)
      setCartItems(updated)
     }

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-white rounded-lg shadow">
      {/* Image */}
      <img
        src={cartItem.image}
        alt={cartItem.title}
        className="w-full sm:w-24 h-24 object-contain rounded-md"
      />

      {/* Details */}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-base font-medium text-gray-800">{cartItem.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{cartItem.description}</p>
        </div>

        {/* Price & Quantity */}
        <div className="flex flex-col sm:items-end gap-2">
          <p className="font-semibold text-gray-700">
            ₹{(cartItem.price * quantity).toFixed(2)}
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleMinus}
              className="w-8 h-8 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded"
            >
              −
            </button>
            <span className="px-2">{quantity}</span>
            <button
              onClick={handlePlus}
              className="w-8 h-8 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
