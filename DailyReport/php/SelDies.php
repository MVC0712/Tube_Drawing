<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$die_number = "";
$die_number = $_POST['die_number'];
try {
    $sql = "SELECT * FROM m_dies WHERE die_number LIKE '%$die_number%'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo ($e->errorInfo[2]);
}
?>