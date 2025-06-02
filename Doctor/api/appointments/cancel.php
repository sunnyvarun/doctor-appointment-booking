<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
require '../../config/db.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->appointment_id)) {
    $stmt = $conn->prepare("UPDATE appointments SET status = 'cancelled' WHERE id = ?");
    $stmt->execute([$data->appointment_id]);
    
    if($stmt->rowCount() > 0) {
        echo json_encode(["status" => "success", "message" => "Appointment cancelled successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to cancel appointment"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}
?>