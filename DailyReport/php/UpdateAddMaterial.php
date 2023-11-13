<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$id = $_POST['id'];
$material = $_POST['material'];
$material_type = $_POST['material_type'];
$material_weight = $_POST['material_weight'];
$material_note = $_POST['material_note'];

$datetime = date("Y-m-d H:i:s");
try {
    $sql = "UPDATE t_add_material SET 
    material = '$material' ,
    material_type = '$material_type' ,
    weight = '$material_weight',
    note = '$material_note'
    WHERE id= '$id'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>