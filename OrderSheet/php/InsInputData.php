<?php
  require_once('../../connection.php');
  $dbh = new DBHandler();
  if ($dbh->getInstance() === null) {
      die("No database connection");
  }

  $production_quantity = $_POST['production_quantity'];
  $production_numbers_id = $_POST['production_numbers_id'];
  $ordersheet_number = $_POST['ordersheet_number'];
  $issue_date_at = $_POST['issue_date_at'];
  $delivery_date_at = $_POST['delivery_date_at'];
  try {
      $sql = "INSERT INTO m_ordersheet (
                  production_quantity, production_numbers_id, ordersheet_number, issue_date_at, delivery_date_at) 
              VALUES (
                  '$production_quantity','$production_numbers_id','$ordersheet_number','$issue_date_at', '$delivery_date_at')";
      $stmt = $dbh->getInstance()->prepare($sql);
      $stmt->execute();
      echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
  } 
  catch(PDOException $e) {
      echo ($e->errorInfo[2]);
  }
?>