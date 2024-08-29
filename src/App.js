import './App.scss';
// react router dom
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
// pages
import { Home, MealDetails, Error, Category } from "./pages/index";
// components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import RandomMeals from './components/RandomMeals/RandomMeals';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Sidebar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/meal/:id" element={<MealDetails />} />
      <Route path="/meal/category/:name" element={<Category />} />
      <Route path="*" element={<Error />} />
    </Routes>
    <RandomMeals /> {/* Place RandomMeals outside of Routes if you want it to show on all pages */}
    <Footer />
  </BrowserRouter>
);
}

export default App;