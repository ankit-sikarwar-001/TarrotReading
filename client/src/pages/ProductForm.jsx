import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'

const ProductForm = ({ onProductAdded, editingProduct }) => {


    const [uploading, setUploading] = useState(false)

    const isEditing = !!editingProduct;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [formData, setFormData] = useState({
        rating: editingProduct?.rating || '',
        reviews: editingProduct?.reviews || '',
        tags: editingProduct?.tags || '',
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

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
        }
    };
    const navigate = useNavigate();

    const handleAddProduct = () => {
        toast.success("Product Added Successfully")
        navigate('/admin');
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log("handlesumbit");

    //     console.log(formData);

    //     // const url = isEditing
    //     //     ? `${backendUrl}/api/products/${editingProduct._id}`
    //     //     : `${backendUrl}/api/products`;
    //     // const method = isEditing ? 'PUT' : 'POST';

    //     // try {
    //     //     const res = await fetch(url, {
    //     //         method,
    //     //         headers: { 'Content-Type': 'application/json' },
    //     //         body: JSON.stringify(formData),
    //     //     });

    //     //     if (res.ok) {
    //     //         onProductAdded(); // refresh and close
    //     //     } else {
    //     //         console.error(`${isEditing ? 'Update' : 'Add'} failed`);
    //     //     }
    //     // } catch (err) {
    //     //     console.error(`${isEditing ? 'Update' : 'Add'} error:`, err);
    //     // }
    //     handleAddProduct();
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handlesubmit");
        setUploading(true)
        const formDataToSend = new FormData();

        // Only append fields excluding the image
        for (const key in formData) {
            if (key !== "image") {
                formDataToSend.append(key, formData[key]);
            }
        }

        // Append image separately (only once)
        if (formData.image) {
            formDataToSend.append("image", formData.image); // ✅ Correct, only once
        }

        const url = isEditing
            ? `${backendUrl}/api/products/${editingProduct._id}`
            : `${backendUrl}/api/products`;

        const method = isEditing ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                body: formDataToSend,
            });

            if (res.ok) {
                onProductAdded();
                setUploading(false)
            } else {
                console.error(`${isEditing ? 'Update' : 'Add'} failed`);
            }
        } catch (err) {
            console.error(`${isEditing ? 'Update' : 'Add'} error:`, err);
        } finally {
            setUploading(false)
        }

        handleAddProduct();
    };


    return (
        <div className="p-4 ">
            {!editingProduct && (
                <button
                    onClick={handleAddProduct}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-md"
                >
                    Close Product
                </button>
            )}


            <form className="mt-4 space-y-4 bg-[#1f1f1f] p-6 rounded-lg" onSubmit={handleSubmit}>
                <input required name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                <input required name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                <input required name="price" value={formData.price} onChange={handleChange} placeholder="Price" type="number" step="0.01" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                <input required name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" type="number" step="0.1" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                <input required name="stocks" value={formData.stocks} onChange={handleChange} placeholder="stocks" type="number" step="1" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                <input required name="reviews" value={formData.reviews} onChange={handleChange} placeholder="Reviews" type="number" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                <input required name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white" />
                <input
                    required
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileUpload}
                    placeholder="upload image" className="w-full px-3 py-2 rounded bg-[#2a2a2a] text-white"
                />
                 <button
        type="submit"
        disabled={uploading}
        className={`px-4 py-2 rounded text-white transition 
          ${uploading 
            ? 'bg-green-600 opacity-50 cursor-not-allowed' 
            : 'bg-green-600 hover:bg-green-700'}`}
      >
        {uploading ? 'Uploading...' : 'Submit'}
      </button>

            </form>
        </div>
    );
};

export default ProductForm;


