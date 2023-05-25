<?php
// Replace with your actual database details
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "../database/config.php";

// Check connection
if ($connection->connect_error) {
  die("Connection failed: " . $connection->connect_error);
}






function getJson($message)
{
    return json_encode($message);
}

if (!isset($_POST['bonusRate']) || $_POST['bonusRate'] == "") {
    $error = 'Fill in all fields.';
    echo getJson($error);
    die();
} else {
    $bonusRate = mysqli_real_escape_string($connection, $_POST['bonusRate']);
}

if (!isset($_POST['paymentRate']) || $_POST['paymentRate'] == "") {
    $error = 'Fill in all fields.';
    echo getJson($error);
    die();
} else {
    $paymentRate = mysqli_real_escape_string($connection, $_POST['paymentRate']);
}

if (!isset($_POST['id']) || $_POST['id'] == "") {
    $error = 'Fill in all fields.';
    echo getJson($error);
    die();
} else {
    $id = mysqli_real_escape_string($connection, $_POST['id']);
}


if (!isset($_POST['hours']) || $_POST['hours'] == "") {
    echo getJson("modal");
    die();
} else {
    $hours = mysqli_real_escape_string($connection, $_POST['hours']);
}

if (!isset($_POST['date']) || $_POST['date'] == "") {
    echo getJson("modal");
    die();
} else {
    $date = mysqli_real_escape_string($connection, $_POST['date']);
}
$activationdate = date('Y-m-d H:i:s');

$sql = "INSERT INTO contract (employeeid,ratePerHour, hoursPerDay, bonusRate, acceptedByEmployee,status,date ) VALUES ('$id','$paymentRate', '$hours', '$bonusRate', 2,0,'$activationdate')";
$mysqliResult = mysqli_query($connection, $sql);



if ($mysqliResult == false) {
    $error = $sql;
    echo getJson($error);
    die();
}




echo getJson("200");

?>
