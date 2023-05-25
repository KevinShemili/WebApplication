<?php
session_start();
if (isset($_SESSION['user_id'])){
    $user_id=$_SESSION['user_id'];
}
 ini_set('display_errors', 1);
 ini_set('display_startup_errors', 1);
 error_reporting(E_ALL);
 
 require "../database/config.php";

    // Check connection
    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    }

    $user_id = mysqli_real_escape_string($connection, $user_id); // Assuming you are using MySQLi

    $sql = "SELECT * FROM contract JOIN employees ON contract.employeeid = employees.id WHERE contract.employeeid = '$user_id';";
        
    $result = $connection->query($sql);

    $contracts = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $contracts[] = $row;
        }
    }
    echo json_encode($contracts);

    $connection->close();
?>
