<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$datetime = date("Y-m-d H:i:s");
try {
    $sql = "SELECT 
    t_casting.id,
    code,
    product_date,
    material_type,
    melting_start,
    melting_end,
    melting_gas_start,
    melting_gas_end,
    (melting_gas_end-melting_gas_start),
    casting_start,
    casting_end
FROM
    billet_casting.t_casting
        LEFT JOIN
    m_material_type ON m_material_type.id = t_casting.product_type
    ORDER BY product_date DESC;";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>