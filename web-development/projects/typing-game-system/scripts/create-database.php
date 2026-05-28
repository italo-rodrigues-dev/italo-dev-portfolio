<?php
require_once __DIR__ . "/database-config.php";

$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS);

if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}

mysqli_set_charset($conn, "utf8mb4");

$sql = "
    CREATE DATABASE IF NOT EXISTS " . DB_NAME . "
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci
";

if (mysqli_query($conn, $sql)) {
    echo "Database '" . DB_NAME . "' created successfully";
    } else {
    echo "Error creating database: " . mysqli_error($conn);
}

mysqli_close($conn);
?>