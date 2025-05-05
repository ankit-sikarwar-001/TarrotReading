// import React, { useState } from 'react';
// import axios from 'axios';

// const Contact = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//     const [status, setStatus] = useState('');

//     const handleChange = (e) => {
//         setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:3001/api/contact', formData);
//             if (res.data.success) {
//                 setStatus('Message sent successfully!');
//                 setFormData({ name: '', email: '', message: '' });
//             } else {
//                 setStatus('Failed to send message.');
//             }
//         } catch (err) {
//             setStatus('Server error, try again later.');
//         }
//     };

//     return (
//         <div className="bg-[#1a1a1a] text-white min-h-screen py-10 px-6 md:px-20">
//             <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-500 text-center">Contact Us</h2>

//             <div className="max-w-2xl mx-auto space-y-6 text-center">
//                 <p>Email: <a href="mailto:ssingh66907@gmail.com" className="text-yellow-500 hover:underline">ssingh66907@gmail.com</a></p>
//                 <p>Phone: <a href="tel:+919467270938" className="text-yellow-500 hover:underline">+91-9467270938</a></p>
//                 <p>Address: VPO Khardwal, Teh Narwana, District Jind, Haryana, 126116</p>
//             </div>

//             <form onSubmit={handleSubmit} className="mt-10 max-w-xl mx-auto space-y-6">
//                 <input name="name" value={formData.name} onChange={handleChange} required type="text" placeholder="Your Name" className="w-full p-3 rounded-md bg-[#2c2c2c] text-white outline-none" />
//                 <input name="email" value={formData.email} onChange={handleChange} required type="email" placeholder="Your Email" className="w-full p-3 rounded-md bg-[#2c2c2c] text-white outline-none" />
//                 <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Your Message" className="w-full p-3 rounded-md bg-[#2c2c2c] text-white outline-none h-32 resize-none" />
//                 <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-md font-bold transition duration-200">Send Message</button>
//             </form>

//             {status && <p className="text-center mt-4 text-yellow-400">{status}</p>}
//         </div>
//     );
// };

// export default Contact;
