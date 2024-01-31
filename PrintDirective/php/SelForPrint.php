<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$id = "";
$id = $_POST['id'];
try {
    $sql = "SELECT 
    product_date,
    m_dimention.dimention,
    m_material_type.material_type,
    t_plan.code,
    extrusion_scrap,
    casting_scrap,
    aluminium_ingot,
    aluminium_orther,
    si,
    mg,
    mn,
    cr,
    cu,
    fe,
    zn,
    ti_b
FROM
    t_plan
        LEFT JOIN
    m_material_element ON t_plan.product_type = m_material_element.material_type
        LEFT JOIN
    m_material_type ON m_material_type.id = t_plan.product_type
        LEFT JOIN
    m_dimention ON m_dimention.id = t_plan.product_dim
WHERE t_plan.id = '$id'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>

