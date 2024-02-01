<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
try {
    $sql = "SELECT 
    tube_drawing.m_plugs.id,
    tube_drawing.m_plugs.plug_number,
    extrusion.m_production_numbers.production_number,
    tube_drawing.m_plugs.diameter,
    tube_drawing.m_plugs.note
FROM
    tube_drawing.m_plugs
        LEFT JOIN
    extrusion.m_production_numbers ON extrusion.m_production_numbers.id = tube_drawing.m_plugs.ex_production_numbers_id";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>