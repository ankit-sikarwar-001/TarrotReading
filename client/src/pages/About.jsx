import React from 'react';

const About = () => {
    return (
        <div className="bg-[#1a1a1a] text-white min-h-screen py-10 px-6 md:px-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-500 text-center">About Mystic Tarot</h2>
            <p className="text-lg leading-8 max-w-3xl mx-auto text-center">
                At <span className="text-yellow-500 font-semibold">Mystic Tarot</span>, we believe in the ancient wisdom of tarot to guide you through your life's journey.
                Our readings are crafted with care, intuition, and authenticity to help you gain clarity, peace, and empowerment. Whether you're seeking answers about your past, present, or future, we are here to support your spiritual growth.
            </p>
        </div>
    );
};

export default About;
