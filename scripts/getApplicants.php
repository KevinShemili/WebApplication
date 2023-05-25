<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "../database/config.php";

function getJson($message)
{
    return json_encode($message);
}

if (!isset($_POST['projectId'])) {
    $error = 'Invalid id format.';
    echo getJson($error);
    die();
} else {
    $projectId = $_POST['projectId'];
}

$sql_query = "SELECT u.*, up.status, up.appliedOn FROM user AS u INNER JOIN user_projects AS up ON u.id = up.user_id WHERE up.project_id = ?";

$stmt = mysqli_prepare($connection, $sql_query);
mysqli_stmt_bind_param($stmt, "i", $projectId);

if (mysqli_stmt_execute($stmt)) {
    $result = mysqli_stmt_get_result($stmt);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $array[] = $row;
        }
        $returnObj = array(
            "status" => 200,
            "data" => $array
        );
    } else {
        $returnObj = array(
            "status" => 500,
            "error" => "No current applications for this opening."
        );
    }
} else {
    $returnObj = array(
        "status" => 500,
        "error" => "Query failure"
    );
}

echo getJson($returnObj);
