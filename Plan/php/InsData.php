<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}

$product_date = $_POST['product_date'];
$product_dim = $_POST['product_dim'];
$product_type = $_POST['product_type'];
$code = $_POST['code'];
$extrusion_scrap = $_POST['extrusion_scrap'];
$casting_scrap = $_POST['casting_scrap'];
$aluminium_ingot = $_POST['aluminium_ingot'];
$aluminium_orther = $_POST['aluminium_orther'];

try {
    $sql = "INSERT INTO t_plan
    (product_date, product_dim, product_type, code, extrusion_scrap, casting_scrap, aluminium_ingot, aluminium_orther) VALUES 
    ('$product_date', '$product_dim', '$product_type', '$code', '$extrusion_scrap', '$casting_scrap', '$aluminium_ingot', '$aluminium_orther')";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>