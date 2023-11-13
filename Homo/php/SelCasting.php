<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$datetime = date("Y-m-d H:i:s");
try {
    $sql = "SELECT 
    c.id,
    c.code,
    material_type,
    c.product_date,
    CASE
        WHEN
            (NOT EXISTS( SELECT 
                    NULL
                FROM
                    t_homo a
                WHERE
                    c.id IN (a.lv11_code , a.lv12_code,
                        a.lv13_code,
                        a.lv14_code,
                        a.lv15_code,
                        a.lv16_code,
                        a.lv17_code,
                        a.lv18_code,
                        a.lv21_code,
                        a.lv22_code,
                        a.lv23_code,
                        a.lv24_code,
                        a.lv25_code,
                        a.lv26_code,
                        a.lv27_code,
                        a.lv28_code,
                        a.lv31_code,
                        a.lv32_code,
                        a.lv33_code,
                        a.lv34_code,
                        a.lv35_code,
                        a.lv36_code,
                        a.lv37_code,
                        a.lv38_code,
                        a.lv41_code,
                        a.lv42_code,
                        a.lv43_code,
                        a.lv44_code,
                        a.lv45_code,
                        a.lv46_code,
                        a.lv47_code,
                        a.lv48_code)))
        THEN
            'Chưa ủ'
        ELSE 'Đã ủ'
    END AS cf
FROM
    t_casting c
        LEFT JOIN
    m_material_type ON m_material_type.id = c.product_type
ORDER BY product_date DESC;";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>