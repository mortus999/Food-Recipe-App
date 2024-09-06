import './App.scss';
// react router dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages

// components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useAuth, AuthProvider } from './context/AuthContext';
import Navbar from './components/Header/Navbar';

function UserHome() {
  const { isAuthenticated } = useAuth();  // <-- This line should be used after the AuthProvider

  return (
    <BrowserRouter>
    <Navbar/>
      <Header />

      <Footer />
    </BrowserRouter>
  );
}