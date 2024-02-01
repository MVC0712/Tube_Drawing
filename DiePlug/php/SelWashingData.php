<?php
    require_once('../../connection.php');
    $dbh = new DBHandler();
    if ($dbh->getInstance() === null) {
        die("No database connection");
    }
    $washing_id = $_POST['washing_id'];
    try {
        $sql = "SELECT 
        t_washing_data.id,
        m_staff.name,
        TIME_FORMAT(start_time, '%H:%i') AS start_time,
        TIME_FORMAT(end_time, '%H:%i') AS end_time,
        order_number AS od,
        production_number,
        DATE_FORMAT(t_drawing.production_date, '%d-%m-%y') AS production_date,
        t_washing_data.start_tube,
        t_washing_data.end_tube,
        t_washing_data.quantity
    FROM
        tube_drawing.t_washing_data
            LEFT JOIN
        t_washing_case ON t_washing_case.id = t_washing_data.washing_case_id
            LEFT JOIN
        t_drawing ON t_drawing.id = t_washing_data.drawing_id
            LEFT JOIN
        m_staff ON m_staff.id = t_washing_case.staff_id
            LEFT JOIN
        m_production_numbers ON m_production_numbers.id = t_drawing.production_number_id
            LEFT JOIN
        t_washing ON t_washing.id = t_washing_case.washing_id
    WHERE
        t_washing.id = '$washing_id'";
        $stmt = $dbh->getInstance()->prepare($sql);
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } 
    catch(PDOException $e) {
        echo ($e->errorInfo[2]);
    }
?>