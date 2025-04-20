import React, { useContext, useEffect, useState } from 'react'
import ProductForm from './ProductForm'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../appContext/AppContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


import toast from 'react-hot-toast';

const Admin = () => {
  
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
 
  //for visitors only
  const [visitData, setVisitData] = useState([]);

  const fetchVisits = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/visits`);
      const data = await res.json();
      setVisitData(data.map(entry => ({
        date: entry.date.slice(5), // MM-DD
        count: entry.count
      })));
    } catch (err) {
      console.error("Failed to fetch visit data", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchVisits(); // new
  }, []);


const { totalOrders, totalPrice, } = useContext(AppContext)
  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/products`);
      const data = await res.json();
      setProducts(data);

      // Calculate inventory (sum of stocks of all products)
      // const inventory = data.reduce((total, product) => total + parseInt(product.stocks || 0), 0);
      // setTotalInventory(inventory);

    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  // delete icon 
  // const handleDeleteProduct = async (productId) => {
  //   const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  //   if (!confirmDelete) return;

  //   try {
  //     const res = await fetch(`http://localhost:3001/api/products/${productId}`, {
  //       method: 'DELETE',
  //     });

  //     if (res.ok) {
  //       fetchProducts(); // Refresh product list
  //     } else {
  //       console.error('Failed to delete product');
  //     }
  //   } catch (err) {
  //     console.error('Error deleting product:', err);
  //   }
  // };


// Toast-based confirmation
// delete icon
const confirmAction = (callback) => {
  toast((t) => (
    <div className="text-white w-full h-full">
      <p className="text-lg font-semibold mb-4">Are you sure you want to delete this product?</p>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => {
            toast.dismiss(t.id);
            callback(); // confirmed action
          }}
          className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-md text-sm font-medium transition"
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-md text-sm font-medium transition"
        >
          No
        </button>
      </div>
    </div>
  ), {
    duration: 10000,
    style: {
      background: '#1f2937',
      color: '#fff',
      width: '440px',
      minHeight: '160px',
      padding: '24px',
      borderRadius: '16px',
    },
  });
};

  const handleDeleteProduct = (productId) => {
    confirmAction(async () => {
      try {
        const res = await fetch(`${backendUrl}/api/products/${productId}`, {
          method: 'DELETE',
        });
  
        if (res.ok) {
          fetchProducts(); // Refresh product list
          toast.success("Product deleted successfully!");
        } else {
          toast.error("Failed to delete product.");
          console.error('Failed to delete product');
        }
      } catch (err) {
        toast.error("Error deleting product.");
        console.error('Error deleting product:', err);
      }
    });
  };
  

  useEffect(() => {
    fetchProducts()
  }, [])

  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/add-product'); scrollTo(0,0);
  };

  const handleProductAdded = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };


  return (
    <div className="min-h-screen bg-black text-white p-6 relative z-0">
      {/* Header */}
      
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-yellow-400">✨ Admin Dashboard ✨</h1>
        <p className="text-sm text-gray-400 mt-2">Manage your mystic products and services</p>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#2D223D] rounded-lg p-6 relative">
          <span className="absolute top-2 right-2 bg-yellow-700 text-xs px-2 py-1 rounded-full">Last 30 days</span>
          <p className="text-sm text-gray-300">Total Orders</p>
          <h2 className="text-3xl font-semibold mt-2">{totalOrders}</h2>
          <p className="text-green-400 text-sm mt-1">↑ 12%</p>
        </div>
        <div className="bg-[#2D223D] rounded-lg p-6 relative">
          <span className="absolute top-2 right-2 bg-yellow-700 text-xs px-2 py-1 rounded-full">Last 30 days</span>
          <p className="text-sm text-gray-300">Revenue</p>
          <h2 className="text-3xl font-semibold mt-2">{totalPrice}</h2>
          <p className="text-green-400 text-sm mt-1">↑ 8%</p>
        </div>
        <div className="bg-[#2D223D] rounded-lg p-6 relative">
          <span className="absolute top-2 right-2 bg-yellow-700 text-xs px-2 py-1 rounded-full">Last 7 days</span>
          <p className="text-sm text-gray-300 mb-2">Visitors</p>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={visitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#ccc" fontSize={12} />
              <YAxis stroke="#ccc" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#FACC15" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Top Bar */}
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        {/* Left Section: Search + Filter */}
        {/* <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 w-full sm:w-64"
          />
          <select className="px-4 py-2 rounded-md bg-gray-800 text-white w-full sm:w-48">
            <option>All Categories</option>
            <option>Tarot Decks</option>
            <option>Crystals</option>
            <option>Books</option>
          </select>
        </div> */}

        {/* Right Section: Add Button */}
        <button 

          onClick={handleAddProduct }
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-md w-full sm:w-auto"
        >
          Add Product
        </button>
      </div>


      {/* Product Form */}
      {showForm && (
        <ProductForm
          onProductAdded={handleProductAdded}
          editingProduct={editingProduct}
        />
      )}

      {/* Table */}
      <div className="bg-[#1c1c1e] rounded-lg overflow-x-auto mt-4">
        <table className="min-w-full text-left">
          <thead className="bg-[#332946] text-gray-300 text-sm uppercase">
            <tr>
              <th className="p-4">Product</th>
              <th>Category</th>
              <th>Price</th>
              <th className="text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-gray-700 hover:bg-gray-900 transition">
                <td className="p-4 flex items-center gap-3 min-w-[200px]">
                  <img src={product.image || 'https://via.placeholder.com/40'} alt={product.name} className="w-10 h-10 rounded" />
                  <div>
                    <p>{product.name}</p>
                    <span className="text-gray-200 text-xs">SKU: {product.title || 'N/A'}</span>
                  </div>
                </td>
                <td className="min-w-[150px]">{product.description}</td>
                <td className="text-yellow-400 min-w-[100px]">${parseFloat(product.price).toFixed(2)}</td>
                {/* <td className="min-w-[80px]">{product.stocks}</td>
                <td className="min-w-[100px]">
                  {product.stocks <= 5 ? (
                    <span className="bg-yellow-700 text-xs px-2 py-1 rounded-full">Low Stock</span>
                  ) : (
                    <span className="bg-green-700 text-xs px-2 py-1 rounded-full">Active</span>
                  )}
                </td> */}
                <td className="text-right pr-6 min-w-[120px]">
                  <button
                    className="text-yellow-400 mr-4"
                    onClick={() => {
                      setEditingProduct(product);
                      setShowForm(true);
                      scrollTo(0,300);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-red-500"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Admin
