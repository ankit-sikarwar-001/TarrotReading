
import { useState } from "react";

const ProductForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        rating: "",
        reviews: "",
        tags: "",
        image: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target; //name and value of form is collecting here
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            price: parseFloat(formData.price),
            rating: parseFloat(formData.rating),
            reviews: parseInt(formData.reviews),
            tags: formData.tags.split(",").map(tag => tag.trim())
        };
        const res = await fetch("http://localhost:3001/api/products", {
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

    const getProducts = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/products", {
                method: "GET"
            });
            const data = await response.json(); // Await the JSON parsing
            console.log(data); // Log the parsed data
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    getProducts()
    return (
        <div className="p-4">
            <button
                className="bg-purple-600 text-white px-4 py-2 rounded"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? "Close Form" : "Add Product"}
            </button>

            {showForm && (
                <form className="mt-4 space-y-4 bg-[#1f1f1f] p-6 rounded-lg" onSubmit={handleSubmit}>
                    <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                    <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                    <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" type="number" step="0.01" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                    <input name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" type="number" step="0.1" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                    <input name="reviews" value={formData.reviews} onChange={handleChange} placeholder="Reviews" type="number" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                    <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                    <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                    <button type="submit" className="bg-green-600 px-4 py-2 text-white rounded">Submit</button>
                </form>
            )}
        </div>
    );
};

export default ProductForm;
