<?php
  require_once('../../connection.php');
  $dbh = new DBHandler();
  if ($dbh->getInstance() === null) {
      die("No database connection");
  }
  $search_input = $_POST['search_input'];
  try {
      $sql = "SELECT 
      m_ordersheet.id,
      m_ordersheet.ordersheet_number,
      m_ordersheet.delivery_date_at,
      m_ordersheet.issue_date_at,
      m_production_numbers.production_number,
      m_ordersheet.production_quantity,
      '' AS work_quantity,
      '' AS total_ng,
      '' AS total_ok,
      '' AS diff_qty,
      '' AS packed,
      '' AS NP,
      m_ordersheet.note,
      m_ordersheet.updated_at
  FROM
      m_ordersheet
          LEFT JOIN
      m_production_numbers ON m_ordersheet.production_numbers_id = m_production_numbers.id
      WHERE ordersheet_number LIKE '%$search_input%' OR production_number LIKE '%$search_input%'
  ORDER BY issue_date_at DESC , delivery_date_at DESC , ordersheet_number DESC;";
      $stmt = $dbh->getInstance()->prepare($sql);
      $stmt->execute();
      echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
  } 
  catch(PDOException $e) {
      echo ($e->errorInfo[2]);
  }
?>