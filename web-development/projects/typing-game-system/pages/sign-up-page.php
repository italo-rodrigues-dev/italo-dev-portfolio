<?php
require_once __DIR__ . "/../scripts/database-connection.php";

$error   = "";
$name    = "";
$email   = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name            = $_POST["name"]            ?? "";
    $email           = $_POST["email"]           ?? "";
    $password        = $_POST["password"]        ?? "";
    $confirmPassword = $_POST["confirm_password"] ?? "";

    // Validation
    if (empty(trim($name)) || empty(trim($email)) || empty($password) || empty($confirmPassword)) {
        $error = "Please fill in all fields.";
    } elseif ($password !== $confirmPassword) {
        $error = "Passwords do not match.";
    } else {
        // Use password_hash()
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        $stmt = mysqli_prepare($conn, "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
        mysqli_stmt_bind_param($stmt, "sss", $name, $email, $passwordHash);

        if (mysqli_stmt_execute($stmt)) {
            mysqli_stmt_close($stmt);
            mysqli_close($conn);
            header("Location: ../pages/login-page.php");
            exit;
        } else {
            $error = "Registration error: " . mysqli_stmt_error($stmt);
        }

        mysqli_stmt_close($stmt);
    }
}

mysqli_close($conn);
?>
<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Registration</title>
    <link rel="stylesheet" href="../css/pages-styles.css">
    <link rel="icon" href="../assets/icons/favicon.ico">
    <script src="../scripts/pages-script.js" defer></script>
</head>
<body>
    <div class="form-container">
    <h1>User Registration</h1>

    <?php if ($error): ?>
        <p style="color: red;"><?= htmlspecialchars($error) ?></p>
    <?php endif; ?>

    <form method="post" action="sign-up-page.php">
        <label for="name">Name:</label><br>
        <input type="text" id="name" name="name" value="<?= htmlspecialchars($name) ?>" required><br><br>

        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" value="<?= htmlspecialchars($email) ?>" required><br><br>

        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password" required><br><br>

        <label for="confirm_password">Confirm Password:</label><br>
        <input type="password" id="confirm_password" name="confirm_password" required><br><br>

        <button type="submit">Create user</button>
    </form>

    <p><a href="../index.html">Back</a> | <a href="../pages/login-page.php">Login</a></p>
    </div>
</body>
</html>
