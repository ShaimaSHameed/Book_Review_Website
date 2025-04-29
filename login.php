<?php
session_start();

// Database connection
$servername = "localhost";
$username = "root";
$password = "&haima321h";  // Replace with your MySQL password
$dbname = "onbook_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username_or_email = mysqli_real_escape_string($conn, $_POST['username_or_email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    // Query the database for the user
    $query = "SELECT * FROM users WHERE username = '$username_or_email' OR email = '$username_or_email'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            // Start the session and store user data
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            header("Location: dashboard.php"); // Redirect to the user dashboard
        } else {
            echo "Incorrect password!";
        }
    } else {
        echo "User not found!";
    }
}

$conn->close();
?>

<!-- HTML Form for login -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>
<body>
    <h2>Login</h2>
    <form action="login.php" method="POST">
        <input type="text" name="username_or_email" placeholder="Username or Email" required><br>
        <input type="password" name="password" placeholder="Password" required><br>
        <button type="submit">Login</button>
    </form>
    <p><a href="forgotpassword.php">Forgot Password?</a></p>
</body>
</html>
