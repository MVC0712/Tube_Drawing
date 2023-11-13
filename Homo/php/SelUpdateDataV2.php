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
    code,
    gas_end,
    gas_start,
    DATE_FORMAT(homo_end, '%Y-%m-%dT%H:%i') AS homo_end,
    DATE_FORMAT(homo_start, '%Y-%m-%dT%H:%i') AS homo_start,
    lv11_code,
    lv11_pos,
    lv12_code,
    lv12_pos,
    lv13_code,
    lv13_pos,
    lv14_code,
    lv14_pos,
    lv15_code,
    lv15_pos,
    lv16_code,
    lv16_pos,
    lv17_code,
    lv17_pos,
    lv18_code,
    lv18_pos,
    lv21_code,
    lv21_pos,
    lv22_code,
    lv22_pos,
    lv23_code,
    lv23_pos,
    lv24_code,
    lv24_pos,
    lv25_code,
    lv25_pos,
    lv26_code,
    lv26_pos,
    lv27_code,
    lv27_pos,
    lv28_code,
    lv28_pos,
    lv31_code,
    lv31_pos,
    lv32_code,
    lv32_pos,
    lv33_code,
    lv33_pos,
    lv34_code,
    lv34_pos,
    lv35_code,
    lv35_pos,
    lv36_code,
    lv36_pos,
    lv37_code,
    lv37_pos,
    lv38_code,
    lv38_pos,
    lv41_code,
    lv41_pos,
    lv42_code,
    lv42_pos,
    lv43_code,
    lv43_pos,
    lv44_code,
    lv44_pos,
    lv45_code,
    lv45_pos,
    lv46_code,
    lv46_pos,
    lv47_code,
    lv47_pos,
    lv48_code,
    lv48_pos,
    file_url,
    staff_id
FROM
    t_homo
WHERE id = '$targetId'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>