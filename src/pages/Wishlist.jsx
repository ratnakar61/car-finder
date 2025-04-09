import React, { useEffect, useState } from 'react';
import CarCard from '../components/CarCard';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('wishlist');
        if (stored) setWishlist(JSON.parse(stored));
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {wishlist.length > 0 ? (
                    wishlist.map((car) => <CarCard key={car.id} car={car} onWishlist={() => {}} />)
                ) : (
                    <p>No items in your wishlist yet.</p>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
