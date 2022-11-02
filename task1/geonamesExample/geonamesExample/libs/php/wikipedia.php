<?php
//"http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=london&maxRows=10&username=isaiahojo&style=full";
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$url = "http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=london&maxRows=10&username=isaiahojo&style=full";
 


curl_setopt(curl_init(), CURLOPT_SSL_VERIFYPEER, false);

curl_setopt(curl_init(), CURLOPT_RETURNTRANSFER, true);

curl_setopt(curl_init(), CURLOPT_URL, $url);

$result = curl_exec(curl_init());

curl_close(curl_init());

$decode = json_decode($result, true);
echo json_encode($decode);
