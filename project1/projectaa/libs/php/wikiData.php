<?php    
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	$url='http://api.geonames.org/wikipediaSearchJSON?q=' . $_REQUEST['q'] . '&maxRows=1&username=isaiahojo';

	$curlRes = curl_init();
	curl_setopt($curlRes, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curlRes, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curlRes, CURLOPT_URL,$url);

	$result=curl_exec($curlRes);

	curl_close($curlRRes);

	$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $decode['geonames'];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 
?>