<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}

$id = $_POST['targetId'];
$plug_number = $_POST['plug_number'];
$ex_production_numbers_id = $_POST['ex_production_numbers_id'];
$diameter = $_POST['diameter'];
$note = $_POST['note'];
try {
    $sql = "UPDATE m_plugs SET 
    plug_number = '$plug_number',
    ex_production_numbers_id = '$ex_production_numbers_id',
    diameter = '$diameter',
    note = '$note'
    WHERE id= '$id'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo ($e->errorInfo[2]);
}
?>