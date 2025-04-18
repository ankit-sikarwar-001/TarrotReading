import React, { useEffect, useState } from 'react'
import ProductForm from './ProductForm'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const [products, setProducts] = useState([])
  const [totalInventory, setTotalInventory] = useState(0);
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null);


  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/products');
      const data = await res.json();
      setProducts(data);

      // Calculate inventory (sum of stocks of all products)
      const inventory = data.reduce((total, product) => total + parseInt(product.stocks || 0), 0);
      setTotalInventory(inventory);

    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  // delete icon 
  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3001/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchProducts(); // Refresh product list
      } else {
        console.error('Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };


  useEffect(() => {
    fetchProducts()
  }, [])

  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/add-product');
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
          <h2 className="text-3xl font-semibold mt-2">157</h2>
          <p className="text-green-400 text-sm mt-1">↑ 12%</p>
        </div>
        <div className="bg-[#2D223D] rounded-lg p-6 relative">
          <span className="absolute top-2 right-2 bg-yellow-700 text-xs px-2 py-1 rounded-full">Last 30 days</span>
          <p className="text-sm text-gray-300">Revenue</p>
          <h2 className="text-3xl font-semibold mt-2">$4,285.00</h2>
          <p className="text-green-400 text-sm mt-1">↑ 8%</p>
        </div>
        <div className="bg-[#2D223D] rounded-lg p-6 relative">
          {totalInventory <= 15 ? (
            <span className="absolute top-2 right-2 bg-red-600 text-xs px-2 py-1 rounded-full">low stocks</span>
          ) : (
              <span className="absolute top-2 right-2 bg-green-600 text-xs px-2 py-1 rounded-full">Active</span>
          )}
          
          <p className="text-sm text-gray-300">Inventory</p>
          <h2 className="text-3xl font-semibold mt-2">{totalInventory}</h2>
          <p className="text-gray-400 text-sm mt-1">products in stock</p>
        </div>
      </div>

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400"
          />
          <select className="px-4 py-2 rounded-md bg-gray-800 text-white">
            <option>All Categories</option>
            <option>Tarot Decks</option>
            <option>Crystals</option>
            <option>Books</option>
          </select>
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-md"
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
      <div className="bg-[#1c1c1e] rounded-lg overflow-hidden mt-4">
        <table className="w-full text-left">
          <thead className="bg-[#332946] text-gray-300 text-sm uppercase">
            <tr>
              <th className="p-4">Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th className="text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-gray-700 hover:bg-gray-900 transition">
                <td className="p-4 flex items-center gap-3">
                  <img src={product.image || 'https://via.placeholder.com/40'} alt={product.name} className="w-10 h-10 rounded" />
                  <div>
                    <p>{product.name}</p>
                    <span className="text-gray-500 text-xs">SKU: {product.title || 'N/A'}</span>
                  </div>
                </td>
                <td>{product.description}</td>
                <td className="text-yellow-400">${parseFloat(product.price).toFixed(2)}</td>
                <td>{product.stocks}</td>
                <td>
                  {product.stocks <= 5 ? (
                    <span className="bg-yellow-700 text-xs px-2 py-1 rounded-full">Low Stock</span>
                  ) : (
                    <span className="bg-green-700 text-xs px-2 py-1 rounded-full">Active</span>
                  )}
                </td>
                <td className="text-right pr-6">
                  <button
                    className="text-yellow-400 mr-4"
                    onClick={() => {
                      setEditingProduct(product);
                      setShowForm(true);
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
