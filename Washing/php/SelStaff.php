<?php
	require_once('../../connection.php');
	$dbh = new DBHandler();
	if ($dbh->getInstance() === null) {
			die("No database connection");
	}
	// $staff = "";
	// $staff = $_POST['staff'];
	try {
		$sql = "SELECT * FROM m_staff";
		$stmt = $dbh->getInstance()->prepare($sql);
		$stmt->execute();
		echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
	} 
	catch(PDOException $e) {
		echo ($e->errorInfo[2]);
	}
?>