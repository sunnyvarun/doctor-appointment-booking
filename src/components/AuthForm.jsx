/* eslint-disable no-unused-vars */
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { motion } from 'framer-motion';

export default function AuthForm({ title, subtitle, onSubmit, footer, children }) {
  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 bg-gradient-to-br from-blue-100 to-blue-300"> {/* Added background gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }} 
        className="w-full max-w-md"
      >
        <Card className="shadow-xl rounded-lg border border-gray-200"> {/* Enhanced card styling */}
          <CardBody className="p-10"> {/* Increased padding */}
            <Typography variant="h4" color="blue-500" className="mb-3 text-center font-semibold"> {/* Title styling */}
              {title}
            </Typography>
            <Typography color="gray" className="mb-8 text-center font-normal text-sm"> {/* Subtitle styling */}
              {subtitle}
            </Typography>
            <form onSubmit={onSubmit} className="space-y-6"> {/* Increased spacing */}
              {children}
            </form>
            <Typography color="gray" className="mt-6 text-center font-normal text-sm"> {/* Footer styling */}
              {footer}
            </Typography>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}