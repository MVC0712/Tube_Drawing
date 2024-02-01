<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$id = $_POST['id'];
try {
    $sql = "SELECT 
        extrusion.t_using_aging_rack.id,
        ROW_NUMBER() OVER (  ORDER BY id  ) AS Seid,
        extrusion.t_using_aging_rack.rack_number,
        extrusion.t_using_aging_rack.work_quantity
    FROM extrusion.t_using_aging_rack
    WHERE extrusion.t_using_aging_rack.washing_output_id = '$id'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>