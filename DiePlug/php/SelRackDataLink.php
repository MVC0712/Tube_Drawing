<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$using_aging_rack_id = $_POST['using_aging_rack_id'];
try {
    $sql = "SELECT 
        washing_data_id
    FROM t_rack_data
    WHERE t_rack_data.using_aging_rack_id = '$using_aging_rack_id'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>