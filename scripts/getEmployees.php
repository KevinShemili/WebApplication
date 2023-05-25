<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "../database/config.php";
// Create connection


// Check connection
if ($connection->connect_error) {
  die("Connection failed: " . $connection->connect_error);
}

$sql = "SELECT * FROM employees INNER JOIN user ON employees.id = user.id";
$result = $connection->query($sql);

if ($result->num_rows > 0) {
  // Output data of each row
  $rows = array();
  while($row = $result->fetch_assoc()) {
    $rows[] = $row;
  }
  echo json_encode($rows);
} else {
  echo "0 results";
}
$connection->close();
?>
