import { Navbar, Typography, Button, IconButton, Avatar } from '@material-tailwind/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Bars3Icon, XMarkIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-500 font-medium' : 'text-gray-700';
  };

  const handleNavigation = () => {
    setOpen(false);
  };

  if (!isClient) return null;

  return (
    <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <Navbar className="mx-auto max-w-full rounded-none border-none px-4 py-3 lg:px-8 lg:py-4" fullWidth>
        <div className="flex items-center justify-between text-gray-900">
          {/* Logo/Title - Links to Home */}
          <Typography
            as={Link}
            to="/"
            variant="h5"
            className="mr-4 cursor-pointer py-1.5 font-semibold text-blue-500"
            onClick={handleNavigation}
          >
            Doctor Appointments
          </Typography>

          <div className="hidden lg:flex items-center gap-6">
            {/* Home Link - Always visible */}
            <Link
              to="/"
              className={`flex items-center gap-1 text-sm py-2 px-3 rounded-md hover:text-blue-600 transition-colors duration-200 ${isActive('/')}`}
              onClick={handleNavigation}
            >
              
              Home
            </Link>

            {/* Doctors Link - Always visible */}
            <Link
              to="/doctors"
              className={`text-sm py-2 px-3 rounded-md hover:text-blue-600 transition-colors duration-200 ${isActive('/doctors')}`}
              onClick={handleNavigation}
            >
              Doctors
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                {/* Dashboard Link - Only for logged-in users */}
                <Link
                  to={user.role === 'doctor' ? '/admin' : '/dashboard'}
                  className={`text-sm py-2 px-3 rounded-md hover:text-blue-600 transition-colors duration-200 ${isActive(
                    user.role === 'doctor' ? '/admin' : '/dashboard'
                  )}`}
                  onClick={handleNavigation}
                >
                  Dashboard
                </Link>
                
                {/* Appointments Link */}
                <Link
                  to="/appointments"
                  className={`text-sm py-2 px-3 rounded-md hover:text-blue-600 transition-colors duration-200 ${isActive('/appointments')}`}
                  onClick={handleNavigation}
                >
                  My Appointments
                </Link>
                
                {/* User Profile Section */}
                <div className="flex items-center gap-2">
                  <Avatar
                    src={user.profilePicture || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&h=80&q=80'}
                    size="sm"
                  />
                  <Typography variant="small" className="font-medium text-gray-800">
                    {user.name}
                  </Typography>
                  <Button 
                    variant="text" 
                    color="blue-gray" 
                    size="sm" 
                    onClick={handleLogout}
                    className="hover:text-red-500"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className={`text-sm py-2 px-3 rounded-md hover:text-blue-600 transition-colors duration-200 ${isActive('/login')}`}
                  onClick={handleNavigation}
                >
                  Login
                </Link>
                <Link to="/register" onClick={handleNavigation}>
                  <Button variant="" size="sm" className="bg-blue-500 hover:bg-blue-600 shadow-md">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-gray-700 hover:bg-gray-100 lg:hidden"
            ripple={false}
            onClick={() => setOpen(!open)}
          >
            {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </IconButton>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden mt-4 space-y-2 bg-white py-2 rounded-md shadow-md">
            {/* Home Link - Mobile */}
            <Link
              to="/"
              className={`flex items-center gap-2 text-sm py-2 px-4 hover:bg-gray-100 transition-colors duration-200 ${isActive('/')}`}
              onClick={handleNavigation}
            >
              
              Home
            </Link>

            {/* Doctors Link - Mobile */}
            <Link
              to="/doctors"
              className={`block text-sm py-2 px-4 hover:bg-gray-100 transition-colors duration-200 ${isActive('/doctors')}`}
              onClick={handleNavigation}
            >
              Doctors
            </Link>

            {user ? (
              <div className="space-y-2 py-2 px-4">
                {/* Dashboard Link - Mobile */}
                <Link
                  to={user.role === 'doctor' ? '/admin' : '/dashboard'}
                  className={`block text-sm py-2 px-4 hover:bg-gray-100 transition-colors duration-200 ${isActive(
                    user.role === 'doctor' ? '/admin' : '/dashboard'
                  )}`}
                  onClick={handleNavigation}
                >
                  Dashboard
                </Link>
                
                {/* Appointments Link - Mobile */}
                <Link
                  to="/appointments"
                  className={`block text-sm py-2 px-4 hover:bg-gray-100 transition-colors duration-200 ${isActive('/appointments')}`}
                  onClick={handleNavigation}
                >
                  My Appointments
                </Link>
                
                {/* User Profile Section - Mobile */}
                <div className="flex items-center gap-2 pt-2 px-4">
                  <Avatar
                    src={user.profilePicture || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&h=80&q=80'}
                    size="sm"
                  />
                  <Typography variant="small" className="font-medium text-gray-800">
                    {user.name}
                  </Typography>
                  <Button 
                    variant="text" 
                    color="blue-gray" 
                    size="sm" 
                    onClick={handleLogout}
                    className="hover:text-red-500"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 py-2 px-4">
                <Link
                  to="/login"
                  className={`block text-sm py-2 px-4 hover:bg-gray-100 transition-colors duration-200 ${isActive('/login')}`}
                  onClick={handleNavigation}
                >
                  Login
                </Link>
                <Link to="/register" onClick={handleNavigation}>
                  <Button variant="gradient" size="sm" className="bg-blue-500 hover:bg-blue-600 shadow-md w-full">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </Navbar>
    </div>
  );
}