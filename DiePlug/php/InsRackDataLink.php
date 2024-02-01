<?php
  require_once('../../connection.php');
  $dbh = new DBHandler();
  if ($dbh->getInstance() === null) {
      die("No database connection");
  }
  $data = file_get_contents('php://input');
  $data_json = json_decode($data); 
  $using_aging_rack_id = array_pop($data_json);

  try {
    if(count($data_json) > 0){
      foreach($data_json as $val){
        $sql = "INSERT INTO t_rack_data (
        using_aging_rack_id, washing_data_id) 
      VALUES (
        '$using_aging_rack_id','{$val[0]}')";
        $stmt = $dbh->getInstance()->prepare($sql);
        $stmt->execute();
      }
    }
    echo json_encode("INSERTED");
  } 
  catch(PDOException $e) {
  echo ($e->errorInfo[2]);
  }
?>