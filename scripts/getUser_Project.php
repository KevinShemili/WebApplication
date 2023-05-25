<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "../database/config.php";


function getJson($message)
{
    return json_encode($message);
}

function get_user_project($user_id, $project_id)
{
    global $connection;
    $sql_query = "SELECT `status`, `appliedOn` FROM `user_projects` WHERE `user_id`='$user_id' AND `project_id`='$project_id' ";
    $query_result = mysqli_query($connection, $sql_query);

    if ($query_result == false) {
        $error = "Query failure.";
        return $error;
    }

    if (mysqli_num_rows($query_result) > 0) {
        $row = mysqli_fetch_array($query_result);

        return $row;
    } else {
        return null;
    }
}
