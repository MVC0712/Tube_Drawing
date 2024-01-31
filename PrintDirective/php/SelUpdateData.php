<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$targetId = "";
$targetId = $_POST['targetId'];
try {
    $sql = "SELECT 
    CONCAT(production_number_id,
            '-',
            ex_production_numbers_id) AS production_number_id,
    die_number_id,
    plug_number_id,
    product_date,
    staff_id
    FROM t_directive
    LEFT JOIN
    tube_drawing.m_production_numbers ON tube_drawing.m_production_numbers.id = tube_drawing.t_directive.production_number_id
WHERE t_directive.id = '$targetId'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>