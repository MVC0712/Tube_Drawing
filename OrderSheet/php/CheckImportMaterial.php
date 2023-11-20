<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$material_note = $_POST['material_note'];
try {
    $sql = "SELECT 
    t_import_material.id,
    weight,
    CASE 
        WHEN LEFT(code_name, 6) = 'N11-NG' THEN '1'
        WHEN LEFT(code_name, 6) = 'N11-DI' THEN '2'
        WHEN LEFT(code_name, 6) = 'N14-HE' THEN '3'
        WHEN LEFT(code_name, 6) = 'N14-NG' THEN '4'
        ELSE '5'
    END AS origin,
    CASE 
        WHEN LEFT(code_name, 3) = 'N11' AND LEFT(code_name, 6) = 'N11-NG' THEN CASE 
                                                WHEN material_type_id = 1 THEN '1'
                                                WHEN material_type_id = 2 THEN '2'
                                                WHEN material_type_id = 3 THEN '4'
                                                WHEN material_type_id = 4 THEN '3'
                                                ELSE '5'
                                            END
        WHEN LEFT(code_name, 3) = 'N11' AND LEFT(code_name, 6) = 'N11-DI' THEN CASE 
                                                WHEN material_type_id = 1 THEN '5'
                                                WHEN material_type_id = 2 THEN '6'
                                                WHEN material_type_id = 3 THEN '8'
                                                WHEN material_type_id = 4 THEN '7'
                                                ELSE '5'
                                            END
        WHEN LEFT(code_name, 3) = 'N14' THEN CASE 
                                                WHEN material_type_id = 1 THEN '13'
                                                WHEN material_type_id = 2 THEN '14'
                                                WHEN material_type_id = 3 THEN '16'
                                                WHEN material_type_id = 4 THEN '15'
                                                ELSE '5'
                                            END
        ELSE                                CASE
                                                WHEN material_type_id = 1 THEN '17'
                                                WHEN material_type_id = 2 THEN '18'
                                                WHEN material_type_id = 3 THEN '20'
                                                WHEN material_type_id = 4 THEN '19'
                                                ELSE '5'
                                            END
    END AS material_type_cast,
    code_name
    FROM
        t_import_material
        WHERE '$material_note' NOT IN (SELECT 
                    note
                FROM
                    t_add_material)
        AND t_import_material.code_name = '$material_note'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo ($e->errorInfo[2]);
}
?>