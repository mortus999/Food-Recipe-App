import './App.scss';
// react router dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import { Home, MealDetails, Error, Category } from "./pages/index";
// components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import RandomMeals from './components/RandomMeals/RandomMeals';
import ResetPassword from './components/ResetPassword/ResetPassword'; // Import the ResetPassword component
import { useAuth, AuthProvider } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();  // <-- This line should be used after the AuthProvider

  return (
    <BrowserRouter>
      <Header />
      {isAuthenticated && <Sidebar />} {/* Show Sidebar only for logged-in users */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<MealDetails />} />
        <Route path="/meal/category/:name" element={<Category />} />
        <Route path="/reset-password/:uidb64/:token/" element={<ResetPassword />} /> {/* Updated route */}
        <Route path="*" element={<Error />} />
      </Routes>
      {isAuthenticated && <RandomMeals />} {/* Show RandomMeals only for logged-in users */}
      <Footer />
    </BrowserRouter>
  );
}

export default function RootApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
