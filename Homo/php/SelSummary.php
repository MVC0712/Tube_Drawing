<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$datetime = date("Y-m-d H:i:s");
try {
    $sql = "SELECT 
    id,
    code,
    DATE_FORMAT(homo_start, '%Y-%m-%d %H:%i') AS homo_start,
    DATE_FORMAT(homo_end, '%Y-%m-%d %H:%i') AS homo_end,
    gas_start,
    gas_end,
    gas_end - gas_start AS gas_use

    FROM
    t_homo
    ORDER BY homo_end DESC;";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>