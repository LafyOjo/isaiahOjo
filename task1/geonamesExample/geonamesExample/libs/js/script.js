$(window).on('load', function () {
    if (
        $('#preloader').length) {$('#preloader').delay(1000).fadeOut('slow',function () {
            $(this).remove();
        });
    }
});

$('#country').click(function() {

		$.ajax({
			url: "libs/php/getCountryInfo.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: $('#selCountry').val(),
				lang: $('#selLanguage').val()
			},
			success: function(result) {

				console.log(JSON.stringify(result));

				if (result.status.name == "ok") {

					$('#txtOne').html(result['data'][0]['continent']);
					$('#txtTwo').html(result['data'][0]['capital']);
					$('#txtThree').html(result['data'][0]['languages']);
					$('#txtFour').html(result['data'][0]['population']);
					$('#txtFive').html(result['data'][0]['areaInSqKm']);

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
			}
		}); 
	
	});

	console.log("js Script loaded");


// earthquake initial set-up
$('#earthquake').click(function() {
    console.log("Button clicked");
    $.ajax({
        url: "libs/php/earthquake.php",
        type: 'POST',
        dataType: 'json',
        data: {
            north: $('#setNorthEQ').val(),
            south: $('#setSouthEQ').val(),
            east: $('#setEastEQ').val(),
            west: $('#setWestEQ').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));
            console.log("JSON stringified");

            if (result.status.name == "ok") {

                $('#txtOneS').html('Date and Time:');
                $('#txtTwoS').html('Depth:');
                $('#txtThreeS').html('Magnitude:');
                $('#txtFourS').html('Longitude:');
                $('#txtFiveS').html('Latitude:');
                $('#txtOne').html(result['data'][0]['datetime']);
                $('#txtTwo').html(result['data'][0]['depth']);
                $('#txtThree').html(result['data'][0]['magnitude']);
                $('#txtFour').html(result['data'][0]['lng']);
                $('#txtFive').html(result['data'][0]['lat']); 

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    }); 

});

// weather set up
$('#weather').click(function() {

    $.ajax({
        url: "libs/php/weather.php",
        type: 'POST',
        dataType: 'json',
        data: {
            north: $('#setNorthW').val(),
            south: $('#setSouthW').val(),
            east: $('#setEastW').val(),
            west: $('#setWestW').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('#txtOneS').html('Date and Time:');
                $('#txtTwoS').html('Temperature:');
                $('#txtThreeS').html('Humidity:');
                $('#txtFourS').html('Longitude:');
                $('#txtFiveS').html('Latitude:');
                $('#txtOne').html(result['data'][0]['datetime']);
                $('#txtTwo').html(result['data'][0]['temperature']);
                $('#txtThree').html(result['data'][0]['humidity']);
                $('#txtFour').html(result['data'][0]['lng']);
                $('#txtFive').html(result['data'][0]['lat']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    }); 

});