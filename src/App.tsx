import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import {BrowserRouter,} from "react-router-dom"; 
import HomePage from './pages/HomePage';
import DashboardPageTwo from './pages/DashboardPageTwo';
import ExplorePageTwo from './pages/ExplorePageTwo';

function App() { 
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboardTwo/:id" element={<DashboardPageTwo />} />
        <Route path="/exploreTwo/:idDashboard" element={<ExplorePageTwo />} />
        <Route path="/exploreTwo/:idDashboard/:idItem" element={<ExplorePageTwo />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
