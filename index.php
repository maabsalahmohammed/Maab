
<?php
session_start();

$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = $_POST["email"];
    $password = $_POST["password"];

    // اختبار مبدئي لحين ربط قاعدة البيانات
    if ($email == "admin@gmail.com" && $password == "123456") {

        $_SESSION["email"] = $email;

        header("Location: index.php");
        exit();

    } else {
        $error = "البريد الإلكتروني أو كلمة المرور غير صحيحة";
    }
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ALMAAB | تسجيل الدخول</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body class="login-body">

    <div class="login-container">
        <div class="logo">A<span>.</span></div>

        <h1>ALMAAB</h1>
        <p class="subtitle">عالم التكنولوجيا بين يديك</p>

        <?php if ($error != ""): ?>
            <p style="color:red;">
                <?php echo $error; ?>
            </p>
        <?php endif; ?>

        <form method="POST" action="login.php">

            <label>البريد الإلكتروني</label>
            <input type="email" name="email"
                   placeholder="أدخل بريدك الإلكتروني" required>

            <label>كلمة المرور</label>
            <input type="password" name="password"
                   placeholder="أدخل كلمة المرور" required>

            <button type="submit" class="login-btn">
                تسجيل الدخول
            </button>

        </form>

        <p class="footer-text">
            ALMAAB © 2026 | جميع الحقوق محفوظة
        </p>
    </div>

</body>
</html>
