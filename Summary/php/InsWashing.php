<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}

$product_date = $_POST['product_date'];
$chemical_concentration = $_POST['chemical_concentration'];
$soaking_time = $_POST['soaking_time'];
$soaking_temperature = $_POST['soaking_temperature'];
$drying_temperature = $_POST['drying_temperature'];
try {
    $sql = "INSERT INTO t_washing (
                product_date, chemical_concentration, soaking_time, soaking_temperature, drying_temperature) 
            VALUES (
                '$product_date','$chemical_concentration','$soaking_time','$soaking_temperature','$drying_temperature')";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo ($e->errorInfo[2]);
}
?>