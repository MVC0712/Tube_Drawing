<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
try {
    $sql = "SELECT 
    tube_drawing.m_production_numbers.id,
    tube_drawing.m_production_numbers.production_number AS pnbt,
    extrusion.m_production_numbers.production_number AS pnbe,
    tube_drawing.m_production_numbers.production_length,
    tube_drawing.m_production_numbers.packing_column,
    tube_drawing.m_production_numbers.packing_row,
    tube_drawing.m_production_numbers.hardness,
    tube_drawing.m_production_numbers.start_pull_speed,
    tube_drawing.m_production_numbers.main_pull_speed,
    tube_drawing.m_production_numbers.end_pull_speed,
    tube_drawing.m_production_numbers.pusher_speed
FROM
    tube_drawing.m_production_numbers
        LEFT JOIN
    extrusion.m_production_numbers ON extrusion.m_production_numbers.id = tube_drawing.m_production_numbers.ex_production_numbers_id";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>