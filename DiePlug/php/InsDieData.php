<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}

$die_number = $_POST['die_number'];
$ex_production_numbers_id = $_POST['ex_production_numbers_id'];
$diameter = $_POST['diameter'];
$note = $_POST['note'];
try {
    $sql = "INSERT INTO m_dies (die_number, ex_production_numbers_id, diameter, note) VALUES 
        ('$die_number','$ex_production_numbers_id','$diameter','$note')";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo ($e->errorInfo[2]);
}
?>