<?php

// Check of fields are empty

if ( 
  empty($_POST['name']) || 
  empty($_POST['email']) || 
  empty($_POST['message']) || 
  !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)
){
  echo json_encode(array('fail', 'invalid inputs'));
  return false;
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$email = strip_tags(htmlspecialchars($_POST['email']));
$message = strip_tags(htmlspecialchars($_POST['message']));

// Use info to send email to correct person

$to = 'admin@contactme.ch';
$email_subject = 'Contact form - ' . $name . ' - contactme.ch website.';
$email_body = 'You have received a message from: ' . $name . 'with this email: ' . $email . "and this is the message: " . $message;
$headers = 'From: admin@contactme.ch\n';
$headers .= 'Reply-To:' . $email;
mail($to, $email_subject, $email_body, $headers);

echo json_encode(array('success', 'Thank you ' . $name . ', your message was sent! :)'));

?>