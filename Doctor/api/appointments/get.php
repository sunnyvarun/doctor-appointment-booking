<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
require '../../config/db.php';

$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;
$role = isset($_GET['role']) ? $_GET['role'] : null;

if($user_id && $role) {
    if($role == 'patient') {
        $stmt = $conn->prepare("
            SELECT a.id, u.name as doctor_name, d.specialization, s.date, s.start_time, s.end_time, a.status
            FROM appointments a
            JOIN doctors d ON a.doctor_id = d.id
            JOIN users u ON d.user_id = u.id
            JOIN doctor_slots s ON a.slot_id = s.id
            WHERE a.patient_id = ?
            ORDER BY s.date DESC, s.start_time DESC
        ");
        $stmt->execute([$user_id]);
    } elseif($role == 'doctor') {
        // First get the doctor's ID from their user_id
        $stmt = $conn->prepare("
            SELECT a.id, u.name as patient_name, u.phone, s.date, s.start_time, s.end_time, a.status
            FROM appointments a
            JOIN users u ON a.patient_id = u.id
            JOIN doctor_slots s ON a.slot_id = s.id
            WHERE a.doctor_id = (SELECT id FROM doctors WHERE user_id = ?)
            ORDER BY s.date DESC, s.start_time DESC
        ");
        $stmt->execute([$user_id]);
    }
    
    $appointments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["status" => "success", "appointments" => $appointments]);
} else {
    echo json_encode(["status" => "error", "message" => "User ID and role required"]);
}
?>