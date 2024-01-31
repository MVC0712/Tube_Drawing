<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$datetime = date("Y-m-d H:i:s");
try {
    $sql = "SELECT 
    t_directive.id,
    product_date,
    production_number,
    drawing_type,
    die_number,
    plug_number
FROM
    t_directive
        LEFT JOIN
    m_production_numbers ON m_production_numbers.id = t_directive.production_number_id
        LEFT JOIN
    m_dies ON m_dies.id = t_directive.die_number_id
        LEFT JOIN
    m_plugs ON m_plugs.id = t_directive.plug_number_id
        LEFT JOIN
    m_drawing_type ON m_drawing_type.id = t_directive.drawing_type_id;";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>