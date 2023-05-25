<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "../database/config.php";

function getJson($message)
{
    return json_encode($message);
}

if (!isset($_POST['id'])) {
    $error = 'Fatal error.';
    echo getJson($error);
    die();
} else {
    $id = $_POST['id'];
}


if (!isset($_POST['projectName']) || $_POST['projectName'] == "") {
    $error = 'Fill in all fields.';
    echo getJson($error);
    die();
} else {
    $projectName = mysqli_real_escape_string($connection, $_POST['projectName']);
}

if (!isset($_POST['clientName']) || $_POST['clientName'] == "") {
    $error = 'Fill in all fields.';
    echo getJson($error);
    die();
} else {
    $clientName = mysqli_real_escape_string($connection, $_POST['clientName']);
}

if (!isset($_POST['clientEmail']) || $_POST['clientEmail'] == "") {
    $error = 'Fill in all fields.';
    echo getJson($error);
    die();
} else {
    $clientEmail = mysqli_real_escape_string($connection, $_POST['clientEmail']);
}

if (!isset($_POST['country']) || $_POST['country'] == "") {
    $error = 'Fill in all fields.';
    echo getJson($error);
    die();
} else {
    $country = mysqli_real_escape_string($connection, $_POST['country']);
}

if (!isset($_POST['description']) || $_POST['description'] == "") {
    $error = 'Fill in all fields.';
    echo getJson($error);
    die();
} else {
    $description = mysqli_real_escape_string($connection, $_POST['description']);
}


$sql_query = " UPDATE `projects` SET `name`='$projectName',`client`='$clientName',`clientEmail`='$clientEmail',`description`='$description',`country`='$country' WHERE `id`='$id' ";
$query_result = mysqli_query($connection, $sql_query);

if ($query_result == false) {
    $error = "Error updating, please try again.";
    echo getJson($error);
    die();
} else {
    echo getJson("200");
}
