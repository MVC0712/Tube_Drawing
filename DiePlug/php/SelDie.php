<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
try {
    $sql = "SELECT 
    tube_drawing.m_dies.id,
    tube_drawing.m_dies.die_number,
    extrusion.m_production_numbers.production_number,
    tube_drawing.m_dies.diameter,
    tube_drawing.m_dies.note
FROM
    tube_drawing.m_dies
        LEFT JOIN
    extrusion.m_production_numbers ON extrusion.m_production_numbers.id = tube_drawing.m_dies.ex_production_numbers_id";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>