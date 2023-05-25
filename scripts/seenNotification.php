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
$True_value=$_POST['Allow'];





function getJson($message)
{
    return json_encode($message);
}


if($True_value==1){
    $sql ="UPDATE contract SET seen = 1;" ;


$mysqliResult = mysqli_query($connection, $sql);

if ($mysqliResult == false) {
    $error = $mysqliResult;
    echo getJson($error);
    
    die();
}
echo getJson("200");



}


?>
