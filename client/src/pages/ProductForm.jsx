import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const ProductForm = ({ onProductAdded, editingProduct }) => {
    const isEditing = !!editingProduct;

    const [formData, setFormData] = useState({
        name: editingProduct?.name || '',
        title: editingProduct?.title || '',
        description: editingProduct?.description || '',
        price: editingProduct?.price || '',
        image: editingProduct?.image || '',
        stocks: editingProduct?.stocks || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const navigate = useNavigate();

    const handleAddProduct = () => {
        navigate('/admin');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
<<<<<<< HEAD
        const payload = {
            ...formData,
            price: parseFloat(formData.price),
            rating: parseFloat(formData.rating),
            reviews: parseInt(formData.reviews),
            tags: formData.tags.split(",").map(tag => tag.trim())
        };
        const res = await fetch("http://localhost:5000/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        console.log(data);
        alert(data.message || "Product submitted!");
        setShowForm(false);
        setFormData({ title: "", description: "", price: "", rating: "", reviews: "", tags: "", image: "" });
    };

=======
        const url = isEditing
            ? `http://localhost:3001/api/products/${editingProduct._id}`
            : 'http://localhost:3001/api/products';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                onProductAdded(); // refresh and close
            } else {
                console.error(`${isEditing ? 'Update' : 'Add'} failed`);
            }
        } catch (err) {
            console.error(`${isEditing ? 'Update' : 'Add'} error:`, err);
        }
        handleAddProduct();
    };
>>>>>>> f3ff387aecb57e35a8d69b255f66baf2a072269b

    return (
        <div className="p-4">
            {!editingProduct&&(
            <button
                onClick={handleAddProduct}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-md"
            >
                Close Product
            </button>
            )}

            
                <form className="mt-4 space-y-4 bg-[#1f1f1f] p-6 rounded-lg" onSubmit={handleSubmit}>
                    <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                    <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                    <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" type="number" step="0.01" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                    <input name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" type="number" step="0.1" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                    <input name="stocks" value={formData.stocks} onChange={handleChange} placeholder="stocks" type="number" step="1" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                    <input name="reviews" value={formData.reviews} onChange={handleChange} placeholder="Reviews" type="number" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                    <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                    <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                    <button type="submit" className="bg-green-600 px-4 py-2 text-white rounded hover:bg-green-700">Submit</button>
                </form>
        </div>
    );
};

export default ProductForm;
