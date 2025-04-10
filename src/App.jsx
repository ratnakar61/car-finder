import React from 'react'
import {Routes, Route, Router} from "react-router-dom";
import Landing from "./pages/LandingPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import CarDetail from "./pages/CarDetail.jsx";
import Wishlist from "./pages/Wishlist.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/car/:id" element={<CarDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
    )
}
export default App
