<?php

session_start();

try {
  $db = new PDO('mysql:host=localhost;dbname=php_ajax_example;charset=utf8mb4;', 'root', 'root');
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
} catch (PDOException $e) {
  echo "Connection Failed :" . $e->getMessage();
}

$msg = "";

if ( isset($_POST['username'])){
  // Sanitizing
  $username = trim($_POST['username']);
  $password = trim($_POST['password']);

  if($username != "" && $password != "" ){
    try {
      $query = "select * from `users` where `username` = :username and `password` = :password";
      $stmt = $db->prepare($query);
      $stmt->bindParam('username', $username, PDO::PARAM_STR);
      $stmt->bindValue('password', $password, PDO::PARAM_STR);
      $stmt->execute();
      $count = $stmt->rowCount();
      $row = $stmt->fetch(PDO::FETCH_ASSOC);

      if ($count == 1 && !empty($row)){
        // We can log in
        $_SESSION['sess_usr_id'] = $row['id'];
        $_SESSION['sess_usr_name'] = $row['username'];

        $msg = json_encode(array('success', 'You are logged in!'));
        echo $msg;
        return;
      } else {
        $msg =  json_encode(array('fail', 'Invalid username or password'));
        echo $msg;
      }



    } catch (PDOException $e) {
      $msg = "PDO Connection Error" . $e;
    }
  }
}

?>