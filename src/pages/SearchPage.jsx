import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CarCard from '../components/CarCard';
import {Link} from "react-router-dom";

const API_URL = 'https://run.mocky.io/v3/bf704a66-1ca3-4f10-84f6-7e05c6d0694b';

const SearchPage = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({ fuelType: '', minPrice: '', maxPrice: '' });

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('query') || '';
        setSearchTerm(query);
    }, [location.search]);

    useEffect(() => {
        const fetchCars = async () => {
            const res = await fetch(API_URL);
            const data = await res.json();
            setCars(data);
        };
        fetchCars();

        // Load wishlist from localStorage
        const stored = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setWishlist(stored);
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchTerm, filters, cars]);

    // Apply filters
    const applyFilters = () => {
        let results = [...cars];

        if (searchTerm) {
            results = results.filter((car) =>
                car.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filters.fuelType) {
            results = results.filter(
                (car) => car.fuelType.toLowerCase() === filters.fuelType.toLowerCase()
            );
        }

        if (filters.minPrice) {
            results = results.filter((car) => car.price >= Number(filters.minPrice));
        }

        if (filters.maxPrice) {
            results = results.filter((car) => car.price <= Number(filters.maxPrice));
        }

        setFilteredCars(results);
    };

    const toggleWishlist = (car) => {
        let updated = [...wishlist];
        const exists = wishlist.find((c) => c.id === car.id);
        if (exists) {
            updated = updated.filter((c) => c.id !== car.id);
        } else {
            updated.push(car);
        }
        setWishlist(updated);
        localStorage.setItem('wishlist', JSON.stringify(updated));
    };

    return (
        <div className="min-h-screen bg-blue-100 p-4 pt-6">
            <Link
                to="/wishlist"
                className="fixed bottom-6 right-6 bg-pink-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-pink-700 transition z-50"
            >
                ❤️ View Wishlist
            </Link>
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search cars..."
                    className="w-full sm:w-[400px] px-4 py-2 border rounded-md shadow-sm"
                />
                <button
                    onClick={() => setShowFilter(!showFilter)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    {showFilter ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            {/* Filter Panel */}
            {showFilter && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow mb-6">
                    <select
                        value={filters.fuelType}
                        onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
                        className="border p-2 rounded"
                    >
                        <option value="">All Fuel Types</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                        className="border p-2 rounded"
                    />
                </div>
            )}

            {/* Results Grid */}
            {filteredCars.length === 0 ? (
                <p className="text-center text-gray-500">No cars found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredCars.map((car) => (
                        <CarCard
                            key={car.id}
                            car={car}
                            onWishlist={toggleWishlist}
                            isWishlisted={wishlist.some((c) => c.id === car.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
