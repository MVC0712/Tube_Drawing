<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$process_id = $_POST['process_id'];
$using_aging_rack_id = $_POST['using_aging_rack_id'];
$quality_code_id = $_POST['quality_code_id'];
$ng_quantities = $_POST['ng_quantities'];
try {
    $sql = "INSERT INTO extrusion.t_press_quality (
        process_id, using_aging_rack_id, quality_code_id, ng_quantities
          ) VALUES (
        '$process_id', '$using_aging_rack_id', '$quality_code_id', '$ng_quantities')";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo ($e->errorInfo[2]);
}
?>