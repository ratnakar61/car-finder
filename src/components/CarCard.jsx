import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car, onWishlist }) => {
    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded" />
            <h2 className="text-lg font-bold mt-2">{car.name}</h2>
            <p>Brand: {car.brand}</p>
            <p>Fuel: {car.fuelType}</p>
            <p>Seats: {car.seatingCapacity}</p>
            <p className="font-semibold text-green-600">${car.price}</p>
            <div className="flex justify-between items-center mt-2">
                <Link
                    to={`/car/${car.id}`}
                    state={{ car }}
                    className="text-blue-600 hover:underline"
                >
                    Details
                </Link>
                <button onClick={() => onWishlist(car)} className="text-red-500 text-xl">❤️</button>
            </div>
        </div>
    );
};

export default CarCard;
