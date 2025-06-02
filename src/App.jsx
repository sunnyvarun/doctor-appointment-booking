/* eslint-disable no-unused-vars */
import { Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import BookAppointment from './pages/BookAppointment';
import Appointments from './pages/Appointments';
import Admin from './pages/Admin';
import Header from './components/Header';

function App() {
  return (
    <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/book/:doctorId" element={<BookAppointment />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
  );
}

export default App;