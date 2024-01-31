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
    t_directive.product_date,
    production_number,
    m_staff.name,
    die_number,
    plug_number,
    CONCAT(production_length, '000') AS production_length,
    drawing_type,
    m_production_numbers.b_drawing_l,
    m_production_numbers.b_drawing_out_d,
    m_production_numbers.b_drawing_in_d,
    m_production_numbers.b_drawing_t,
    m_production_numbers.a_drawing_l,
    m_production_numbers.a_drawing_out_d,
    m_production_numbers.a_drawing_in_d,
    m_production_numbers.a_drawing_t,
    m_production_numbers.conveyor_height,
    m_production_numbers.compress_dim,
    m_production_numbers.compress_pressure,
    m_production_numbers.clamp_pressure,
    m_production_numbers.start_pull_speed,
    m_production_numbers.main_pull_speed,
    m_production_numbers.end_pull_speed,
    m_production_numbers.pusher_speed,
    m_production_numbers.puller_force,
    m_production_numbers.straight,
    m_production_numbers.angle,
    m_production_numbers.roller_dis,
    m_production_numbers.roller_speed,
    m_production_numbers.curvature,
    c_max.buloong_a2,
    c_max.buloong_b2,
    c_max.buloong_c2,
    c_max.buloong_d2
FROM
    t_directive
        LEFT JOIN
    m_production_numbers ON m_production_numbers.id = t_directive.production_number_id
        LEFT JOIN
    m_dies ON m_dies.id = t_directive.die_number_id
        LEFT JOIN
    m_plugs ON m_plugs.id = t_directive.plug_number_id
        LEFT JOIN
    m_drawing_type ON m_drawing_type.id = t_directive.drawing_type_id
        LEFT JOIN
    m_staff ON m_staff.id = t_directive.staff_id
        JOIN
    (SELECT 
        MAX(id) max_id,
            production_number_id,
            buloong_a2,
            buloong_b2,
            buloong_c2,
            buloong_d2
    FROM
        t_drawing
    GROUP BY production_number_id) c_max ON (c_max.production_number_id = t_directive.production_number_id)
        JOIN
    t_drawing cd ON (cd.id = c_max.max_id) 
    
where t_directive.id = '$targetId'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>