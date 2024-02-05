<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}

$ex_production_numbers_id = $_POST['ex_production_numbers_id'];
$production_number = $_POST['production_number'];
$production_length = $_POST['production_length'];
$specific_weight = $_POST['specific_weight'];
$packing_column = $_POST['packing_column'];
$packing_row = $_POST['packing_row'];
// $hardness = $_POST['hardness'];
$b_drawing_l = $_POST['b_drawing_l'];
$b_drawing_out_d = $_POST['b_drawing_out_d'];
$b_drawing_in_d = $_POST['b_drawing_in_d'];
$b_drawing_t = $_POST['b_drawing_t'];
$a_drawing_l = $_POST['a_drawing_l'];
$a_drawing_out_d = $_POST['a_drawing_out_d'];
$a_drawing_in_d = $_POST['a_drawing_in_d'];
$a_drawing_t = $_POST['a_drawing_t'];
$conveyor_height = $_POST['conveyor_height'];
$compress_dim = $_POST['compress_dim'];
$compress_pressure = $_POST['compress_pressure'];
$clamp_pressure = $_POST['clamp_pressure'];
$start_pull_speed = $_POST['start_pull_speed'];
$main_pull_speed = $_POST['main_pull_speed'];
$end_pull_speed = $_POST['end_pull_speed'];
$pusher_speed = $_POST['pusher_speed'];
$puller_force = $_POST['puller_force'];
$straight = $_POST['straight'];
$angle = $_POST['angle'];
$roller_dis = $_POST['roller_dis'];
$roller_speed = $_POST['roller_speed'];
$curvature = $_POST['curvature'];
try {
    $sql = "INSERT INTO m_production_numbers(ex_production_numbers_id, production_number, production_length, specific_weight, packing_column, packing_row, 
    b_drawing_l, b_drawing_out_d, b_drawing_in_d, b_drawing_t, a_drawing_l, a_drawing_out_d, a_drawing_in_d, a_drawing_t, 
    conveyor_height, compress_dim, compress_pressure, clamp_pressure, start_pull_speed, 
    main_pull_speed, end_pull_speed, pusher_speed, puller_force, straight, angle, roller_dis, roller_speed, curvature) VALUES 
    ('$ex_production_numbers_id','$production_number','$production_length','$specific_weight','$packing_column','$packing_row',
    '$b_drawing_l','$b_drawing_out_d','$b_drawing_in_d','$b_drawing_t','$a_drawing_l','$a_drawing_out_d','$a_drawing_in_d','$a_drawing_t',
    '$conveyor_height','$compress_dim','$compress_pressure','$clamp_pressure','$start_pull_speed',
    '$main_pull_speed','$end_pull_speed','$pusher_speed','$puller_force','$straight','$angle','$roller_dis','$roller_speed','$curvature')";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo ($e->errorInfo[2]);
}
?>