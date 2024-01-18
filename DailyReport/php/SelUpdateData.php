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
    CONCAT(production_number_id,
            '-',
            ex_production_numbers_id) AS production_number_id,
    production_date,
    production_time_start,
    production_time_end,
    staff_id,
    ordersheet_id,
    die_number_id,
    die_status_id,
    die_status_note,
    plug_number_id,
    plug_status_id,
    plug_status_note,
    buloong_a1,
    buloong_a2,
    buloong_b1,
    buloong_b2,
    buloong_c1,
    buloong_c2,
    buloong_d1,
    buloong_d2,
    conveyor_height,
    conveyor_height_note,
    compress_dim,
    compress_dim_note,
    compress_pressure,
    compress_pressure_note,
    clamp_pressure,
    clamp_pressure_note,
    start_pull_speed,
    main_pull_speed,
    end_pull_speed,
    pusher_speed,
    cutting_date,
    cutting_staff_id,
    file_url
FROM
    tube_drawing.t_drawing
        LEFT JOIN
    tube_drawing.m_production_numbers ON tube_drawing.m_production_numbers.id = tube_drawing.t_drawing.production_number_id
WHERE tube_drawing.t_drawing.id = '$targetId'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo ($e->errorInfo[2]);
}
?>