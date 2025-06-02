/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { Typography, Button, Card, CardBody, Input, Select, Option, Textarea } from '@material-tailwind/react'
import { useAuth } from '../hooks/useAuth'
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiUser, FiBriefcase, FiInfo, FiPlus } from 'react-icons/fi'

export default function Admin() {
  const { user } = useAuth()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    date: '',
    start_time: '',
    end_time: ''
  })

  useEffect(() => {
    if (!user || user.role !== 'doctor') return

    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost/Doctor/api/doctors/get.php`)
        const data = await response.json()
        
        if (data.status === 'success') {
          const foundDoctor = data.doctors.find(d => d.user_id === user.id)
          setDoctor(foundDoctor)
        } else {
          setError(data.message || 'Failed to fetch doctor details')
        }
      } catch (err) {
        setError('Network error. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchDoctor()
  }, [user])

  const handleAddSlot = async (e) => {
    e.preventDefault()
    if (!doctor || !formData.date || !formData.start_time || !formData.end_time) return

    try {
      setLoading(true)
      const response = await fetch('http://localhost/Doctor/api/doctors/slots.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          doctor_id: doctor.id,
          date: formData.date,
          start_time: formData.start_time,
          end_time: formData.end_time
        })
      })
      
      const data = await response.json()
      
      if (data.status === 'success') {
        setSuccess('Time slot added successfully!')
        setFormData({ date: '', start_time: '', end_time: '' })
      } else {
        setError(data.message || 'Failed to add time slot')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
      setTimeout(() => {
        setSuccess('')
        setError('')
      }, 3000)
    }
  }

  if (!user || user.role !== 'doctor') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md p-8 text-center shadow-lg">
          <Typography variant="h4" color="red" className="mb-4">
            Unauthorized Access
          </Typography>
          <Typography color="gray" className="mb-6">
            You don't have permission to view this page.
          </Typography>
          <Button color="blue" fullWidth onClick={() => window.location.href = '/'}>
            Return to Home
          </Button>
        </Card>
      </div>
    )
  }

  if (loading && !doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <Typography variant="h5" color="blue-gray">
            Loading your dashboard...
          </Typography>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <div>
            <Typography variant="h2" className="font-bold text-gray-900">
              Doctor Dashboard
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="mt-2">
              Manage your availability and profile
            </Typography>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <FiUser size={16} />
            </div>
            <Typography variant="small" className="font-medium">
              {user?.name}
            </Typography>
          </div>
        </motion.div>

        {/* Status Messages */}
        <div className="mb-8 space-y-3">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg"
            >
              <Typography color="red" className="flex items-center gap-2">
                <FiInfo size={18} /> {error}
              </Typography>
            </motion.div>
          )}
          
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg"
            >
              <Typography color="green" className="flex items-center gap-2">
                <FiInfo size={18} /> {success}
              </Typography>
            </motion.div>
          )}
        </div>

        {/* Doctor Profile Card */}
        {doctor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <Card className="shadow-lg border-0 overflow-hidden">
              <div className="relative h-32 bg-gradient-to-r from-blue-500 to-indigo-600">
                <div className="absolute -bottom-12 left-6">
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                    <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-500">
                      <FiUser size={36} />
                    </div>
                  </div>
                </div>
              </div>
              <CardBody className="pt-16">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <Typography variant="h3" className="mb-2">
                      Dr. {doctor.name}
                    </Typography>
                    <div className="flex items-center gap-2 mb-4">
                      <FiBriefcase className="text-blue-500" />
                      <Typography color="blue" className="font-medium">
                        {doctor.specialization}
                      </Typography>
                    </div>
                    {doctor.bio && (
                      <Typography color="gray" className="max-w-2xl">
                        {doctor.bio}
                      </Typography>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row md:flex-col gap-2">
                    <Button variant="outlined" color="blue" size="sm">
                      Edit Profile
                    </Button>
                    <Button variant="outlined" color="gray" size="sm">
                      View Schedule
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        )}

        {/* Add Time Slot Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="shadow-lg border-0">
            <CardBody>
              <div className="flex items-center justify-between mb-6">
                <Typography variant="h4" className="font-bold text-gray-900">
                  Add Available Time Slot
                </Typography>
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <FiCalendar size={20} />
                </div>
              </div>
              
              <form onSubmit={handleAddSlot} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Typography variant="large" className="mb-2 font-medium text-gray-700">
                      Date
                    </Typography>
                    <Input
                      type="date"
                      
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="!border-gray-300 focus:!border-blue-500"
                      containerProps={{ className: "min-w-[100px]" }}
                    />
                  </div>
                  <div>
                    <Typography variant="large" className="mb-2 font-medium text-gray-700">
                      Start Time
                    </Typography>
                    <Input
                      type="time"
                      
                      value={formData.start_time}
                      onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                      required
                      className="!border-gray-300 focus:!border-blue-500"
                    />
                  </div>
                  <div>
                    <Typography variant="large" className="mb-2 font-medium text-gray-700">
                      End Time
                    </Typography>
                    <Input
                      type="time"
                      
                      value={formData.end_time}
                      onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                      required
                      className="!border-gray-300 focus:!border-blue-500"
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  color="blue" 
                  size="lg"
                  disabled={loading}
                  className="flex items-center gap-2 justify-center mt-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiPlus size={18} />
                      Add Time Slot
                    </>
                  )}
                </Button>
              </form>
            </CardBody>
          </Card>
        </motion.div>

        {/* Recent Appointments Section (Placeholder) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-lg border-0">
            <CardBody>
              <Typography variant="h4" className="font-bold text-gray-900 mb-6">
                Upcoming Appointments
              </Typography>
              <div className="text-center py-12">
                <Typography color="gray" className="mb-4">
                  No upcoming appointments scheduled yet
                </Typography>
                <Button variant="outlined" color="blue">
                  View All Appointments
                </Button>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}