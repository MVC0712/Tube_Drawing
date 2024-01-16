<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$plug_number = "";
$plug_number = $_POST['plug_number'];
try {
    $sql = "SELECT * FROM m_plugs WHERE plug_number LIKE '%$plug_number%'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo ($e->errorInfo[2]);
}
?>