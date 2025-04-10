import React, { useEffect, useState } from 'react';
import CarCard from '../components/CarCard';
import FilterPanel from '../components/FilterPanel';

const API_URL = 'https://run.mocky.io/v3/bf704a66-1ca3-4f10-84f6-7e05c6d0694b';

const Home = () => {
    const [filters, setFilters] = useState({ brand: '', fuelType: '' });
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 10;

    const fetchCars = async () => {
        setLoading(true);

        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            let filteredCars = data;

            if (filters.brand) {
                filteredCars = filteredCars.filter(car =>
                    car.brand.toLowerCase().includes(filters.brand.toLowerCase())
                );
            }

            if (filters.fuelType) {
                filteredCars = filteredCars.filter(car =>
                    car.fuelType.toLowerCase().includes(filters.fuelType.toLowerCase())
                );
            }

            if (filters.minPrice) {
                filteredCars = filteredCars.filter((car) =>
                    car.price >= Number(filters.minPrice)
                );
            }

            if (filters.maxPrice) {
                filteredCars = filteredCars.filter((car) =>
                    car.price <= Number(filters.maxPrice)
                );
            }

            setCars(filteredCars);
            setCurrentPage(1);
        } catch (err) {
            console.error('Failed to fetch cars:', err);
            setCars([]);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchCars();
    }, [filters]);

    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
    const totalPages = Math.ceil(cars.length / carsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">🚗 Car Finder (Mock API)</h1>
            <FilterPanel filters={filters} setFilters={setFilters} />

            {loading ? (
                <p>Loading cars...</p>
            ) : (
                <>
                    {currentCars.length === 0 ? (
                        <p className="text-red-500">No cars found.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {currentCars.map(car => (
                                <CarCard
                                    key={car.id}
                                    car={{
                                        id: car.id,
                                        name: car.name,
                                        brand: car.brand,
                                        price: car.price,
                                        fuelType: car.fuelType,
                                        seatingCapacity: car.seatingCapacity,
                                    }}
                                    onWishlist={() => {}}
                                />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {cars.length > carsPerPage && (
                        <div className="flex justify-center mt-6 space-x-4">
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                            >
                                ⬅ Prev
                            </button>
                            <span className="self-center font-semibold">
                Page {currentPage} of {totalPages}
              </span>
                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                            >
                                Next ➡
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
