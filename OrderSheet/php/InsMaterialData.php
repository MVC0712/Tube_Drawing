<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$data = file_get_contents('php://input');
$data_json = json_decode($data); 

$targetId = array_pop($data_json);

try {

    if(count($data_json) > 0){
        foreach($data_json as $val){
          $sql_paramater[] = "('{$targetId}', '{$val[1]}', '{$val[2]}', '{$val[3]}', '{$val[4]}', '{$val[5]}')";
        }
        $sql = "INSERT INTO t_add_material (t_casting, material, material_type, weight, note, import_material_id) VALUES ".join(",", $sql_paramater);
        $stmt = $dbh->getInstance()->prepare($sql);
        $stmt->execute();
      }
      echo json_encode("INSERTED");
} 
catch(PDOException $e) {
  echo ($e->errorInfo[2]);
}
?>