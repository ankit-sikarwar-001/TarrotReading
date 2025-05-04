// src/pages/RefundAndCancellation.jsx
import React from 'react';

const RefundAndCancellation = () => {
    console.log("hello refund")
    return (
        <div className="p-6 md:p-20 text-white">
            <h1 className="text-2xl font-bold mb-4">Refund & Cancellation Policy</h1>
            <p>
                Thank you for choosing Mystic Tarot. Please note that our services are based on spiritual consultation and guidance, which are personalized and non-tangible in nature.
            </p>
            <p className="mt-2">
                Therefore, once a session is booked or a product is purchased, we do not offer any refunds or cancellations under any circumstances. We request our users to read the service details carefully before making a purchase.
            </p>
            <p className="mt-2">If you have any questions, feel free to reach out to us at <strong>ssingh66907@gmail.com</strong>.</p>
        </div>
    );
};

export default RefundAndCancellation;
