<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}

$air_pressure = $_POST['air_pressure'];
$al_temp_cast = $_POST['al_temp_cast'];
$al_temp_gate = $_POST['al_temp_gate'];
$aluminium_ingot = $_POST['aluminium_ingot'];
$aluminium_orther = $_POST['aluminium_orther'];
$break_time = $_POST['break_time'];
$casting_end = $_POST['casting_end'];
$casting_scrap = $_POST['casting_scrap'];
$casting_start = $_POST['casting_start'];
$code = $_POST['code'];
$extrusion_scrap = $_POST['extrusion_scrap'];
$file_url = $_POST['file_url'];
$flux_1 = $_POST['flux_1'];
$flux_2 = $_POST['flux_2'];
$hydro_time_1 = $_POST['hydro_time_1'];
$hydro_time_2 = $_POST['hydro_time_2'];
if ($_POST['hydro_time_3'] != "") {
    $hydro_time_3 = $_POST['hydro_time_3'];
} else {
    $hydro_time_3 = null;
}
// $hydro_time_3 = $_POST['hydro_time_3'];
if ($_POST['hydro_time_4'] != "") {
    $hydro_time_4 = $_POST['hydro_time_4'];
} else {
    $hydro_time_4 = null;
}
// $hydro_time_4 = $_POST['hydro_time_4'];
$hydro_value_1 = $_POST['hydro_value_1'];
$hydro_value_2 = $_POST['hydro_value_2'];
$hydro_value_3 = $_POST['hydro_value_3'];
$hydro_value_4 = $_POST['hydro_value_4'];
$input_cr_1 = $_POST['input_cr_1'];
$input_cr_2 = $_POST['input_cr_2'];
$input_cu_1 = $_POST['input_cu_1'];
$input_cu_2 = $_POST['input_cu_2'];
$input_fe_1 = $_POST['input_fe_1'];
$input_fe_2 = $_POST['input_fe_2'];
$input_mg_1 = $_POST['input_mg_1'];
$input_mg_2 = $_POST['input_mg_2'];
$input_mn_1 = $_POST['input_mn_1'];
$input_mn_2 = $_POST['input_mn_2'];
$input_si_1 = $_POST['input_si_1'];
$input_si_2 = $_POST['input_si_2'];
$input_ti_b_1 = $_POST['input_ti_b_1'];
$input_ti_b_2 = $_POST['input_ti_b_2'];
$input_zn_1 = $_POST['input_zn_1'];
$input_zn_2 = $_POST['input_zn_2'];
$me_cr_1 = $_POST['me_cr_1'];
$me_cr_2 = $_POST['me_cr_2'];
$me_cr_3 = $_POST['me_cr_3'];
$me_cu_1 = $_POST['me_cu_1'];
$me_cu_2 = $_POST['me_cu_2'];
$me_cu_3 = $_POST['me_cu_3'];
$me_fe_1 = $_POST['me_fe_1'];
$me_fe_2 = $_POST['me_fe_2'];
$me_fe_3 = $_POST['me_fe_3'];
$me_mg_1 = $_POST['me_mg_1'];
$me_mg_2 = $_POST['me_mg_2'];
$me_mg_3 = $_POST['me_mg_3'];
$me_mn_1 = $_POST['me_mn_1'];
$me_mn_2 = $_POST['me_mn_2'];
$me_mn_3 = $_POST['me_mn_3'];
$me_si_1 = $_POST['me_si_1'];
$me_si_2 = $_POST['me_si_2'];
$me_si_3 = $_POST['me_si_3'];
$me_ti_b_1 = $_POST['me_ti_b_1'];
$me_ti_b_2 = $_POST['me_ti_b_2'];
$me_ti_b_3 = $_POST['me_ti_b_3'];
$me_zn_1 = $_POST['me_zn_1'];
$me_zn_2 = $_POST['me_zn_2'];
$me_zn_3 = $_POST['me_zn_3'];
$melting_end = $_POST['melting_end'];
$melting_gas_end = $_POST['melting_gas_end'];
$melting_gas_start = $_POST['melting_gas_start'];
$melting_start = $_POST['melting_start'];
$melting_temp = $_POST['melting_temp'];
$product_date = $_POST['product_date'];
$product_dim = $_POST['product_dim'];
$product_type = $_POST['product_type'];
$refined_time_1 = $_POST['refined_time_1'];
$refined_time_2 = $_POST['refined_time_2'];
$water_temp = $_POST['water_temp'];
$casting_speed = $_POST['casting_speed'];
$oil_preasure = $_POST['oil_preasure'];
$staff_id = $_POST['staff_id'];
$datetime = date("Y-m-d H:i:s");
try {
    $sql = "INSERT INTO t_casting
    (air_pressure, al_temp_cast, al_temp_gate, aluminium_ingot, aluminium_orther,
    break_time, casting_end, casting_scrap, casting_start, code, extrusion_scrap,
    file_url, flux_1, flux_2, hydro_time_1, hydro_time_2, hydro_time_3, hydro_time_4,
    hydro_value_1, hydro_value_2, hydro_value_3, hydro_value_4, input_cr_1, input_cr_2,
    input_cu_1, input_cu_2, input_fe_1, input_fe_2, input_mg_1, input_mg_2, input_mn_1,
    input_mn_2, input_si_1, input_si_2, input_ti_b_1, input_ti_b_2, input_zn_1, input_zn_2,
    me_cr_1, me_cr_2, me_cr_3, me_cu_1, me_cu_2, me_cu_3, me_fe_1, me_fe_2, me_fe_3,
    me_mg_1, me_mg_2, me_mg_3, me_mn_1, me_mn_2, me_mn_3, me_si_1, me_si_2, me_si_3,
    me_ti_b_1, me_ti_b_2, me_ti_b_3, me_zn_1, me_zn_2, me_zn_3, melting_end,
    melting_gas_end, melting_gas_start, melting_start, melting_temp, product_date, product_dim,
    product_type, refined_time_1, refined_time_2, water_temp, oil_preasure, casting_speed, staff_id) VALUES 
    ('$air_pressure', '$al_temp_cast', '$al_temp_gate', '$aluminium_ingot', '$aluminium_orther',
    '$break_time', '$casting_end', '$casting_scrap', '$casting_start', '$code', '$extrusion_scrap',
    '$file_url', '$flux_1', '$flux_2', '$hydro_time_1', '$hydro_time_2', '$hydro_time_3', '$hydro_time_4',
    '$hydro_value_1', '$hydro_value_2', '$hydro_value_3', '$hydro_value_4', '$input_cr_1', '$input_cr_2',
    '$input_cu_1', '$input_cu_2', '$input_fe_1', '$input_fe_2', '$input_mg_1', '$input_mg_2', '$input_mn_1',
    '$input_mn_2', '$input_si_1', '$input_si_2', '$input_ti_b_1', '$input_ti_b_2', '$input_zn_1', '$input_zn_2',
    '$me_cr_1', '$me_cr_2', '$me_cr_3', '$me_cu_1', '$me_cu_2', '$me_cu_3', '$me_fe_1', '$me_fe_2', '$me_fe_3',
    '$me_mg_1', '$me_mg_2', '$me_mg_3', '$me_mn_1', '$me_mn_2', '$me_mn_3', '$me_si_1', '$me_si_2', '$me_si_3',
    '$me_ti_b_1', '$me_ti_b_2', '$me_ti_b_3', '$me_zn_1', '$me_zn_2', '$me_zn_3', '$melting_end',
    '$melting_gas_end', '$melting_gas_start', '$melting_start', '$melting_temp', '$product_date', '$product_dim',
    '$product_type', '$refined_time_1', '$refined_time_2', '$water_temp', '$oil_preasure', '$casting_speed', '$staff_id')";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();


    $stmt = $dbh->getInstance()->prepare("SELECT MAX(t_casting.id) AS id FROM t_casting");
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo ($e->errorInfo[2]);
}
?>