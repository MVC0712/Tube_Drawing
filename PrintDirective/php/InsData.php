<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}

$die_number_id = $_POST['die_number_id'];
$drawing_type_id = $_POST['drawing_type_id'];
$plug_number_id = $_POST['plug_number_id'];
$product_date = $_POST['product_date'];
$production_number_id = $_POST['production_number_id'];
$staff_id = $_POST['staff_id'];

try {
    $sql = "INSERT INTO t_directive
    (die_number_id, drawing_type_id, plug_number_id, product_date, production_number_id, staff_id) VALUES 
    ('$die_number_id', '$drawing_type_id', '$plug_number_id', '$product_date', '$production_number_id', '$staff_id')";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>