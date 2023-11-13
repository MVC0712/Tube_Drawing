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
    air_pressure,
    al_temp_cast,
    al_temp_gate,
    aluminium_ingot,
    aluminium_orther,
    break_time,
    casting_end,
    casting_scrap,
    casting_start,
    code,
    extrusion_scrap,
    file_url,
    flux_1,
    flux_2,
    hydro_time_1,
    hydro_time_2,
    hydro_time_3,
    hydro_time_4,
    hydro_value_1,
    hydro_value_2,
    hydro_value_3,
    hydro_value_4,
    input_cr_1,
    input_cr_2,
    input_cu_1,
    input_cu_2,
    input_fe_1,
    input_fe_2,
    input_mg_1,
    input_mg_2,
    input_mn_1,
    input_mn_2,
    input_si_1,
    input_si_2,
    input_ti_b_1,
    input_ti_b_2,
    input_zn_1,
    input_zn_2,
    me_cr_1,
    me_cr_2,
    me_cr_3,
    me_cu_1,
    me_cu_2,
    me_cu_3,
    me_fe_1,
    me_fe_2,
    me_fe_3,
    me_mg_1,
    me_mg_2,
    me_mg_3,
    me_mn_1,
    me_mn_2,
    me_mn_3,
    me_si_1,
    me_si_2,
    me_si_3,
    me_ti_b_1,
    me_ti_b_2,
    me_ti_b_3,
    me_zn_1,
    me_zn_2,
    me_zn_3,
    melting_end,
    melting_gas_end,
    melting_gas_start,
    melting_start,
    melting_temp,
    product_date,
    product_dim,
    product_type,
    refined_time_1,
    refined_time_2,
    water_temp,
    casting_speed,
    oil_preasure,
    staff_id
FROM
    t_casting
WHERE id = '$targetId'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>