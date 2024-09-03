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
import ResetPassword from './components/ResetPassword/ResetPassword'; // Import the ResetPassword component
import { useAuth, AuthProvider } from './context/AuthContext';
import Navbar from './components/Header/Navbar';
import CreateMyPlate from './pages/CreateMyPlates/CreateMyPlates';

function App() {
  const location = useLocation();
  const isCreateMyPlatePage = location.pathname === '/create-my-plate';

  return (
    <>
      {!isCreateMyPlatePage && <Navbar />}
      {!isCreateMyPlatePage && <Header />}
      {!isCreateMyPlatePage && <Sidebar />}

      <Routes>
        <Route path="/create-my-plate" element={<CreateMyPlate />} />
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<MealDetails />} />
        <Route path="/meal/category/:name" element={<Category />} />
        <Route path="/reset-password/:uidb64/:token/" element={<ResetPassword />} /> {/* Updated route */}
        <Route path="*" element={<Error />} />
      </Routes>


      {!isCreateMyPlatePage && <Footer />}
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


































































// import './App.scss';
// // react router dom
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// // pages
// import { Home, MealDetails, Error, Category } from "./pages/index";
// // components
// import Header from "./components/Header/Header";
// import Sidebar from "./components/Sidebar/Sidebar";
// import Footer from "./components/Footer/Footer";
// import RandomMeals from './components/RandomMeals/RandomMeals';
// import { useAuth, AuthProvider } from './context/AuthContext';
// import Navbar from './components/Header/Navbar';
// import CreateMyPlate from './pages/CreateMyPlates/CreateMyPlates';

// function App() {
//   const { isAuthenticated } = useAuth();  // <-- This line should be used after the AuthProvider

//   return (
//     <BrowserRouter>
//     <Navbar/>
//       <Header />
//       {<Sidebar />} 
//       <Routes>
//       <Route path="/create-my-plate" element={<CreateMyPlate />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/meal/:id" element={<MealDetails />} />
//         <Route path="/meal/category/:name" element={<Category />} />
//         <Route path="*" element={<Error />} />
//       </Routes>
//       {<RandomMeals />} 
//       <Footer />
//     </BrowserRouter>
//   );
// }

// export default function RootApp() {
//   return (
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   );
// }
