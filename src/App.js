import './App.scss';
// react router dom
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// pages
import { Home, MealDetails, Error, Category } from "./pages/index";
// components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import RandomMeals from './components/RandomMeals/RandomMeals';
import ResetPassword from './components/ResetPassword/ResetPassword'; 
import { useAuth, AuthProvider } from './context/AuthContext';
import Navbar from './components/Header/Navbar';
import CreateMyPlate from './pages/CreateMyPlates/CreateMyPlates';
import MyPlates from './pages/MyPlatesPage/MyPlatesPage';
import SearchForm from './components/Header/SearchForm'; // Import SearchForm component

function App() {
  const location = useLocation();
  
  // Check if we're on the CreateMyPlate or MyPlates page
  const isCreateMyPlatePage = location.pathname === '/create-my-plate';
  const isMyPlatesPage = location.pathname === '/plates';
  const { isAuthenticated } = useAuth(); 

  return (
    <>
      {/* Only render Navbar, Header, Sidebar, and SearchForm when not on the create-my-plate or plates pages */}
      {!isCreateMyPlatePage  && <Navbar />}
      {!isCreateMyPlatePage && !isMyPlatesPage && <Header />}
      {!isCreateMyPlatePage && isAuthenticated && <Sidebar />}
      {/* Conditionally render SearchForm */}

      <Routes>
        {/* Route for Create My Plate */}
        <Route path="/create-my-plate" element={<CreateMyPlate />} />
        
        {/* Route for My Plates */}
        <Route path="/plates" element={<MyPlates />} />
        
        {/* Other existing routes */}
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<MealDetails />} />
        <Route path="/meal/category/:name" element={<Category />} />
        <Route path="/reset-password/:uidb64/:token/" element={<ResetPassword />} />
        <Route path="*" element={<Error />} />
        {isAuthenticated && <RandomMeals />} {/* Show RandomMeals only for logged-in users */}
      </Routes>

      {/* Only render Footer when not on the create-my-plate or plates pages */}
      {!isCreateMyPlatePage && !isMyPlatesPage && <Footer />}
    </>
  );
}

export default function RootApp() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  );
}





