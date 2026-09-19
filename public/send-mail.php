<?php
/**
 * MergePDFFilesFree - Contact Form SMTP Mailer
 * Handles contact form submissions and sends emails via SMTP.
 */

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

// =======================================================
// SMTP CONFIGURATION
// Update with your SMTP credentials below
// =======================================================
define('SMTP_HOST', 'mail.mergepdffilesfree.com'); // e.g. smtp.hostinger.com, smtp.titan.email, mail.mergepdffilesfree.com
define('SMTP_PORT', 465);                         // 465 (SSL) or 587 (TLS)
define('SMTP_SECURE', 'ssl');                     // 'ssl' or 'tls'
define('SMTP_USER', 'hello@mergepdffilesfree.com');
define('SMTP_PASS', 'YOUR_SMTP_PASSWORD_HERE');   // <-- UPDATE YOUR SMTP PASSWORD HERE
define('TO_EMAIL', 'hello@mergepdffilesfree.com');
define('FROM_NAME', 'MergePDFFilesFree Contact Form');

// Allow only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed.']);
    exit;
}

// Read raw JSON or form POST data
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$name    = isset($input['name']) ? trim(strip_tags($input['name'])) : '';
$email   = isset($input['email']) ? trim(filter_var($input['email'], FILTER_SANITIZE_EMAIL)) : '';
$subject = isset($input['subject']) ? trim(strip_tags($input['subject'])) : 'New Contact Inquiry';
$message = isset($input['message']) ? trim(strip_tags($input['message'])) : '';

// Validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please fill in all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address provided.']);
    exit;
}

// Check if password has been configured
if (SMTP_PASS === 'YOUR_SMTP_PASSWORD_HERE' || empty(SMTP_PASS)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'SMTP password has not been updated yet in send-mail.php. Please update SMTP_PASS.'
    ]);
    exit;
}

// Compose email body
$emailSubject = "[MergePDFFilesFree] " . $subject;
$emailBody  = "New message from MergePDFFilesFree Contact Form:

";
$emailBody .= "Name: " . $name . "
";
$emailBody .= "Email: " . $email . "
";
$emailBody .= "Inquiry Type: " . $subject . "
";
$emailBody .= "Date/Time: " . date('Y-m-d H:i:s T') . "

";
$emailBody .= "Message:
" . $message . "
";

// Helper function to send email via SMTP socket
function sendSmtpMail($to, $toName, $subject, $body, $replyToEmail, $replyToName) {
    $host = SMTP_HOST;
    $port = SMTP_PORT;
    $secure = strtolower(SMTP_SECURE);
    $user = SMTP_USER;
    $pass = SMTP_PASS;

    $remoteHost = ($secure === 'ssl') ? 'ssl://' . $host : $host;

    $socket = @stream_socket_client("$remoteHost:$port", $errno, $errstr, 20, STREAM_CLIENT_CONNECT);
    if (!$socket) {
        return ['success' => false, 'error' => "Cannot connect to SMTP server: $errstr ($errno)"];
    }

    stream_set_timeout($socket, 15);

    $read = function() use ($socket) {
        $data = '';
        while ($str = fgets($socket, 515)) {
            $data .= $str;
            if (substr($str, 3, 1) === ' ') break;
        }
        return $data;
    };

    $send = function($cmd) use ($socket, $read) {
        fputs($socket, $cmd . "\r\n");
        return $read();
    };

    $res = $read();
    if (substr($res, 0, 3) !== '220') {
        fclose($socket);
        return ['success' => false, 'error' => "SMTP greeting error: $res"];
    }

    $res = $send("EHLO " . gethostname());

    if ($secure === 'tls') {
        $res = $send("STARTTLS");
        if (substr($res, 0, 3) !== '220') {
            fclose($socket);
            return ['success' => false, 'error' => "STARTTLS failed: $res"];
        }
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($socket);
            return ['success' => false, 'error' => "TLS encryption handshake failed."];
        }
        $send("EHLO " . gethostname());
    }

    // Authenticate
    $res = $send("AUTH LOGIN");
    if (substr($res, 0, 3) !== '334') {
        fclose($socket);
        return ['success' => false, 'error' => "AUTH LOGIN rejected: $res"];
    }

    $res = $send(base64_encode($user));
    if (substr($res, 0, 3) !== '334') {
        fclose($socket);
        return ['success' => false, 'error' => "Username rejected: $res"];
    }

    $res = $send(base64_encode($pass));
    if (substr($res, 0, 3) !== '235') {
        fclose($socket);
        return ['success' => false, 'error' => "Authentication failed: $res"];
    }

    // Mail transaction
    $send("MAIL FROM: <$user>");
    $res = $send("RCPT TO: <$to>");
    if (substr($res, 0, 3) !== '250') {
        fclose($socket);
        return ['success' => false, 'error' => "Recipient rejected: $res"];
    }

    $send("DATA");

    $headers  = "From: " . FROM_NAME . " <$user>\r\n";
    $headers .= "Reply-To: $replyToName <$replyToEmail>\r\n";
    $headers .= "To: $toName <$to>\r\n";
    $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";

    $payload = $headers . "\r\n" . $body . "\r\n.\r\n";
    fputs($socket, $payload);
    $res = $read();

    $send("QUIT");
    fclose($socket);

    if (substr($res, 0, 3) !== '250') {
        return ['success' => false, 'error' => "Failed to deliver message: $res"];
    }

    return ['success' => true];
}

$result = sendSmtpMail(TO_EMAIL, 'MergePDFFilesFree Team', $emailSubject, $emailBody, $email, $name);

if ($result['success']) {
    echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $result['error']]);
}
