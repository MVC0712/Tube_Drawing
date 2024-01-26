<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}

$washing_id = $_POST['washing_id'];
$staff_id = $_POST['staff_id'];
$start_time = $_POST['start_time'];
$end_time = $_POST['end_time'];
try {
    $sql = "INSERT INTO t_washing_case (
                washing_id, staff_id, start_time, end_time) 
            VALUES (
                '$washing_id', '$staff_id','$start_time','$end_time')";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();

    $stmt = $dbh->getInstance()->prepare("SELECT MAX(t_washing_case.id) AS id FROM t_washing_case");
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo ($e->errorInfo[2]);
}
?>