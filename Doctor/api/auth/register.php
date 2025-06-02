<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
require '../../config/db.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->email) && isset($data->password) && isset($data->name) && isset($data->phone) && isset($data->role)) {
    $email = $data->email;
    $password = password_hash($data->password, PASSWORD_DEFAULT);
    $name = $data->name;
    $phone = $data->phone;
    $role = $data->role;

    // Check if user already exists
    $check = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $check->execute([$email]);
    
    if($check->rowCount() > 0) {
        echo json_encode(["status" => "error", "message" => "User already exists"]);
        exit();
    }

    // Insert new user
    $stmt = $conn->prepare("INSERT INTO users (email, password, name, phone, role) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$email, $password, $name, $phone, $role]);
    
    if($stmt->rowCount() > 0) {
        echo json_encode(["status" => "success", "message" => "Registration successful"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Registration failed"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}
?>