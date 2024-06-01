import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from '../components/pages/Home';
import Tours from '../components/pages/Tours';
import TourDetails from '../components/pages/TourDetails';
import Login from '../components/pages/Login';
import Register from '../components/pages/Register';
import SearchResultList from '../components/pages/SearchResultList';
import ThankYou from "../components/pages/ThankYou";
const Routers = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/home" />} />
      <Route exact path="/home" element={<Home/>} />
      <Route exact path="/tours" element={<Tours/>} />
      <Route exact path="/tours/:id" element={<TourDetails/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/thank-you" element={<ThankYou/>} />
      <Route exact path="/tours/search" element={<SearchResultList/>} />
    </Routes>
  );
};

export default Routers;
