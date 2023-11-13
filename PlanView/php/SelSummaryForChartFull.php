<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$sql ="";
$sql1 = "";
// $start_s = "2022/12/01";
// $end_s = "2022/12/05";

$start_s = $_POST['start_s'];
$end_s = $_POST['end_s'];

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
";
  foreach ($period as $dt) {
    $di = $dt->format("Y-m-d");
    $din = $dt->format("Ymd");
    $sql1 = $sql1 ." MAX(CASE WHEN t_casting.product_date = '" . $di . "'  THEN t10.weight ELSE '' END)/1000 AS '_" . $din ."',";
    }
    $sql1 = substr(trim($sql1), 0, -1);
    $sql1 = $sql1." FROM
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
";
    $sql2="";
    foreach ($period as $dtp) {
    $dp = $dtp->format("Y-m-d");
    $dpn = $dtp->format("Ymd");
    $sql2 = $sql2 ." MAX(CASE WHEN t_plan.product_date ='". $dp ."'  THEN extrusion_scrap + casting_scrap + aluminium_ingot + aluminium_orther ELSE '' END)/1000 AS '_". $dpn ."',";
    }
    $sql2 = substr(trim($sql2), 0, -1);
    $sql2 = $sql2." FROM
    t_plan ";
    $sql = $sql1.$sql2;

    $arr1 = array();
    $sql3 = "";
    $sql4 = "";

    $sql3 = " UNION SELECT 
      '4' AS o,
      ";
      $begin = new DateTime($start_s);
      $end = new DateTime($end_s);
      $end = $end->modify( '+1 day' );
      $interval = DateInterval::createFromDateString('1 day');
      $period = new DatePeriod($begin, $interval, $end);
      foreach ($period as $key => $dt) {
        $din = $dt->format("Ymd");
    $arr1[] = $din;
    }
        for ($i = 0; $i <= iterator_count($period)-1; $i++) {
            $sql4 = $sql4."(";
            for ($j = 0; $j <= $i; $j++) {
                $sql4 = $sql4."t1003._".$arr1[$j]."+";
            }
            $sql4 = substr(trim($sql4), 0, -1);
            $sql4 = $sql4.")/1000 AS _".$arr1[$i];
            $sql4 = $sql4." , ";
        }
    $sql4 = substr(trim($sql4), 0, -1);
    $sql5 = " FROM
                (SELECT 
                    '4' AS o,
                    ";
    
                    foreach ($period as $dtp) {
                        $dp = $dtp->format("Y-m-d");
                        $dpn = $dtp->format("Ymd");
                        $sql5 = $sql5 ." MAX(CASE WHEN t_plan.product_date ='". $dp ."'  THEN extrusion_scrap + casting_scrap + aluminium_ingot + aluminium_orther ELSE '' END) AS '_". $dpn ."',";
                        }
                        $sql5 = substr(trim($sql5), 0, -1);
                        $sql5 = $sql5." FROM
                        t_plan) t1003";
    
                    $arr2 = array();
                    $sql6 = "";
                    $sql7 = "";
                
                    $sql6 = " UNION SELECT 
                      '3' AS o,
                      ";
                      $begin = new DateTime($start_s);
                      $end = new DateTime($end_s);
                      $end = $end->modify( '+1 day' );
                      $interval = DateInterval::createFromDateString('1 day');
                      $period = new DatePeriod($begin, $interval, $end);
                      foreach ($period as $key => $dt) {
                        $din = $dt->format("Ymd");
                    $arr2[] = $din;
                    }
                        for ($i = 0; $i <= iterator_count($period)-1; $i++) {
                            $sql7 = $sql7."(";
                            for ($j = 0; $j <= $i; $j++) {
                                $sql7 = $sql7."t1004._".$arr2[$j]."+";
                            }
                            // $sql7 = $sql7;
                            $sql7 = substr(trim($sql7), 0, -1);
                            $sql7 = $sql7.")/1000 AS _".$arr2[$i];
                            $sql7 = $sql7." , ";
                        }
                    $sql7 = substr(trim($sql7), 0, -1);
                    $sql8 = " FROM
                                (SELECT 
                                    '3' AS o,
                                    ";
                    
                                    foreach ($period as $dtp) {
                                        $dp = $dtp->format("Y-m-d");
                                        $dpn = $dtp->format("Ymd");
                                        $sql8 = $sql8 ." MAX(CASE WHEN t_casting.product_date = '" . $dp . "'  THEN t10.weight ELSE '' END) AS '_" . $dpn ."',";
                                        }
                                        $sql8 = substr(trim($sql8), 0, -1);
                                        $sql8 = $sql8." FROM
                                        t_casting
                                            LEFT JOIN
                                        (SELECT 
                                            t_add_material.t_casting AS cid, SUM(weight) weight
                                        FROM
                                            t_add_material
                                        GROUP BY t_add_material.t_casting) t10 ON t_casting.id = t10.cid
                                            LEFT JOIN
                                        m_material_type ON m_material_type.id = t_casting.product_type) t1004 
                                    ORDER BY o ASC;
                                    ";


    $sql = $sql.$sql3.$sql4.$sql5.$sql6.$sql7.$sql8;
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