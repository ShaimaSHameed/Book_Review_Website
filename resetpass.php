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

if (isset($_GET['token'])) {
    $token = $_GET['token'];
    $query = "SELECT * FROM users WHERE reset_token = '$token' AND reset_expire > NOW()";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $new_password = mysqli_real_escape_string($conn, $_POST['password']);
            $hashed_password = password_hash($new_password, PASSWORD_BCRYPT);

            // Update the password in the database
            $updateQuery = "UPDATE users SET password = '$hashed_password', reset_token = NULL, reset_expire = NULL WHERE reset_token = '$token'";
            if ($conn->query($updateQuery) === TRUE) {
                echo "Your password has been reset successfully!";
            } else {
                echo "Error: " . $conn->error;
            }
        }
    } else {
        echo "Invalid or expired token!";
    }
}

$conn->close();
?>

<!-- HTML Form for resetting password -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Reset Password</title>
</head>
<body>
    <h2>Reset Your Password</h2>
    <form action="resetpassword.php?token=<?php echo $_GET['token']; ?>" method="POST">
        <input type="password" name="password" placeholder="New Password" required><br>
        <button type="submit">Reset Password</button>
    </form>
</body>
</html>
