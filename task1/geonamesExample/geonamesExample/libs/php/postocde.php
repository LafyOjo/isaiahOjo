<?php

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    $urlpostcodes='http://api.geonames.org/postalCodeSearchJSON?formatted=true&postalcode=' . $_REQUEST['postalcode'] . '&maxRows=5&username=isaiahojo&style=full';

    $chpostcode = curl_init();
    curl_setopt($chpostcode, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($chpostcode, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($chpostcode, CURLOPT_URL, $urlpostcodes);

    $resultpostcodes = curl_exec($chpostcode);

    curl_close($chpostcode);

    $decodpostcodes = json_decode($resultpostcodes, true);

    $outputpostcodes['status']['code'] = '200';
    $outputpostcodes['status']['name'] = 'ok';
    $outputpostcodes['status']['description'] = 'success';
    $outputpostcodes['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . ' ms';
    $outputpostcodes['data'] = $decodpostcodes['postalCodes'];

        
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($outputpostcodes);

?>
