import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import carLogo from '/image/carLogo.jpg';

const CarDetail = () => {
    const { state } = useLocation(); // contains the car object
    const navigate = useNavigate();
    const car = state?.car;

    if (!car) {
        return (
            <div className="p-6 text-center text-red-500">
                <p>🚫 Car not found or data missing.</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 text-blue-600 underline hover:text-blue-800"
                >
                    ⬅ Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <img
                    src={carLogo}
                    alt={car.name}
                    className="w-full h-[300px] object-cover"
                />

                <div className="p-6">
                    <h2 className="text-3xl font-bold text-gray-800">{car.name}</h2>
                    <p className="text-gray-600 mt-1 mb-4"><strong>{car.brand}</strong></p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-md">
                        <p><span className="font-semibold">Fuel Type:</span> {car.fuelType}</p>
                        <p><span className="font-semibold">Seats:</span> {car.seatingCapacity}</p>
                        <p><span className="font-semibold">Price:</span> <span className="text-green-600 font-semibold">${car.price}</span></p>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            ⬅ Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetail;
