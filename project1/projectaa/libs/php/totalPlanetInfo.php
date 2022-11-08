<?php

    require 'certificate.php';
    
	$start=microtime( true );
    $url=sprintf( 'https://api.protectedplanet.net/v3/countries/' . $_REQUEST['iso'] . '?token=4044393283283d2lce73h3d9hbsbi8b3');
    $res=curl( $url );
    
    if( $res->info->http_code==200 ){
        $json=json_decode( $res->response );
        $output=array(
            'landarea'    =>  $json->country->statistics->land_area,
			'marinearea'	=> $json->country->statistics->marine_area,
			'palandarea'	=> $json->country->statistics->pa_land_area,
			'pamarinearea'	=> $json->country->statistics->pa_marine_area,
			'percentpalandarea'	=> $json->country->statistics->percentage_pa_land_cover,
			'percentpamarinearea'	=> $json->country->statistics->percentage_pa_marine_cover,
            'status'    =>  array(
                'code'          =>  200,
                'name'          =>  'ok',
                'description'   =>  'success',
                'returnedIn'    =>  intval( ( microtime( true ) - $start ) * 1000 ) . 'ms'
            )
        );
    }else{
        $output=$res;
    }
    
    
    header('Content-Type: application/json; charset=UTF-8');
    exit( json_encode( $output ) );
?>