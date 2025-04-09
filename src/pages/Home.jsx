import React, { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import FilterPanel from '../components/FilterPanel';

const API_KEY = 'Vnvlq7NL130mA1AYKG1VJQ==lGiwuTmoUJt0khX5';

const Home = () => {
    const [filters, setFilters] = useState({ brand: '', fuelType: '' });
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCars = async () => {
        setLoading(true);
        const response = await fetch(`https://api.api-ninjas.com/v1/cars?model=${filters.brand}`, {
            headers: {
                'X-Api-Key': API_KEY
            }
        });
        const data = await response.json();
        setCars(data);
        setLoading(false);
    };

    useEffect(() => {
        if (filters.brand) fetchCars();
    }, [filters.brand]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Car Finder (API)</h1>
            <FilterPanel filters={filters} setFilters={setFilters} />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {cars.map((car, index) => (
                        <CarCard key={index} car={{
                            id: index,
                            name: `${car.make} ${car.model}`,
                            brand: car.make,
                            price: car.price || 20000,
                            fuelType: car.fuel_type || "Unknown",
                            seatingCapacity: car.seats || "N/A",
                            image: "/images/default-car.jpg"
                        }} onWishlist={() => {}} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;