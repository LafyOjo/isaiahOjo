<?php

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}	

	$queryCheck = 'SELECT count(id) as pc FROM personnel WHERE departmentID = ' . $_POST['id'];
	$resultCheck = $conn->query($queryCheck);
	
	$data = [];

	while ($row = mysqli_fetch_assoc($resultCheck)) {

		array_push($data, $row);

	}
	
	$personnel = $data[0]['pc'];
	
	if ($personnel == 0) {
		$query = 'DELETE FROM department WHERE id = ' . $_POST['id'];
		$result = $conn->query($query);

		$output['status']['code'] = "200";
		$output['status']['name'] = "ok";
		$output['status']['description'] = "Department successfully deleted";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = $personnel;

		if (!$result) {

			$output['status']['code'] = "400";
			$output['status']['name'] = "executed";
			$output['status']['description'] = "query failed";	
			$output['data'] = [];
	
			mysqli_close($conn);
	
			echo json_encode($output); 
	
			exit;
	
		}
		
	} else {

		$output['status']['code'] = "403";
		$output['status']['name'] = "forbidden";
		$output['status']['description'] = "Personnel assigned to this department";	
		$output['data'] = $personnel;

	}

	mysqli_close($conn);

	echo json_encode($output); 

?>