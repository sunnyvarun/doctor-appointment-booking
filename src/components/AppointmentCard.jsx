import { Card, CardBody, Typography, Button } from '@material-tailwind/react';
import { format, parseISO } from 'date-fns';
import { ClockIcon, UserCircleIcon, TagIcon, CalendarIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function AppointmentCard({ appointment, onCancel }) {
  const statusColors = {
    booked: 'bg-green-100 text-green-700',
    completed: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <Card className="w-full shadow-md rounded-lg overflow-hidden border">
      <CardBody className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <UserCircleIcon className="h-8 w-8 text-blue-500" />
            <Typography variant="h6" color="blue-gray" className="font-semibold">
              {appointment.doctor_name || appointment.patient_name}
            </Typography>
          </div>
          <Typography
            variant="caption"
            className={`font-medium uppercase rounded-full px-3 py-1 ${
              statusColors[appointment.status] || 'bg-gray-100 text-gray-700'
            }`}
          >
            {appointment.status}
          </Typography>
        </div>

        {appointment.specialization && (
          <div className="flex items-center gap-2 mb-2">
            <TagIcon className="h-5 w-5 text-gray-500" />
            <Typography color="gray" className="font-medium">
              {appointment.specialization}
            </Typography>
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <Typography color="gray">
            {format(parseISO(appointment.date), 'MMMM d, yyyy')}
          </Typography>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <ClockIcon className="h-5 w-5 text-gray-500" />
          <Typography color="gray">
            {appointment.start_time} - {appointment.end_time}
          </Typography>
        </div>

        <div className="flex justify-end">
          {appointment.status === 'booked' && (
            <Button
              variant="outlined"
              color="red"
              size="sm"
              className="rounded-md"
              onClick={() => onCancel(appointment.id)}
              icon={<XMarkIcon className="-ml-1 mr-2 h-4 w-4" />}
            >
              Cancel Appointment
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}