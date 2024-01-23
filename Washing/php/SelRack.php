<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$press_id = $_POST['press_id'];
try {
    $sql = "SELECT 
        extrusion.t_using_aging_rack.id,
        extrusion.t_using_aging_rack.rack_number,
        extrusion.t_using_aging_rack.work_quantity - IFNULL(
        (SELECT 
            SUM(extrusion.t_press_quality.ng_quantities)
            FROM extrusion.t_press_quality
            WHERE extrusion.t_press_quality.using_aging_rack_id = extrusion.t_using_aging_rack.id 
        ), 0) AS ok_qty
    FROM extrusion.t_using_aging_rack
    WHERE extrusion.t_using_aging_rack.t_press_id = '$press_id' 
    AND (extrusion.t_using_aging_rack.drawing_input_id IS NULL 
        OR extrusion.t_using_aging_rack.drawing_input_id = 0) 
    ORDER BY extrusion.t_using_aging_rack.order_number";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>