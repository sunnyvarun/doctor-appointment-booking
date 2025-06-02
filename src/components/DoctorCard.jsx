import { Card, CardBody, Typography, Avatar, Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/solid'; // Import icons

export default function DoctorCard({ doctor }) {
  return (
    <Card className="w-full max-w-[26rem] shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardBody className="p-6">
        <div className="flex items-center gap-6 mb-5">
          <Avatar
            src={
              doctor.imageUrl || // Use a specific image URL if available
              'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80'
            }
            alt={doctor.name}
            size="xl"
            variant="circular"
            className="border-2 border-blue-500"
          />
          <div>
            <Typography variant="h5" color="blue-gray" className="font-semibold mb-1">
              {doctor.name}
            </Typography>
            <Typography variant="subtitle1" color="indigo" className="font-medium">
              {doctor.specialization}
            </Typography>
            {doctor.rating && (
              <div className="flex items-center gap-1 mt-1">
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <Typography variant="small" color="gray">
                  {doctor.rating} ({doctor.reviewCount || '0'} reviews)
                </Typography>
              </div>
            )}
            {doctor.location && (
              <div className="flex items-center gap-1 mt-1">
                <MapPinIcon className="h-4 w-4 text-gray-500" />
                <Typography variant="small" color="gray">
                  {doctor.location}
                </Typography>
              </div>
            )}
          </div>
        </div>
        <Typography color="gray" className="mb-5">
          {doctor.bio?.substring(0, 150) || 'No bio available'}
          {doctor.bio?.length > 150 && <Link to={`/doctor/${doctor.id}`} className="text-blue-500 hover:underline"> Read more</Link>}
        </Typography>
        <Link to={`/book/${doctor.id}`} className="inline-block w-full">
          <Button variant="gradient" color="blue" fullWidth className="rounded-md shadow-md hover:shadow-lg">
            Book Appointment
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
}