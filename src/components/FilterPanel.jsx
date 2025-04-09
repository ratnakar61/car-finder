import React from 'react';

const FilterPanel = ({ filters, setFilters }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <input
                type="text"
                placeholder="Brand"
                className="border p-2 rounded"
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
            />
            <select
                className="border p-2 rounded"
                value={filters.fuelType}
                onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
            >
                <option value="">Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
            </select>
            <input
                type="number"
                placeholder="Min Price"
                className="border p-2 rounded"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            />
            <input
                type="number"
                placeholder="Max Price"
                className="border p-2 rounded"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            />
        </div>
    );
};

export default FilterPanel;
