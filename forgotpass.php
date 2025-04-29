<?php
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
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $query = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $token = bin2hex(random_bytes(50)); // Generate a random token
        $expire = date("Y-m-d H:i:s", strtotime("+1 hour")); // Token expires in 1 hour

        // Update the user record with the reset token and expiration time
        $updateQuery = "UPDATE users SET reset_token = '$token', reset_expire = '$expire' WHERE email = '$email'";
        if ($conn->query($updateQuery) === TRUE) {
            // Send the reset link to the user's email (in real applications, use a mail server)
            $resetLink = "http://localhost/resetpassword.php?token=$token"; // Change localhost to your live URL
            echo "Password reset link: <a href='$resetLink'>$resetLink</a>";
        } else {
            echo "Error: " . $conn->error;
        }
    } else {
        echo "No user found with that email!";
    }
}

$conn->close();
?>

<!-- HTML Form for forgot password -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Forgot Password</title>
</head>
<body>
    <h2>Forgot Password</h2>
    <form action="forgotpassword.php" method="POST">
        <input type="email" name="email" placeholder="Enter your email" required><br>
        <button type="submit">Send Reset Link</button>
    </form>
</body>
</html>
