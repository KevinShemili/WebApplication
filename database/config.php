<?php

// database

$connection = mysqli_connect('localhost:3309', 'root', '', 'softeng');

if (!$connection) {
    
    die("Connection error: " . mysqli_connect_error());
}
