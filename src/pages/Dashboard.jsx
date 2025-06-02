/* eslint-disable no-unused-vars */
import { Typography, Card, CardBody, Button } from '@material-tailwind/react';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, ListBulletIcon, UserCircleIcon } from '@heroicons/react/24/outline'; // Import icons

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="py-10 bg-gray-50 h-screen"> {/* Added light background */}
      <div className="container mx-auto px-4">
        <Typography variant="h2" className="mb-8 font-semibold text-blue-gray-800 text-center md:text-left"> {/* More prominent welcome */}
          Welcome, <span className="text-blue-500">{user?.name}</span>
        </Typography>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" }}
            className="rounded-lg shadow-md overflow-hidden bg-white"
          >
            <CardBody className="text-center p-8 flex flex-col items-center justify-center">
              <CalendarIcon className="h-12 w-12 text-blue-500 mb-4" /> {/* Added icon */}
              <Typography variant="h5" className="mb-3 font-semibold text-blue-gray-800">
                Book an Appointment
              </Typography>
              <Typography className="mb-4 text-gray-600">
                Schedule your health check-ups with our qualified doctors.
              </Typography>
              <Button onClick={() => navigate('/doctors')} className="rounded-md shadow-md bg-blue-500 hover:bg-blue-700 transition-colors duration-300">
                Find Doctors
              </Button>
            </CardBody>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" }}
            className="rounded-lg shadow-md overflow-hidden bg-white"
          >
            <CardBody className="text-center p-8 flex flex-col items-center justify-center">
              <ListBulletIcon className="h-12 w-12 text-green-500 mb-4" /> {/* Added icon */}
              <Typography variant="h5" className="mb-3 font-semibold text-blue-gray-800">
                My Appointments
              </Typography>
              <Typography className="mb-4 text-gray-600">
                Review, reschedule, or cancel your existing appointments.
              </Typography>
              <Button onClick={() => navigate('/appointments')} className="rounded-md shadow-md bg-green-500 hover:bg-green-700 transition-colors duration-300">
                View Appointments
              </Button>
            </CardBody>
          </motion.div>

          {user?.role === 'doctor' && (
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" }}
              className="rounded-lg shadow-md overflow-hidden bg-white"
            >
              <CardBody className="text-center p-8 flex flex-col items-center justify-center">
                <UserCircleIcon className="h-12 w-12 text-indigo-500 mb-4" /> {/* Added icon */}
                <Typography variant="h5" className="mb-3 font-semibold text-blue-gray-800">
                  Doctor Portal
                </Typography>
                <Typography className="mb-4 text-gray-600">
                  Manage your consultation schedule and patient appointments.
                </Typography>
                <Button onClick={() => navigate('/admin')} className="rounded-md shadow-md bg-indigo-500 hover:bg-indigo-700 transition-colors duration-300">
                  Doctor Dashboard
                </Button>
              </CardBody>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}