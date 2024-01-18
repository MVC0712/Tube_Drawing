<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$drawing_id = $_POST['drawing_id'];
try {
    $sql = "SELECT 
        extrusion.t_using_aging_rack.id,
        extrusion.t_press.press_date_at,
        extrusion.t_using_aging_rack.rack_number,
        extrusion.t_using_aging_rack.work_quantity - IFNULL(
        (SELECT 
            SUM(extrusion.t_press_quality.ng_quantities)
            FROM extrusion.t_press_quality
            WHERE extrusion.t_press_quality.using_aging_rack_id = extrusion.t_using_aging_rack.id 
        ), 0) AS ok_qty
    FROM extrusion.t_using_aging_rack
    LEFT JOIN extrusion.t_press ON extrusion.t_press.id = extrusion.t_using_aging_rack.t_press_id
    WHERE extrusion.t_using_aging_rack.drawing_input_id = '$drawing_id'
    ORDER BY ordinal ASC";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>