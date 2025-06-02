<?php
// Load Composer's autoloader
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

function sendConfirmationEmail($to, $name, array $appointmentDetails) {
    // Create a new PHPMailer instance
    $mail = new PHPMailer(true); // Passing true enables exceptions
    
    try {
        // Server settings
        $mail->SMTPDebug = SMTP::DEBUG_OFF;      // Enable verbose debug output (DEBUG_SERVER for testing)
        $mail->isSMTP();                         // Send using SMTP
        $mail->Host       = 'smtp.example.com';  // Set the SMTP server
        $mail->SMTPAuth   = true;                // Enable SMTP authentication
        $mail->Username   = 'your_email@example.com'; // SMTP username
        $mail->Password   = 'your_password';     // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption
        $mail->Port       = 587;                 // TCP port to connect to

        // Recipients
        $mail->setFrom('no-reply@clinic.com', 'Clinic Appointment System');
        $mail->addAddress($to, $name);           // Add a recipient
        
        // Validate required appointment details
        $requiredFields = ['doctor_name', 'date', 'time'];
        foreach ($requiredFields as $field) {
            if (!isset($appointmentDetails[$field]) || empty($appointmentDetails[$field])) {
                throw new Exception("Missing required field: $field");
            }
        }

        // Email content
        $mail->isHTML(true);                     // Set email format to HTML
        $mail->Subject = 'Appointment Confirmation';
        
        // Build email body with proper escaping
        $mail->Body = sprintf(
            '<html>
            <body>
                <p>Dear %s,</p>
                <p>Your appointment has been confirmed:</p>
                <ul>
                    <li><strong>Doctor:</strong> %s</li>
                    <li><strong>Date:</strong> %s</li>
                    <li><strong>Time:</strong> %s</li>
                </ul>
                <p>Thank you for choosing our clinic.</p>
            </body>
            </html>',
            htmlspecialchars($name),
            htmlspecialchars($appointmentDetails['doctor_name']),
            htmlspecialchars($appointmentDetails['date']),
            htmlspecialchars($appointmentDetails['time'])
        );

        // Plain text version for non-HTML email clients
        $mail->AltBody = sprintf(
            "Dear %s,\n\nYour appointment has been confirmed:\n\n" .
            "Doctor: %s\nDate: %s\nTime: %s\n\n" .
            "Thank you for choosing our clinic.",
            $name,
            $appointmentDetails['doctor_name'],
            $appointmentDetails['date'],
            $appointmentDetails['time']
        );

        $mail->send();
        return ['success' => true, 'message' => 'Email sent successfully'];
    } catch (Exception $e) {
        return [
            'success' => false,
            'message' => "Email could not be sent. Error: {$mail->ErrorInfo}"
        ];
    }
}

// Example usage:
$result = sendConfirmationEmail(
    'patient@example.com',
    'John Doe',
    [
        'doctor_name' => 'Dr. Smith',
        'date' => date('Y-m-d', strtotime('+1 day')),
        'time' => '10:00 AM'
    ]
);

if ($result['success']) {
    echo $result['message'];
} else {
    echo "Error: " . $result['message'];
}
?>