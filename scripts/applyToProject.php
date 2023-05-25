<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();
require "../database/config.php";

function getJson($message)
{
    return json_encode($message);
}

if (!isset($_SESSION['user_id'])) {
    $error = 'Fatal Error (user_id unavailable.).';
    echo getJson($error);
    die();
} else {
    $userId = $_SESSION['user_id'];
}

if (!isset($_POST['projectId'])) {
    $error = 'Fatal Error (project_id unavailable.).';
    echo getJson($error);
    die();
} else {
    $projectId = $_POST['projectId'];
}

$date = date('Y-m-d');

$sql_insert_query = " INSERT INTO `user_projects`(`user_id`, `project_id`, `status`, `appliedOn`) VALUES ('$userId','$projectId','0','$date') ";
$mysqliResult = mysqli_query($connection, $sql_insert_query);

if ($mysqliResult == false) {
    $error = "Fatal error.";
    echo getJson($error);
    die();
}

echo getJson("200");
