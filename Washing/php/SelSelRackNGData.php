<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$using_aging_rack_id = $_POST['using_aging_rack_id'];
try {
    $sql = "SELECT 
    extrusion.t_press_quality.id AS t_press_quality_id,
    extrusion.m_quality_code_check_process.process_name,
    m_quality_code.quality_code,
    extrusion.t_press_quality.ng_quantities
FROM extrusion.t_press_quality
LEFT JOIN extrusion.m_quality_code_check_process ON extrusion.t_press_quality.process_id = m_quality_code_check_process.id
LEFT JOIN extrusion.m_quality_code ON extrusion.t_press_quality.quality_code_id = extrusion.m_quality_code.id
WHERE extrusion.t_press_quality.using_aging_rack_id = '$using_aging_rack_id'
ORDER BY extrusion.t_press_quality.process_id, extrusion.m_quality_code.quality_code, extrusion.t_press_quality.ng_quantities";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>