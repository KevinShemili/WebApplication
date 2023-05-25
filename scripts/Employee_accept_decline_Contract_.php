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
$id = $_POST['id'];
$date = $_POST['date'];
$accepted_or_not = $_POST['accepted_or_not'];
$currentdate = date('Y-m-d H:i:s');

if($accepted_or_not==1){
    
// First, set all statuses to 0 and deactivation dates to current date
$query1 = "UPDATE contract SET status = 0, deactivationdate = '$currentdate'";
if (!$connection->query($query1)) {
    echo "Error updating record: " . $connection->error;
}

// Then, find the special row with the provided id and date and set status to 1, and activation date to current date
$query2 = "UPDATE contract SET status = 1,acceptedByEmployee=1, date = '$currentdate',deactivationdate = NULL WHERE employeeid = '$id' AND date = '$date'";
if (!$connection->query($query2)) {
    echo "Error updating record: " . $connection->error;
}

}
else{
    $query2 = "UPDATE contract SET acceptedByEmployee=0,status=0 WHERE employeeid = '$id' AND date = '$date'";
    if (!$connection->query($query2)) {
        echo "Error updating record: " . $connection->error;
    }
    

}




function getJson($message)
{
    return json_encode($message);
}








echo getJson("200");

?>
