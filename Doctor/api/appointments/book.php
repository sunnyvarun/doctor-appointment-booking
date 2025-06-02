<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Create error log file
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../../logs/php_errors.log');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Get input data
    $input = file_get_contents("php://input");
    $data = json_decode($input);
    
    if (!$data) {
        throw new Exception("Invalid JSON input");
    }
    
    // Validate required fields
    $required = ['patient_id', 'slot_id', 'doctor_id'];
    foreach ($required as $field) {
        if (!isset($data->$field)) {
            throw new Exception("Missing required field: $field");
        }
    }

    // Connect to database
    require __DIR__ . '/../../config/db.php';
    
    // Start transaction
    $conn->beginTransaction();

    // Check slot availability
    $check = $conn->prepare("
        SELECT id FROM doctor_slots 
        WHERE id = ? 
        AND NOT EXISTS (
            SELECT 1 FROM appointments 
            WHERE slot_id = ? 
            AND status != 'cancelled'
        )
    ");
    $check->execute([$data->slot_id, $data->slot_id]);
    
    if ($check->rowCount() === 0) {
        throw new Exception("Slot is no longer available");
    }

    // Create appointment
    $stmt = $conn->prepare("
        INSERT INTO appointments 
        (patient_id, doctor_id, slot_id, status, created_at) 
        VALUES (?, ?, ?, 'booked', NOW())
    ");
    
    if (!$stmt->execute([$data->patient_id, $data->doctor_id, $data->slot_id])) {
        throw new Exception("Failed to create appointment");
    }
    
    $appointmentId = $conn->lastInsertId();
    $conn->commit();

    // Return success
    http_response_code(201);
    echo json_encode([
        'status' => 'success',
        'message' => 'Appointment booked successfully',
        'appointment_id' => $appointmentId
    ]);

} catch (PDOException $e) {
    if (isset($conn) && $conn->inTransaction()) {
        $conn->rollBack();
    }
    error_log("Database Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error occurred'
    ]);
} catch (Exception $e) {
    if (isset($conn) && $conn->inTransaction()) {
        $conn->rollBack();
    }
    error_log("Application Error: " . $e->getMessage());
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>