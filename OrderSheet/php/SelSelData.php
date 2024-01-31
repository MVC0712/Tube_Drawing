<?php
    require_once('../../connection.php');
    $dbh = new DBHandler();
    if ($dbh->getInstance() === null) {
        die("No database connection");
    }
    $targetId = $_POST['targetId'];
    try {
        $sql = "SELECT 
        m_ordersheet.id AS ordersheet_id,
        m_ordersheet.delivery_date_at,
        m_ordersheet.issue_date_at,
        m_ordersheet.ordersheet_number,
        m_production_numbers.id AS production_numbers_id,
        m_production_numbers.production_number,
        m_ordersheet.production_quantity,
        m_ordersheet.note,
        IFNULL(m_ordersheet.updated_at, '') AS update_at
      FROM m_ordersheet
      LEFT JOIN m_production_numbers ON m_ordersheet.production_numbers_id = m_production_numbers.id
      WHERE m_ordersheet.id = '$targetId'";
        $stmt = $dbh->getInstance()->prepare($sql);
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } 
    catch(PDOException $e) {
        echo ($e->errorInfo[2]);
    }
?>