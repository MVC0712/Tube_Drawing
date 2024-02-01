<?php
    require_once('../../connection.php');
    $dbh = new DBHandler();
    if ($dbh->getInstance() === null) {
        die("No database connection");
    }
    $drawing_date = $_POST['drawing_date'];
    $production_number_id = $_POST['production_number_id'];
    try {
        $sql = "SELECT 
        tube_drawing.t_drawing.id,
        tube_drawing.t_drawing.production_time_start
    FROM
        tube_drawing.t_drawing
    WHERE
        production_date = '$drawing_date'
        AND production_number_id = '$production_number_id'";
        $stmt = $dbh->getInstance()->prepare($sql);
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } 
    catch(PDOException $e) {
        echo ($e->errorInfo[2]);
    }
?>