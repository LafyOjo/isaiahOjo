<?php
// These two set of lines initiate comprehensive error reporting, so that I can run the routine directly in the browser and see all output, including errors, echoed to the browser screen. To do this, enter the full path of the file as it appears on the web server, file name and extension and then a question mark followed by the parameters, each one separated by an ampersand.
//http://api.geonames.org/countryInfoJSON?formatted=true&lang=it&country=DE&username=isaiahojo&style=full
ini_set('display_errors', 'On');
error_reporting(E_ALL);

// API source url with predefined parameters 
$url = "http://api.geonames.org/countryInfoJSON?formatted=true&lang=it&country=DE&username=isaiahojo&style=full";

$ch = curl_init();

curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

curl_setopt($ch, CURLOPT_URL, $url);

$result = curl_exec($ch);

curl_close($ch);

$decode = json_decode($result, true);
echo json_encode($decode);
