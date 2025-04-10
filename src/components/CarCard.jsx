import React from 'react';
import { Link } from 'react-router-dom';
import carLogo from '/image/carLogo.jpg';

const CarCard = ({ car, onWishlist, isWishlisted }) => {
    return (
        <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition">
            <img
                src={car.image || carLogo}
                alt={car.name}
                className="w-full h-40 object-cover rounded-xl border-2 border-blue-100"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = carLogo;
                }}
            />

            <h2 className="text-lg font-bold mt-2 text-gray-800">{car.name}</h2>
            <p className="text-sm text-gray-600 font-medium">{car.brand}</p>
            <p className="text-sm text-gray-500">{car.fuelType}</p>
            <p className="text-sm text-gray-500">{car.seatingCapacity} Seater</p>
            <p className="font-semibold text-green-600 text-md mt-1">${car.price}</p>

            <div className="flex flex-col gap-2 sm:flex-row justify-between items-center mt-4">
                <Link
                    to={`/car/${car.id}`}
                    state={{ car }}
                    className="text-sm text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 px-4 py-1 rounded-full transition"
                >
                    Details
                </Link>

                <button
                    onClick={() => onWishlist(car)}
                    className={`text-sm px-4 py-1 rounded-full transition font-medium border ${
                        isWishlisted
                            ? 'bg-red-100 text-red-600 border-red-500 hover:bg-red-200'
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                >
                    {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
            </div>
        </div>
    );
};

export default CarCard;
