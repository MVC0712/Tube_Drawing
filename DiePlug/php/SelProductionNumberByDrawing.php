<?php
    require_once('../../connection.php');
    $dbh = new DBHandler();
    if ($dbh->getInstance() === null) {
        die("No database connection");
    }
    $drawing_date = $_POST['drawing_date'];
    try {
        $sql = "SELECT 
        production_number_id, production_number
    FROM
        tube_drawing.t_drawing
            LEFT JOIN
        m_production_numbers ON m_production_numbers.id = t_drawing.production_number_id
    WHERE
        production_date = '$drawing_date'";
        $stmt = $dbh->getInstance()->prepare($sql);
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } 
    catch(PDOException $e) {
        echo ($e->errorInfo[2]);
    }
?>