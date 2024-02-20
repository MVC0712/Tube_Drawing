<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$id = $_POST['id'];
$quality_code_id = $_POST['quality_code_id'];
$ng_quantities = $_POST['ng_quantities'];
try {
    $sql = "UPDATE extrusion.t_press_quality
    SET 
      quality_code_id = '$quality_code_id',
      ng_quantities = '$ng_quantities'
    WHERE id = '$id'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo ($e->errorInfo[2]);
}
?>