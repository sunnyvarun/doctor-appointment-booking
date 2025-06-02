/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Button, 
  Card, 
  CardBody, 
  Avatar, 
  Alert,
  Spinner
} from '@material-tailwind/react';
import SlotPicker from '../components/SlotPicker';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

export default function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState({
    page: true,
    booking: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchDoctorAndSlots = async () => {
      try {
        setError('');
        setLoading(prev => ({ ...prev, page: true }));

        // Fetch doctor details
        const doctorRes = await fetch(
          `http://localhost/Doctor/api/doctors/get.php`,
          {
            headers: {
              'Accept': 'application/json'
            }
          }
        );
        
        if (!doctorRes.ok) {
          throw new Error(`Failed to fetch doctor: ${doctorRes.status}`);
        }

        const doctorData = await doctorRes.json();
        
        if (doctorData.status === 'success') {
          const foundDoctor = doctorData.doctors.find(
            d => d.id === parseInt(doctorId)
          );
          if (foundDoctor) {
            setDoctor(foundDoctor);
          } else {
            throw new Error('Doctor not found');
          }
        } else {
          throw new Error(doctorData.message || 'Failed to fetch doctor details');
        }

        // Fetch available slots
        const slotsRes = await fetch(
          `http://localhost/Doctor/api/doctors/slots.php?doctor_id=${doctorId}`,
          {
            headers: {
              'Accept': 'application/json'
            }
          }
        );
        
        if (!slotsRes.ok) {
          throw new Error(`Failed to fetch slots: ${slotsRes.status}`);
        }

        const slotsData = await slotsRes.json();
        
        if (slotsData.status === 'success') {
          setSlots(slotsData.slots);
        } else {
          throw new Error(slotsData.message || 'No available slots found');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(prev => ({ ...prev, page: false }));
      }
    };

    fetchDoctorAndSlots();
  }, [doctorId]);

  const handleBookAppointment = async () => {
          if (!selectedSlot || !user) return;
        
          try {
            setLoading(prev => ({ ...prev, booking: true }));
            setError('');
            setSuccess('');
        
            const response = await fetch(
              'http://localhost/Doctor/api/appointments/book.php',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify({
                  patient_id: user.id,
                  doctor_id: doctorId,
                  slot_id: selectedSlot.id
                })
              }
            );
        
            const responseText = await response.text();
            let responseData = {};
            
            try {
              responseData = responseText ? JSON.parse(responseText) : {};
            } catch (e) {
              console.error('Failed to parse JSON:', responseText);
              throw new Error('Server returned invalid data');
            }
        
            if (!response.ok) {
              // Handle specific error cases
              if (response.status === 500) {
                throw new Error('Server is currently unavailable. Please try again later.');
              } else {
                throw new Error(responseData.message || `Error: ${response.status}`);
              }
            }
        
            if (responseData.status !== 'success') {
              throw new Error(responseData.message || 'Booking failed');
            }
        
            setSuccess('Appointment booked successfully!');
            setTimeout(() => navigate('/appointments'), 3000);
        
          } catch (err) {
            console.error('Booking error:', err);
            setError(err.message);
            
            // Special handling for 500 errors
            if (err.message.includes('500')) {
              setError('Our servers are currently experiencing issues. Please try again in a few minutes.');
            }
          } finally {
            setLoading(prev => ({ ...prev, booking: false }));
          }
        };

  if (loading.page) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Typography color="red" className="mb-4">
          {error}
        </Typography>
        <Button 
          color="blue" 
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Typography variant="h3" className="mb-8">
          Book Appointment
        </Typography>
        
        {success && (
          <Alert color="green" className="mb-6">
            {success}
          </Alert>
        )}
        
        {doctor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="shadow-none">
              <CardBody className="flex flex-col md:flex-row gap-6 p-6">
                <Avatar
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&h=80&q=80"
                  alt={doctor.name}
                  size="xxl"
                  className="rounded-lg"
                />
                <div>
                  <Typography variant="h4" color="blue-gray">
                    {doctor.name}
                  </Typography>
                  <Typography color="blue" className="font-medium mb-2">
                    {doctor.specialization}
                  </Typography>
                  <Typography color="gray">
                    {doctor.bio || 'No bio available'}
                  </Typography>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <SlotPicker
            slots={slots}
            onSelect={setSelectedSlot}
            selectedSlot={selectedSlot}
          />
        </motion.div>
        
        {selectedSlot && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card className="shadow-none border">
              <CardBody className="p-6">
                <Typography variant="h5" className="mb-4">
                  Appointment Summary
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Typography color="gray" className="text-sm">
                      Doctor
                    </Typography>
                    <Typography>{doctor?.name}</Typography>
                  </div>
                  <div>
                    <Typography color="gray" className="text-sm">
                      Specialization
                    </Typography>
                    <Typography>{doctor?.specialization}</Typography>
                  </div>
                  <div>
                    <Typography color="gray" className="text-sm">
                      Date
                    </Typography>
                    <Typography>
                      {new Date(selectedSlot.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </div>
                  <div>
                    <Typography color="gray" className="text-sm">
                      Time
                    </Typography>
                    <Typography>
                      {selectedSlot.start_time} - {selectedSlot.end_time}
                    </Typography>
                  </div>
                </div>
                <Button
                  fullWidth
                  onClick={handleBookAppointment}
                  disabled={loading.booking || !user}
                  className="flex items-center justify-center gap-2"
                >
                  {loading.booking ? (
                    <>
                      <Spinner className="h-4 w-4" />
                      Processing...
                    </>
                  ) : !user ? (
                    'Please login to book'
                  ) : (
                    'Confirm Appointment'
                  )}
                </Button>
                {error && (
                  <Typography color="red" className="mt-4 text-center">
                    {error}
                  </Typography>
                )}
              </CardBody>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}