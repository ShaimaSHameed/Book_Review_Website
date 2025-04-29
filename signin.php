<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

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
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Check if the username or email already exists
    $checkUser = "SELECT * FROM users WHERE username = '$username' OR email = '$email'";
    $result = $conn->query($checkUser);

    if ($result->num_rows > 0) {
        echo "Username or email already exists!";
    } else {
        // Insert user data into the database
        $insertUser = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$hashed_password')";
        if ($conn->query($insertUser) === TRUE) {
            echo "Registration successful!";
            header("Location: home.html");  // Redirect to home page
            exit();
        } else {
            echo "Error: " . $conn->error;
        }
    }
}

$conn->close();
?>

<!-- HTML Form for registration -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register</title>
</head>
<body>
    <h2>Register</h2>
    <form action="signin.php" method="POST">  <!-- Corrected the form action to the current script -->
        <input type="text" name="username" placeholder="Username" required><br>
        <input type="email" name="email" placeholder="Email" required><br>
        <input type="password" name="password" placeholder="Password" required><br>
        <button type="submit">Register</button>
    </form>
</body>
</html>
