import React, { useState } from 'react';

const PopUpBtn = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleClick = () => {
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <button 
                onClick={handleClick} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Add to Cart
            </button>

            {showPopup && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                    Item added to cart!
                </div>
            )}
        </div>
    );
};

export default PopUpBtn;
