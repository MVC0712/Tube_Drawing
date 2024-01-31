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
  $note = $_POST['note'];
  $created_at = $_POST['created_at'];
  $targetId = $_POST['targetId'];
  try {
      $sql = "UPDATE m_ordersheet SET
      updated_at = '$created_at',
      delivery_date_at = '$delivery_date_at',
      note = '$note',
      issue_date_at = '$issue_date_at',
      ordersheet_number = '$ordersheet_number',
      production_numbers_id = '$production_numbers_id',
      production_quantity = '$production_quantity'
    WHERE id = '$targetId'";
      $stmt = $dbh->getInstance()->prepare($sql);
      $stmt->execute();
      echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
  } 
  catch(PDOException $e) {
      echo ($e->errorInfo[2]);
  }
?>