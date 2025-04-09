import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx'
import CarDetail from "./pages/CarDetail.jsx";
import Wishlist from "./pages/Wishlist.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/car/:id" element={<CarDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
    )
}
export default App
