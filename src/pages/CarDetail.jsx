import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const CarDetail = () => {
    const { state } = useLocation(); // contains the car object
    const navigate = useNavigate();
    const car = state?.car;

    if (!car) {
        return (
            <div className="p-4 text-red-500">
                Car not found or data missing.
                <br />
                <button onClick={() => navigate('/')} className="text-blue-600 underline mt-2">Back to Home</button>
            </div>
        );
    }

    return (
        <div className="p-4">
            <img src={car.image || '/images/default-car.jpg'} alt={car.name} className="w-full h-64 object-cover rounded" />
            <h2 className="text-2xl font-bold mt-4">{car.name}</h2>
            <p className="mt-2"><strong>Brand:</strong> {car.brand}</p>
            <p><strong>Fuel Type:</strong> {car.fuelType}</p>
            <p><strong>Seating Capacity:</strong> {car.seatingCapacity}</p>
            <p><strong>Price:</strong> <span className="text-green-600 font-semibold">${car.price}</span></p>
        </div>
    );
};

export default CarDetail;
