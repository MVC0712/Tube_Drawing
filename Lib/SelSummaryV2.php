<?php
require_once('../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$start = $_POST['start'];
$end = $_POST['end'];
$material = $_POST['material'];

if ($material == 0) {
    $add = "";
} else {
    $add = " AND m_material_type.id LIKE '$material'";
};

try {
    $sql = "SELECT 
    t_casting.code,
    DATE_FORMAT(t_casting.product_date, '%y-%m-%d') AS product_date,
    TIME_FORMAT(t_casting.melting_start, '%H:%i') AS melting_start,
    TIME_FORMAT(t_casting.casting_end, '%H:%i') AS casting_end,
    m_material_type.material_type,
    SUM(input_cr_1 + input_cr_2 + input_cu_1 + input_cu_2 + input_fe_1 + input_fe_2 + 
      input_mg_1 + input_mg_2 + input_mn_1 + input_mn_2 + input_si_1 + input_si_2 + 
      input_ti_b_1 + input_ti_b_2 + input_zn_1 + input_zn_2 + IFNULL(t10.weight, 0)) AS total_input,
    t10000.tt_ppig,
    t10.weight - t10000.tt_ppig,
    ROUND(SUM(input_cr_1 + input_cr_2 + input_cu_1 + input_cu_2 + input_fe_1 + input_fe_2 + input_mg_1 + input_mg_2 + input_mn_1 + input_mn_2 + input_si_1 + input_si_2 + input_ti_b_1 + input_ti_b_2 + input_zn_1 + input_zn_2 + IFNULL(t100000.tt_pphk, 0)), 1) AS total_input_hk,
    ROUND(SUM(input_cr_1 + input_cr_2),1) AS input_cr,
    ROUND(SUM(input_cu_1 + input_cu_2),1) AS input_cu,
    ROUND(SUM(input_fe_1 + input_fe_2),1) AS input_fe,
    ROUND(SUM(input_mg_1 + input_mg_2),1) AS input_mg,
    ROUND(SUM(input_mn_1 + input_mn_2),1) AS input_mn,
    ROUND(SUM(input_si_1 + input_si_2),1) AS input_si,
    ROUND(SUM(input_ti_b_1 + input_ti_b_1),1) AS input_ti,
    ROUND(SUM(input_zn_1 + input_zn_2),1) AS input_zn,
    ROUND(tc.total_output,1) AS total_output,
    tc.tt1200*132 + tc.tt600*66 AS total_ok,
    tt1200, tt600, 
    CONCAT(ROUND(((tc.tt1200*132 + tc.tt600*66)/tc.total_output)*100,1), '%') AS OkOutPut,
    CONCAT(ROUND(((tc.tt1200*132 + tc.tt600*66)/SUM(input_cr_1 + input_cr_2 + input_cu_1 + input_cu_2 + input_fe_1 + input_fe_2 + 
      input_mg_1 + input_mg_2 + input_mn_1 + input_mn_2 + input_si_1 + input_si_2 + 
      input_ti_b_1 + input_ti_b_2 + input_zn_1 + input_zn_2 + IFNULL(t10.weight, 0)))*100,1),'%') AS OkTotal,
      (melting_gas_end-melting_gas_start)
FROM
    t_casting
        LEFT JOIN (
        	SELECT t_cutting.casting_id AS tcid,
            SUM(A2L + A3L + B1L + B2L + B3L + B4L + C1L + C2L + C3L + C4L + D2L + D3L)/1000*111 AS total_output,
            SUM(A2Q12 + A3Q12 + B1Q12 + B2Q12 + B3Q12 + B4Q12 + C1Q12 + C2Q12 + C3Q12 + C4Q12 + D2Q12 + D3Q12) AS tt1200,
            SUM(A2Q6 + A3Q6 + B1Q6 + B2Q6 + B3Q6 + B4Q6 + C1Q6 + C2Q6 + C3Q6 + C4Q6 + D2Q6 + D3Q6) AS tt600,
            CASE WHEN A2S = 3 THEN SUM(A2Q6 + A2Q12) ELSE 0 END AS a2ttt,
            CASE WHEN A3S = 3 THEN SUM(A3Q6 + A3Q12) ELSE 0 END AS a3ttt,
            CASE WHEN B1S = 3 THEN SUM(B1Q6 + B1Q12) ELSE 0 END AS b1ttt,
            CASE WHEN B2S = 3 THEN SUM(B2Q6 + B2Q12) ELSE 0 END AS b2ttt,
            CASE WHEN B3S = 3 THEN SUM(B3Q6 + B3Q12) ELSE 0 END AS b3ttt,
            CASE WHEN B4S = 3 THEN SUM(B4Q6 + B4Q12) ELSE 0 END AS b4ttt,
            CASE WHEN C1S = 3 THEN SUM(C1Q6 + C1Q12) ELSE 0 END AS c1ttt,
            CASE WHEN C2S = 3 THEN SUM(C2Q6 + C2Q12) ELSE 0 END AS c2ttt,
            CASE WHEN C3S = 3 THEN SUM(C3Q6 + C3Q12) ELSE 0 END AS c3ttt,
            CASE WHEN C4S = 3 THEN SUM(C4Q6 + C4Q12) ELSE 0 END AS c4ttt,
            CASE WHEN D2S = 3 THEN SUM(D2Q6 + D2Q12) ELSE 0 END AS d2ttt,
            CASE WHEN D3S = 3 THEN SUM(D3Q6 + D3Q12) ELSE 0 END AS d3ttt
            FROM t_cutting 
            GROUP BY  tcid            
        ) tc ON tc.tcid = t_casting.id
        LEFT JOIN
    (SELECT 
        t_add_material.t_casting AS cid, SUM(weight) weight
    FROM
        t_add_material
    GROUP BY t_add_material.t_casting) t10 ON t_casting.id = t10.cid
LEFT JOIN
    (SELECT 
    t_add_material.t_casting AS ppd_id,
    t_casting.code,
    SUM(weight) AS tt_ppd
FROM
    billet_casting.t_add_material
        LEFT JOIN
    t_casting ON t_casting.id = t_add_material.t_casting
        LEFT JOIN
    m_material_name_type ON m_material_name_type.id = t_add_material.material_type
        LEFT JOIN
    m_material_name ON m_material_name_type.material_name_id = m_material_name.id
WHERE
    m_material_name.id = 1
        OR m_material_name.id = 2
GROUP BY t_add_material.t_casting) t100 ON t_casting.id = t100.ppd_id
LEFT JOIN
    (SELECT 
    t_add_material.t_casting AS ppdd_id,
    t_casting.code,
    SUM(weight) AS tt_ppdd
FROM
    billet_casting.t_add_material
        LEFT JOIN
    t_casting ON t_casting.id = t_add_material.t_casting
        LEFT JOIN
    m_material_name_type ON m_material_name_type.id = t_add_material.material_type
        LEFT JOIN
    m_material_name ON m_material_name_type.material_name_id = m_material_name.id
WHERE
    m_material_name.id = 3
        OR m_material_name.id = 4
GROUP BY t_add_material.t_casting) t1000 ON t_casting.id = t1000.ppdd_id
LEFT JOIN
    (SELECT 
    t_add_material.t_casting AS ppig_id,
    t_casting.code,
    SUM(weight) AS tt_ppig
FROM
    billet_casting.t_add_material
        LEFT JOIN
    t_casting ON t_casting.id = t_add_material.t_casting
        LEFT JOIN
    m_material_name_type ON m_material_name_type.id = t_add_material.material_type
        LEFT JOIN
    m_material_name ON m_material_name_type.material_name_id = m_material_name.id
WHERE
    m_material_name.id = 6
GROUP BY t_add_material.t_casting) t10000 ON t_casting.id = t10000.ppig_id
LEFT JOIN
    (SELECT 
    t_add_material.t_casting AS ppig_id,
    t_casting.code,
    SUM(weight) AS tt_pphk
FROM
    billet_casting.t_add_material
        LEFT JOIN
    t_casting ON t_casting.id = t_add_material.t_casting
        LEFT JOIN
    m_material_name_type ON m_material_name_type.id = t_add_material.material_type
        LEFT JOIN
    m_material_name ON m_material_name_type.material_name_id = m_material_name.id
WHERE
	m_material_name.id = 7
GROUP BY t_add_material.t_casting) t100000 ON t_casting.id = t100000.ppig_id
LEFT JOIN
    m_material_type ON m_material_type.id = t_casting.product_type
WHERE t_casting.product_date BETWEEN '$start' AND '$end' $add
GROUP BY t_casting.id
ORDER BY t_casting.product_date DESC;";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>