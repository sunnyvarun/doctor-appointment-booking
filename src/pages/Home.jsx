/* eslint-disable no-unused-vars */
import { Typography, Button, Card, CardBody } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BuildingOffice2Icon, ClockIcon, CalendarIcon, PhoneIcon, StarIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const features = [
    {
      icon: <ClockIcon className="h-6 w-6" />,
      title: "Quick Appointments",
      description: "Book in just a few clicks"
    },
    {
      icon: <CalendarIcon className="h-6 w-6" />,
      title: "Flexible Scheduling",
      description: "Choose your preferred time"
    },
    {
      icon: <BuildingOffice2Icon className="h-6 w-6" />,
      title: "Top Specialists",
      description: "Quality healthcare providers"
    },
    {
      icon: <PhoneIcon className="h-6 w-6" />,
      title: "24/7 Support",
      description: "We're always available"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Patient",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      comment: "Booking appointments has never been easier. Found my perfect doctor in minutes!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "New Patient",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857",
      comment: "The doctors here are incredibly professional. My health has improved significantly.",
      rating: 4
    }
  ];

  return (
    <div className="text-center">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/public/grid.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h1" className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Healthcare Made <span className="text-blue-600">Simple</span>
            </Typography>
            <Typography variant="lead" className="mb-8 max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
              Connect with top-rated doctors and manage your health with our easy-to-use platform.
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/doctors">
                <Button size="lg" color="blue" className="flex items-center gap-2 px-8">
                  Find Doctors
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outlined" color="blue" className="flex items-center gap-2 px-8">
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-16"
          >
            <img
              src="https://www.motherhoodindia.com/wp-content/uploads/2021/09/Contact-page-Book-an-Appointment_Mobile-banner_578X364-px-02.jpg"
              alt="Doctor with patient"
              className="rounded-xl shadow-2xl mx-auto w-full max-w-4xl border-4 border-white"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" className="mb-16 text-center text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose Our Platform
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                    <CardBody className="p-6 text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        {feature.icon}
                      </div>
                      <Typography variant="h5" className="mb-2 text-lg font-semibold text-gray-900">
                        {feature.title}
                      </Typography>
                      <Typography className="text-gray-600">
                        {feature.description}
                      </Typography>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" className="mb-12 text-center text-3xl md:text-4xl font-bold text-gray-900">
              What Our Patients Say
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardBody className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="h-12 w-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                          <img 
                            src={`${testimonial.avatar}?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80`} 
                            alt={testimonial.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <Typography variant="h6" className="text-gray-900">
                            {testimonial.name}
                          </Typography>
                          <Typography variant="small" color="gray">
                            {testimonial.role}
                          </Typography>
                        </div>
                        <div className="ml-auto flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i} 
                              className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <Typography className="text-gray-600 italic text-left">
                        "{testimonial.comment}"
                      </Typography>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Typography variant="h2" className="mb-4 text-3xl md:text-4xl font-bold">
              Ready to Take Control of Your Health?
            </Typography>
            <Typography variant="lead" className="mb-8 max-w-2xl mx-auto text-lg md:text-xl text-blue-100">
              Join thousands of satisfied patients who found their perfect doctor through our platform.
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/doctors">
                <Button size="lg" color="white" className="text-blue-600 px-8">
                  Find a Doctor Now
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outlined" color="white" className="px-8">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}