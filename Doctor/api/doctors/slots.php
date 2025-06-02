<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
require '../../config/db.php';

$doctor_id = isset($_GET['doctor_id']) ? $_GET['doctor_id'] : null;

if($doctor_id) {
    // Get available slots (not booked)
    $stmt = $conn->prepare("
        SELECT s.id, s.date, s.start_time, s.end_time
        FROM doctor_slots s
        LEFT JOIN appointments a ON s.id = a.slot_id AND a.status != 'cancelled'
        WHERE s.doctor_id = ? AND a.id IS NULL AND s.date >= CURDATE()
        ORDER BY s.date, s.start_time
    ");
    $stmt->execute([$doctor_id]);
    $slots = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(["status" => "success", "slots" => $slots]);
} else {
    echo json_encode(["status" => "error", "message" => "Doctor ID required"]);
}
?>