<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
require '../../config/db.php';

$stmt = $conn->prepare("
    SELECT d.id, u.name, d.specialization, d.bio 
    FROM doctors d
    JOIN users u ON d.user_id = u.id
");
$stmt->execute();
$doctors = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(["status" => "success", "doctors" => $doctors]);
?>