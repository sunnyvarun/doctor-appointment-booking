
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Typography, Button, Alert, Spinner, Card } from '@material-tailwind/react';
import AppointmentCard from '../components/AppointmentCard';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function Appointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        const isRefreshing = refreshing;
        if (!isRefreshing) setLoading(true);
        setError('');

        const response = await fetch(
          `http://localhost/Doctor/api/appointments/get.php?user_id=${user.id}&role=${user.role}`,
          {
            headers: {
              'Accept': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success') {
          setAppointments(data.appointments || []);
        } else {
          throw new Error(data.message || 'Failed to fetch appointments');
        }
      } catch (err) {
        console.error('Fetch appointments error:', err);
        setError(err.message || 'Network error. Please try again.');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };

    fetchAppointments();
  }, [user, refreshing]); // Fixed dependency array

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const response = await fetch('http://localhost/Doctor/api/appointments/cancel.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          appointment_id: appointmentId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Server error');
      }

      if (data.status === 'success') {
        setAppointments(prev =>
          prev.map(app => 
            app.id === appointmentId ? { ...app, status: 'cancelled' } : app
          )
        );
        setSuccess('Appointment cancelled successfully');
      } else {
        throw new Error(data.message || 'Failed to cancel appointment');
      }
    } catch (err) {
      console.error('Cancel error:', err);
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <Typography variant="h2" className="font-bold text-gray-900">
              {user?.role === 'doctor' ? 'Your Appointments' : 'My Appointments'}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="mt-2">
              {user?.role === 'doctor' 
                ? 'Manage your patient appointments' 
                : 'View and manage your bookings'}
            </Typography>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outlined"
              color="blue"
              size="sm"
              onClick={handleRefresh}
              disabled={loading || refreshing}
              className="flex items-center gap-2"
            >
              <ArrowPathIcon className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            {user?.role === 'patient' && (
              <Button
                color="blue"
                onClick={() => navigate('/doctors')}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <CalendarIcon className="h-4 w-4" />
                Book New
              </Button>
            )}
          </div>
        </div>

        {/* Status Alerts */}
        <div className="mb-6 space-y-3">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Alert color="red" className="shadow-md">
                {error}
              </Alert>
            </motion.div>
          )}
          
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Alert color="green" className="shadow-md">
                {success}
              </Alert>
            </motion.div>
          )}
        </div>

        {/* Content */}
        {loading && !refreshing ? (
          <div className="text-center py-16">
            <Spinner className="h-12 w-12 text-blue-500 mx-auto" />
            <Typography variant="h6" className="mt-4 text-gray-600">
              Loading your appointments...
            </Typography>
          </div>
        ) : appointments.length === 0 ? (
          <Card className="text-center p-8 shadow-md rounded-xl">
            <div className="mx-auto bg-blue-100 p-4 rounded-full w-max mb-4">
              <CalendarIcon className="h-10 w-10 text-blue-500" />
            </div>
            <Typography variant="h5" className="mb-2 text-gray-700">
              {user?.role === 'doctor'
                ? 'No appointments scheduled yet'
                : 'No upcoming appointments'}
            </Typography>
            <Typography color="gray" className="mb-6 max-w-md mx-auto">
              {user?.role === 'doctor'
                ? 'Your schedule is currently clear. Check back later for new appointments.'
                : 'Book your first appointment with one of our specialists.'}
            </Typography>
            {user?.role === 'patient' && (
              <Button
                color="blue"
                onClick={() => navigate('/doctors')}
                className="mx-auto"
              >
                Find a Doctor
              </Button>
            )}
          </Card>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <Typography variant="small" color="blue-gray" className="font-medium">
              Showing {appointments.length} appointment{appointments.length !== 1 ? 's' : ''}
            </Typography>
            
            {appointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <AppointmentCard
                  appointment={appointment}
                  onCancel={handleCancelAppointment}
                  disabled={loading}
                  role={user?.role}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}