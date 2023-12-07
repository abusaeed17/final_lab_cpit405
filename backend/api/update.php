<?php

header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    header('ALLOW: PUT');
    http_response_code(405);
    echo json_encode(array('message' => 'Method not allowed'));
    return;
}

include_once '../db/Database.php';
include_once '../models/Bookmark.php';


$database = new Database();
$dbConnection = $database->connect();


$bookmark = new Bookmark($dbConnection);


$data = json_decode(file_get_contents('php://input'), true);


if (!$data || !isset($data['title']) || !isset($data['URL']) || !isset($data['id'])) {
    http_response_code(422);
    echo json_encode(
        array('message' => 'Error missing required parameters title, URL, or id in the JSON body')
    );
    return;
}


$bookmark->setId($data['id']);
$bookmark->setTitle($data['title']);
$bookmark->setURL($data['URL']);


if ($bookmark->update()) {
    echo json_encode(
        array('message' => 'Bookmark item was updated')
    );
} else {
    http_response_code(500); 
    echo json_encode(
        array('message' => 'Error: Bookmark item was not updated')
    );
}
