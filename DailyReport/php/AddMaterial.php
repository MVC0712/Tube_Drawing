<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$t_casting = "";
$material = "";
$material_type = "";
$weight = "";
$note = "";
$import_material_id = "";

$t_casting = $_POST['t_casting'];
$material = $_POST['material'];
$material_type = $_POST['material_type'];
$weight = $_POST['weight'];
$note = $_POST['note'];
$import_material_id = $_POST['import_material_id'];

try {
    $sql = "INSERT INTO t_add_material (t_casting, material, material_type, weight, note, import_material_id
      ) VALUES (
          '$t_casting', '$material', '$material_type', '$weight', '$note',, '$import_material_id'
      )";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode("INSERTED");
} 
catch(PDOException $e) {
    echo $e;
}
?>