<?php
  require_once('../../connection.php');
  $dbh = new DBHandler();
  if ($dbh->getInstance() === null) {
      die("No database connection");
  }
  $data = file_get_contents('php://input');
  $data_json = json_decode($data); 
  $washing_case_id = array_pop($data_json);

  try {
    if(count($data_json) > 0){
      foreach($data_json as $val){
        $sql = "INSERT INTO t_washing_data (
        washing_case_id, drawing_id, start_tube, end_tube, quantity, order_number) 
      VALUES (
        '$washing_case_id','{$val[0]}','{$val[3]}','{$val[4]}','{$val[5]}','{$val[6]}')";
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