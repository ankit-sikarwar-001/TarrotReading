import React from 'react';

const About = () => {
    return (
        <div className="bg-[#1a1a1a] text-white min-h-screen py-12 px-6 md:px-20">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-8">
                    ✨ About <span className="text-white">Mystic Tarot</span>
                </h2>

                <p className="text-lg leading-8 mb-6">
                    At <span className="text-yellow-500 font-semibold">Mystic Tarot</span>, we don’t just read cards — we help you connect with your inner self and the universe's energies. Our goal is to provide insightful and compassionate tarot readings to guide you on your journey through love, career, health, and life purpose.
                </p>

                <p className="text-lg leading-8 mb-6">
                    We believe in <span className="text-yellow-500">authentic connection</span>. That’s why, after your booking, we connect with you directly via <span className="text-yellow-500">WhatsApp</span> — no physical products, just personalized, meaningful guidance.
                </p>

                <p className="text-lg leading-8 mb-6">
                    Whether you're curious, confused, or seeking clarity, our tarot readings can help you rediscover direction and inner peace.
                </p>
            </div>
        </div>
    );
};

export default About;
