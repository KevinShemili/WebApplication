<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "../database/config.php";


function getJson($message)
{
    return json_encode($message);
}

$sql_query = " SELECT * FROM projects ";
$query_result = mysqli_query($connection, $sql_query);

if ($query_result == false) {
    $error = "Query failure.";
    echo getJson($error);
    die();
}

if (mysqli_num_rows($query_result) > 0) {

    while ($row = $query_result->fetch_assoc()) {
        $array[] = $row;
    }

    $returnObj = array(
        "status" => 200,
        "data" => $array
    );

    echo getJson($returnObj);
} else {
    $returnObj = array(
        "status" => 500,
        "error" => "Fatal Error"
    );
    echo getJson($returnObj);
}
