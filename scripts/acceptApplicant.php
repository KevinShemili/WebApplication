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

if (!isset($_GET['projectId'])) {
    $error = 'Fatal error.';
    echo getJson($error);
    die();
} else {
    $projectId = $_GET['projectId'];
}

$userId = $_GET['user_id'];

$sql_query = " UPDATE `user_projects` SET `status`='1' WHERE `user_id`='$userId' AND `project_id`='$projectId' ";
$query_result = mysqli_query($connection, $sql_query);

if ($query_result == false) {
    $error = "Error updating, please try again.";
    echo getJson($error);
    die();
} else {
    echo getJson("200");
    header("Location: ../views/viewProjectAdmin.php?projectId={$projectId}");
}
