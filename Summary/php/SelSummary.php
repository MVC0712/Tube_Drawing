<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
try {
    $sql = "SELECT 
    extrusion.t_press.id,
    DATE_FORMAT(extrusion.t_press.press_date_at, '%m-%d') AS prd_d,
    extrusion.m_dies.die_number,
    extrusion.m_pressing_type.pressing_type,
    extrusion.t_press.plan_billet_quantities,
    extrusion.t_press.actual_billet_quantities,
    t20.work_quantity,
    t10.total_ng,
    t20.work_quantity - t10.total_ng AS total_ok,
    CONCAT(ROUND((t20.work_quantity - t10.total_ng) / t20.work_quantity * 100,
                    1),
            '%') AS per,
    DATE_FORMAT(extrusion.t_press.dimension_check_date,
            '%m-%d'),
    CASE
        WHEN
            (extrusion.t_press_sub.etching_check_staff IS NOT NULL
                AND extrusion.t_press_sub.etching_finish = 1)
                OR (extrusion.t_press_sub.etching_check_staff IS NOT NULL
                AND extrusion.t_press_sub.etching_finish = 2)
        THEN
            DATE_FORMAT(extrusion.t_press.etching_check_date,
                    '%m-%d')
        WHEN
            (extrusion.t_press_sub.etching_check_staff IS NULL
                OR extrusion.t_press_sub.etching_finish = 0)
        THEN
            ''
    END AS ett,
    DATE_FORMAT(extrusion.t_press.aging_check_date,
            '%m-%d'),
    DATE_FORMAT(extrusion.t_press.packing_check_date,
            '%m-%d'),
    t10.code_301,
    t10.code_302,
    t10.code_303,
    t10.code_304,
    t10.code_305,
    t10.code_306,
    t10.code_307,
    t10.code_308,
    t10.code_309,
    t10.code_310,
    t10.code_311,
    t10.code_312,
    t10.code_313,
    t10.code_314,
    t10.code_315,
    t10.code_316,
    t10.code_317,
    t10.code_318,
    t10.code_319,
    t10.code_320,
    t10.code_321,
    t10.code_322,
    t10.code_323,
    t10.code_324,
    t10.code_351,
    extrusion.t_press.special_note
FROM
    extrusion.t_press
        LEFT JOIN
    extrusion.m_pressing_type ON extrusion.t_press.pressing_type_id = extrusion.m_pressing_type.id
        LEFT JOIN
    extrusion.m_dies ON extrusion.t_press.dies_id = extrusion.m_dies.id
        LEFT JOIN
    extrusion.t_press_sub ON extrusion.t_press.id = extrusion.t_press_sub.press_id
        LEFT JOIN
    (SELECT 
        extrusion.t_using_aging_rack.t_press_id AS t_press_id,
            SUM(extrusion.t_press_quality.ng_quantities) AS total_ng,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 301 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_301,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 302 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_302,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 303 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_303,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 304 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_304,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 305 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_305,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 306 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_306,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 307 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_307,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 308 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_308,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 309 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_309,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 310 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_310,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 311 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_311,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 312 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_312,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 313 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_313,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 314 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_314,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 315 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_315,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 316 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_316,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 317 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_317,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 318 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_318,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 319 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_319,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 320 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_320,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 321 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_321,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 322 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_322,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 323 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_323,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 324 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_324,
            SUM(CASE
                WHEN extrusion.m_quality_code.quality_code = 351 THEN extrusion.t_press_quality.ng_quantities
                ELSE 0
            END) AS code_351
    FROM
        extrusion.t_using_aging_rack
    LEFT JOIN extrusion.t_press_quality ON extrusion.t_press_quality.using_aging_rack_id = extrusion.t_using_aging_rack.id
    LEFT JOIN extrusion.m_quality_code ON extrusion.t_press_quality.quality_code_id = extrusion.m_quality_code.id
    GROUP BY extrusion.t_using_aging_rack.t_press_id) t10 ON t10.t_press_id = extrusion.t_press.id
        LEFT JOIN
    (SELECT 
        extrusion.t_using_aging_rack.t_press_id,
            SUM(extrusion.t_using_aging_rack.work_quantity) AS work_quantity
    FROM
        extrusion.t_using_aging_rack
    GROUP BY extrusion.t_using_aging_rack.t_press_id) t20 ON t20.t_press_id = extrusion.t_press.id
GROUP BY extrusion.t_press.id
ORDER BY extrusion.t_press.press_date_at DESC , extrusion.t_press.press_start_at DESC
LIMIT 400";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo ($e->errorInfo[2]);
}
?>