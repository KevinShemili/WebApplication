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
$id=$_POST['id'];

function getJson($message)
{
    return json_encode($message);
}
$deactivationdate = date('Y-m-d H:i:s');

$sql = "UPDATE employees SET active=0,DeactivationDate='$deactivationdate' WHERE id = $id;";


$mysqliResult = mysqli_query($connection, $sql);

if ($mysqliResult == false) {
    $error = "Fatal error.";
    echo getJson($error);
    die();
}




echo getJson("200");

?>
