<?php

header('Content-Type: application/json');

$username=$_POST['cb_name'];
$email=$_POST['cb_email'];
$text=$_POST['cb_text'];

$message =
"Имя: ".htmlspecialchars($username)."<br />
Почта: ".htmlspecialchars($email)."<br />
Сообщение: ".htmlspecialchars($text);

require_once('phpmailer/PHPMailerAutoload.php');
require_once('config.php');

$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$mail->isSMTP();
$mail->Host = 'smtp.yandex.ru';
$mail->SMTPAuth = true;

$mail->Username = $from_email;
$mail->Password = $from_password;

$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

$mail->setFrom($from_email, 'Пешеход Тур - заявка с сайта');
$mail->addAddress($to_email_box);

$mail->isHTML(true);

$mail->Subject = 'Пешеход Тур - заявка с сайта';
$mail->Body = $message;

$success = false;
if (!$mail->send()) {
    $msg = 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo;
} else {
    $msg = 'Message has been sent';
    $success = true;
}

ob_clean();
echo json_encode(['message' => $msg, 'success' => $success]);
