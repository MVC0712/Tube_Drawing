<?php
    require_once('../../connection.php');
    $dbh = new DBHandler();
    if ($dbh->getInstance() === null) {
        die("No database connection");
    }

    $washing_output_id = $_POST['washing_output_id'];
    $rack_number = $_POST['rack_number'];
    $work_quantity = $_POST['work_quantity'];
    try {
        $sql = "INSERT INTO extrusion.t_using_aging_rack (
                    washing_output_id, rack_number, work_quantity) 
                VALUES (
                    '$washing_output_id','$rack_number','$work_quantity')";
        $stmt = $dbh->getInstance()->prepare($sql);
        $stmt->execute();

        $stmt = $dbh->getInstance()->prepare("SELECT MAX(extrusion.t_using_aging_rack.id) AS id FROM extrusion.t_using_aging_rack");
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } 
    catch(PDOException $e) {
        echo ($e->errorInfo[2]);
    }
?>