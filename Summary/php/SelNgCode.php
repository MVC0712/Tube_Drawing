<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$ng_code = $_POST['ng_code'];
try {
    $sql = "SELECT 
    extrusion.m_quality_code.id,
    extrusion.m_quality_code.quality_code,
    extrusion.m_quality_code.description_vn
  FROM 
    extrusion.m_quality_code
  WHERE
    extrusion.m_quality_code.quality_code LIKE '$ng_code'
  ORDER BY extrusion.m_quality_code.quality_code";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>