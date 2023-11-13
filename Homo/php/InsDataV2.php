<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$code = $_POST['code'];
$file_url = $_POST['file_url'];
$gas_end = $_POST['gas_end'];
$gas_start = $_POST['gas_start'];
$homo_end = $_POST['homo_end'];
$homo_start = $_POST['homo_start'];
$lv11_code = $_POST['lv11_code'];
$lv11_pos = $_POST['lv11_pos'];
$lv12_code = $_POST['lv12_code'];
$lv12_pos = $_POST['lv12_pos'];
$lv13_code = $_POST['lv13_code'];
$lv13_pos = $_POST['lv13_pos'];
$lv14_code = $_POST['lv14_code'];
$lv14_pos = $_POST['lv14_pos'];
$lv15_code = $_POST['lv15_code'];
$lv15_pos = $_POST['lv15_pos'];
$lv16_code = $_POST['lv16_code'];
$lv16_pos = $_POST['lv16_pos'];
$lv17_code = $_POST['lv17_code'];
$lv17_pos = $_POST['lv17_pos'];
$lv18_code = $_POST['lv18_code'];
$lv18_pos = $_POST['lv18_pos'];
$lv21_code = $_POST['lv21_code'];
$lv21_pos = $_POST['lv21_pos'];
$lv22_code = $_POST['lv22_code'];
$lv22_pos = $_POST['lv22_pos'];
$lv23_code = $_POST['lv23_code'];
$lv23_pos = $_POST['lv23_pos'];
$lv24_code = $_POST['lv24_code'];
$lv24_pos = $_POST['lv24_pos'];
$lv25_code = $_POST['lv25_code'];
$lv25_pos = $_POST['lv25_pos'];
$lv26_code = $_POST['lv26_code'];
$lv26_pos = $_POST['lv26_pos'];
$lv27_code = $_POST['lv27_code'];
$lv27_pos = $_POST['lv27_pos'];
$lv28_code = $_POST['lv28_code'];
$lv28_pos = $_POST['lv28_pos'];
$lv31_code = $_POST['lv31_code'];
$lv31_pos = $_POST['lv31_pos'];
$lv32_code = $_POST['lv32_code'];
$lv32_pos = $_POST['lv32_pos'];
$lv33_code = $_POST['lv33_code'];
$lv33_pos = $_POST['lv33_pos'];
$lv34_code = $_POST['lv34_code'];
$lv34_pos = $_POST['lv34_pos'];
$lv35_code = $_POST['lv35_code'];
$lv35_pos = $_POST['lv35_pos'];
$lv36_code = $_POST['lv36_code'];
$lv36_pos = $_POST['lv36_pos'];
$lv37_code = $_POST['lv37_code'];
$lv37_pos = $_POST['lv37_pos'];
$lv38_code = $_POST['lv38_code'];
$lv38_pos = $_POST['lv38_pos'];
$lv41_code = $_POST['lv41_code'];
$lv41_pos = $_POST['lv41_pos'];
$lv42_code = $_POST['lv42_code'];
$lv42_pos = $_POST['lv42_pos'];
$lv43_code = $_POST['lv43_code'];
$lv43_pos = $_POST['lv43_pos'];
$lv44_code = $_POST['lv44_code'];
$lv44_pos = $_POST['lv44_pos'];
$lv45_code = $_POST['lv45_code'];
$lv45_pos = $_POST['lv45_pos'];
$lv46_code = $_POST['lv46_code'];
$lv46_pos = $_POST['lv46_pos'];
$lv47_code = $_POST['lv47_code'];
$lv47_pos = $_POST['lv47_pos'];
$lv48_code = $_POST['lv48_code'];
$lv48_pos = $_POST['lv48_pos'];
$staff_id = $_POST['staff_id'];
$datetime = date("Y-m-d H:i:s");
try {
    $sql = "INSERT INTO t_homo
    (code, file_url, gas_end, gas_start, homo_end, homo_start,
    lv11_code, lv11_pos, lv12_code, lv12_pos, lv13_code, lv13_pos,
    lv14_code, lv14_pos, lv15_code, lv15_pos, lv16_code, lv16_pos, lv17_code,
    lv17_pos, lv18_code, lv18_pos, lv21_code, lv21_pos, lv22_code,
    lv22_pos, lv23_code, lv23_pos, lv24_code, lv24_pos, lv25_code, lv25_pos,
    lv26_code, lv26_pos, lv27_code, lv27_pos, lv28_code, lv28_pos, lv31_code,
    lv31_pos, lv32_code, lv32_pos, lv33_code, lv33_pos, lv34_code, lv34_pos, lv35_code, lv35_pos,
    lv36_code, lv36_pos, lv37_code, lv37_pos, lv38_code, lv38_pos, lv41_code, lv41_pos, lv42_code,
    lv42_pos, lv43_code, lv43_pos, lv44_code, lv44_pos, lv45_code, lv45_pos,
    lv46_code, lv46_pos, lv47_code, lv47_pos, lv48_code, lv48_pos, staff_id) VALUES 
    ('$code', '$file_url', '$gas_end', '$gas_start', '$homo_end', '$homo_start',
    '$lv11_code', '$lv11_pos', '$lv12_code', '$lv12_pos', '$lv13_code', '$lv13_pos',
    '$lv14_code', '$lv14_pos', '$lv15_code', '$lv15_pos', '$lv16_code', '$lv16_pos', '$lv17_code',
    '$lv17_pos', '$lv18_code', '$lv18_pos', '$lv21_code', '$lv21_pos', '$lv22_code',
    '$lv22_pos', '$lv23_code', '$lv23_pos', '$lv24_code', '$lv24_pos', '$lv25_code', '$lv25_pos',
    '$lv26_code', '$lv26_pos', '$lv27_code', '$lv27_pos', '$lv28_code', '$lv28_pos', '$lv31_code',
    '$lv31_pos', '$lv32_code', '$lv32_pos', '$lv33_code', '$lv33_pos', '$lv34_code', '$lv34_pos', '$lv35_code', '$lv35_pos',
    '$lv36_code', '$lv36_pos', '$lv37_code', '$lv37_pos', '$lv38_code', '$lv38_pos', '$lv41_code', '$lv41_pos', '$lv42_code',
    '$lv42_pos', '$lv43_code', '$lv43_pos', '$lv44_code', '$lv44_pos', '$lv45_code', '$lv45_pos',
    '$lv46_code', '$lv46_pos', '$lv47_code', '$lv47_pos', '$lv48_code', '$lv48_pos', '$staff_id')";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>