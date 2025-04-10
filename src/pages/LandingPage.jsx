import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/search?query=${searchInput}`);
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white">
            <div className="text-center space-y-6">
                <h1 className="text-4xl font-bold">Find Your Dream Car</h1>
                <p className="text-gray-300">Search by brand, model, or type</p>

                <div className="relative w-full sm:w-[400px] mx-auto">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Search for cars..."
                        className="w-full ring-2 ring-white px-4 py-3 text-white rounded-full outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Landing;
