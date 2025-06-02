/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import { format, parseISO, isToday } from 'date-fns';
import { motion } from 'framer-motion';

export default function SlotPicker({ slots, onSelect, selectedSlot }) {
  const [groupedSlots, setGroupedSlots] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const grouped = slots.reduce((acc, slot) => {
      const date = format(parseISO(slot.date), 'yyyy-MM-dd');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(slot);
      return acc;
    }, {});

    setGroupedSlots(grouped);

    // Set the first available date as selected by default
    const dates = Object.keys(grouped);
    if (dates.length > 0 && !selectedDate) {
      setSelectedDate(dates[0]);
    }
  }, [slots, selectedDate]); // Added selectedDate to dependencies

  const formatDisplayDate = (dateStr) => {
    const date = parseISO(dateStr);
    return isToday(date) ? 'Today' : format(date, 'EEE, MMM d');
  };

  return (
    <div className="space-y-8"> {/* Increased vertical spacing */}
      <Typography variant="h6" color="blue-gray" className="font-semibold"> {/* Slightly smaller heading */}
        Select Appointment Time
      </Typography>

      <div className="flex gap-3 overflow-x-auto pb-3"> {/* Increased horizontal gap */}
        {Object.keys(groupedSlots).map((date) => (
          <Button
            key={date}
            variant={selectedDate === date ? 'gradient' : 'outlined'} 
            color={selectedDate === date ? 'blue' : 'blue-gray'}
            onClick={() => setSelectedDate(date)}
            className="whitespace-nowrap rounded-md shadow-sm hover:shadow-md transition-shadow duration-200" 
          >
            {formatDisplayDate(date)}
          </Button>
        ))}
      </div>

      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" 
        >
          {groupedSlots[selectedDate]?.map((slot) => (
            <Button
              key={slot.id}
              variant={selectedSlot?.id === slot.id ? 'filled' : 'outlined'}
              color={selectedSlot?.id === slot.id ? 'green' : 'blue-gray'} 
              onClick={() => onSelect(slot)}
              className="h-12 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 font-medium" 
            >
              {format(parseISO(`2000-01-01T${slot.start_time}`), 'h:mm a')} {/* Nicer time format */}
            </Button>
          ))}
        </motion.div>
      )}

      {Object.keys(groupedSlots).length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Typography color="red" variant="body1" className="text-center py-6 rounded-md bg-red-50 bg-opacity-50"> {/* Improved "No Slots" message */}
            No available time slots for this doctor. Please check back later.
          </Typography>
        </motion.div>
      )}
    </div>
  );
}