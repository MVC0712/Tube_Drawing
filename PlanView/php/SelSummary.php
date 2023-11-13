<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$start_s = "";
$end_s = "";
$sql ="";
$sql1 = "";
$start_s = $_POST['start_s'];
$end_s = $_POST['end_s'];
// $start_s = '2022-07-01';
// $end_s = '2022-07-05';

$begin = new DateTime($start_s);
$end = new DateTime($end_s);
$end = $end->modify( '+1 day' );
$interval = DateInterval::createFromDateString('1 day');
$period = new DatePeriod($begin, $interval, $end);
foreach ($period as $dt) {
  $di = $dt->format("Y-m-d");
  $din = $dt->format("Ymd");
}
$sql1 = $sql1."
SELECT 
    '1' AS o,
    'Actual' AS a,
    'Actual' AS b,
";
foreach ($period as $dt) {
  $di = $dt->format("Y-m-d");
  $din = $dt->format("Ymd");
  $sql1 = $sql1 ." MAX(CASE WHEN 
    t_casting.product_date = '" . $di . "' 
  THEN t10.weight ELSE '' END) AS '_" . $din ."',";
}
  $sql2 = substr(trim($sql1), 0, -1);
  $sql2 = $sql2." FROM
  t_casting
      LEFT JOIN
  (SELECT 
      t_add_material.t_casting AS cid, SUM(weight) weight
  FROM
      t_add_material
  GROUP BY t_add_material.t_casting) t10 ON t_casting.id = t10.cid
      LEFT JOIN
  m_material_type ON m_material_type.id = t_casting.product_type
UNION SELECT
'2' AS o,
'Plan' AS a,
'Plan' AS b,
";
  $sql3="";
  foreach ($period as $dtp) {
  $dp = $dtp->format("Y-m-d");
  $dpn = $dtp->format("Ymd");
  $sql3 = $sql3 ." MAX(CASE WHEN 
    t_plan.product_date ='". $dp ."' 
    THEN extrusion_scrap + casting_scrap + aluminium_ingot + aluminium_orther ELSE '' END) AS '_". $dpn ."',";
}
  $sql3 = substr(trim($sql3), 0, -1);
  $sql3 = $sql3." FROM
  t_plan
ORDER BY o ASC;
  ";
  $sql = $sql2.$sql3;
  // print_r($sql);
try {
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>