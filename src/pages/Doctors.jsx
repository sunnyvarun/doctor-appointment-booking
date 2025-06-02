/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Typography, Button, Input, Spinner } from '@material-tailwind/react';
import DoctorCard from '../components/DoctorCard';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'; // Import icons

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost/Doctor/api/doctors/get.php');
        const data = await response.json();
        if (data.status === 'success') {
          setDoctors(data.doctors);
        } else {
          setError(data.message || 'Failed to fetch doctors');
        }
      } catch (err) {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const results = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(results);
  }, [searchTerm, doctors]);

  return (
    <div className="py-10 bg-gray-50 h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <Typography variant="h2" className="mb-8 font-semibold text-blue-gray-800 text-center md:text-left">
          Our Specialist Doctors
        </Typography>
        
        <div className="flex md:flex-row justify-between items-center mb-6">
          <div className="relative w-full md:max-w-md">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10 pointer-events-none" />
              <Input
                type="text"
                
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                containerProps={{
                  className: "min-w-0"
                }}
                labelProps={{
                  className: "before:content-none after:content-none"
                }}
                placeholder="Find doctors..."
              />
            </div>
          </div>
          
          {user?.role === 'admin' && (
            <Button 
              onClick={() => navigate('/admin')} 
              className="rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 transition-all duration-300 flex items-center gap-2 ml-4"
              size="md"
            >
              <PlusIcon className="h-5 w-5" /> Manage Doctors
            </Button>
          )}
        </div>
        
        {loading ? (
          <div className="text-center py-16">
            <Spinner className="h-12 w-12 text-blue-500" />
            <Typography className="mt-4 text-gray-600">Fetching our amazing doctors...</Typography>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <Typography color="red" variant="h6">{error}</Typography>
          </div>
        ) : filteredDoctors.length === 0 && searchTerm ? (
          <div className="text-center py-16">
            <Typography className="text-gray-600">No doctors found matching your search.</Typography>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}