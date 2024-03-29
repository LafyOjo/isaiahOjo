<?php

  ini_set('display_errors', 'On');
  error_reporting(E_ALL);

  $execution_start_time = microtime(true) / 1000;

  $key = '45ba8192794a4aac9679263b2751622d';

  $url = 'https://newsapi.org/v2/top-headlines?language=en&country=' . $_REQUEST['country'] . '&apiKey=' . $key;

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_URL, $url);
  
  $result = curl_exec($ch);

  curl_close($ch);

  $decode = json_decode($result, true);

  $output['status']['code'] = "200";
  $output['status']['name'] = "ok";
  $output['status']['description'] = "mission saved";
  $output['status']['returnedIn'] = (microtime(true) - $execution_start_time) / 1000 . "ms";
  $output['data'] = $decode;


  header('Content-Type: application/json; charset=UTF-8');

  echo $_SERVER['HTTP_USER_AGENT'] . "\n\n";

  $browser = get_browser(null, true);   
  print_r($browser);
  echo json_encode($output);

  ?>