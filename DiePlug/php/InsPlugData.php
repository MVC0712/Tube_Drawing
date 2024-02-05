<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}

$plug_number = $_POST['plug_number'];
$ex_production_numbers_id = $_POST['ex_production_numbers_id'];
$diameter = $_POST['diameter'];
$note = $_POST['note'];
try {
    $sql = "INSERT INTO m_plugs (plug_number, ex_production_numbers_id, diameter, note) VALUES 
        ('$plug_number','$ex_production_numbers_id','$diameter','$note')";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo ($e->errorInfo[2]);
}
?>