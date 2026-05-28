<?php
session_start();

// If already logged in, redirect to the main page
if (isset($_SESSION["user_id"])) {
    header("Location: /index.html");
    exit;
}

$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    require_once __DIR__ . "/../scripts/database-connection.php";

    $email = $_POST["email"] ?? "";
    $password = $_POST["password"] ?? "";

    if (empty($email) || empty($password)) {
        $error = "Please fill in all fields.";
    } else {
        // Prepared Statement to fetch the user by email
        $stmt = mysqli_prepare($conn, "SELECT id, nome, senha FROM usuarios WHERE email = ?");
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if ($user = mysqli_fetch_assoc($result)) {
            // Verify the password with password_verify()
            if (password_verify($password, $user["senha"])) {
                // Successful login — regenerate ID and save session
                session_regenerate_id(true);
                $_SESSION["user_id"]   = $user["id"];
                $_SESSION["user_name"] = $user["nome"];

                mysqli_stmt_close($stmt);
                mysqli_close($conn);

                header("Location: /index.html");
                exit;
            }
        }

        // Login failed (email not found or password incorrect)
        $error = "Invalid email or password.";
        mysqli_stmt_close($stmt);
        mysqli_close($conn);
    }
}
?>

<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="../css/pages-styles.css">
    <link rel="icon" href="../assets/icons/favicon.ico">
    <script src="../scripts/pages-script.js" defer></script>
</head>
<body>
    <div class="form-container">
    
    <h1>Login</h1>

    <?php if ($error): ?>
        <p style="color: red;"><?= htmlspecialchars($error) ?></p>
    <?php endif; ?>
    
        <form method="post" action="login-page.php">
            <label class="form-label" for="email">Email:</label><br>
            <input type="email" id="email" name="email" required><br><br>

            <label class="form-label" for="password">Password:</label><br>
            <input type="password" id="password" name="password" required><br><br>

            <button type="submit">Log in</button>
        </form>

        <p><a href="../index.html">Back</a> | <a href="sign-up-page.php">Sign up</a></p>
    </div>
</body>
</html>
