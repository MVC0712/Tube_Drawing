<?php
    require_once('../../connection.php');
    $dbh = new DBHandler();
    if ($dbh->getInstance() === null) {
        die("No database connection");
    }
    $production_number = $_POST['production_number'];
    try {
        $sql = "SELECT 
        m_production_numbers.id,
        m_production_numbers.production_number
      FROM m_production_numbers
      WHERE m_production_numbers.production_number LIKE '%$production_number%'";
        $stmt = $dbh->getInstance()->prepare($sql);
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } 
    catch(PDOException $e) {
        echo ($e->errorInfo[2]);
    }
?>