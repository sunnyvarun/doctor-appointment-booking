<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
require '../../config/db.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->user_id) && isset($data->specialization) && isset($data->bio)) {
    $user_id = $data->user_id;
    $specialization = $data->specialization;
    $bio = $data->bio;

    $stmt = $conn->prepare("INSERT INTO doctors (user_id, specialization, bio) VALUES (?, ?, ?)");
    $stmt->execute([$user_id, $specialization, $bio]);
    
    if($stmt->rowCount() > 0) {
        echo json_encode(["status" => "success", "message" => "Doctor added successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to add doctor"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}
?>