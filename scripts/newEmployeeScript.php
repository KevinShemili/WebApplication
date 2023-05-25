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

$name = $_POST['name'];
$surname = $_POST['surname'];
$email = $_POST['email'];
$user_name = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$role = "employee";

$image = $_FILES['image'];

// Check if file was uploaded without errors
if ($image['error'] == 0) {
    $fileName = $image['name'];
    $fileTmp = $image['tmp_name'];
    $fileExt = pathinfo($fileName, PATHINFO_EXTENSION);

    // Rename the file to avoid duplicates
    $newFileName = uniqid() . '.' . $fileExt;

    // Directory to upload the image
    $uploadDir = '../img/';
    
    // Move the file to the upload directory
    move_uploaded_file($fileTmp, $uploadDir . $newFileName);

    // Now $uploadDir . $newFileName contains the path of the uploaded image
    $imagePath = $uploadDir . $newFileName;
    
    // Insert the user data into the database
}    

/////////////////////////////////////////
/////////////////////////////


function getJson($message)
{
    return json_encode($message);
}

if (!isset($_POST['name']) || $_POST['name'] == "") {
    $error = 'Fill in all fields.';
    echo getJson($error);
    die();
} else {
    $name = mysqli_real_escape_string($connection, $_POST['name']);
}

if (!isset($_POST['surname']) || $_POST['surname'] == "") {
    $error = 'Fill in all fields.';
    echo getJson($error);
    die();
} else {
    $surname = mysqli_real_escape_string($connection, $_POST['surname']);
}

if (!isset($_POST['username']) || $_POST['username'] == "") {
    $error = 'Fill in all fields.';
    echo getJson($error);
    die();
} else {
    $username = mysqli_real_escape_string($connection, $_POST['username']);
}

if (!isset($_POST['password']) || $_POST['password'] == "") {
    $error = 'Fill in all fields.';
    echo getJson($error);
    die();
} else {
    $password =password_hash($_POST['password'], PASSWORD_DEFAULT); 
}

if (!isset($_POST['email']) || $_POST['email'] == "") {
    echo getJson("modal");
    die();
} else {
    $email = mysqli_real_escape_string($connection, $_POST['email']);
}
$date = date('Y-m-d');

$sql = "INSERT INTO user (username, email, password, role)
    VALUES ('$user_name', '$email', '$password', '$role')";
$mysqliResult = mysqli_query($connection, $sql);

$last_id = $connection->insert_id;


if ($mysqliResult == false) {
    $error = "Fatal error.";
    echo getJson($error);
    die();
}
$activationdate = date('Y-m-d H:i:s');

$sql2 = "INSERT INTO employees (id, name, surname, image,active,ActivationDate)
VALUES ('$last_id', '$name', '$surname', '$imagePath',1,'$activationdate')";
$mysqliResult = mysqli_query($connection, $sql2);


if ($mysqliResult == false) {
  $error = "Fatal error.";
  echo getJson($error);
  die();
}

echo getJson("200");

?>
