//CONSTANTS
AC_MULTIPLIER = 2;
IPSI_BONE_TRANSMISSION = 1; //transmits very well
CONTRA_BONE_TRANSMISSION = 0.1; //transmits poorly
SOUND = 10;


function ear(eac_occlusion, ac_multiplier, cochlear_function, ipsi_bone_transmission, contra_bone_transmission){
	this.eac_occlusion = eac_occlusion;
	this.ac_multiplier = ac_multiplier;
	this.cochlear_function = cochlear_function;
	this.perc_cochlear_function = cochlear_function/100;
	this.ipsi_bone_transmission = ipsi_bone_transmission;
	this.contra_bone_transmission = contra_bone_transmission;
}



function rinnes(sound, testEar, contraEar, description){
	perc_conductive_loss = sound * ((100 - testEar.eac_occlusion)/100);

	//calculate Air Conduction
	ac = perc_conductive_loss * testEar.ac_multiplier * testEar.perc_cochlear_function;

	//calculate Bone Conduction 
	ipsi_bc = sound * testEar.ipsi_bone_transmission * testEar.perc_cochlear_function;
	contra_bc = sound * testEar.contra_bone_transmission * contraEar.perc_cochlear_function;
	bc = ipsi_bc + contra_bc;

	//Return valeue
	if(ac > bc) {
		return "AC > BC";
		//console.log(description + " AC > BC");
	}
	else if(ac == bc) {
		return "AC = BC";
		//console.log(description + " AC = BC");
	}
	else if(ac < bc) {
		return "BC > AC";
		//console.log(description + " BC > AC");
	}

}

function webers(sound, rightEar, leftEar, description) {
	//calculate right ear
	conductive_augment = rightEar.eac_occlusion;
	re = (sound + conductive_augment) * rightEar.perc_cochlear_function;

	//calculate left ear
	conductive_augment = leftEar.eac_occlusion;
	le = (sound + conductive_augment) * leftEar.perc_cochlear_function;


	//compare left with right
	if (re > le) {
		return 'Lateralises to Right';
		console.log(description + " lateralises to right");
	}
	else if(re == le) {
		return 'Central';
		console.log(description + " central");
	}
	else if(re < le) {
		return 'Lateralises to Left';
		console.log(description + " lateralises to left");
	}
}

function generate_ears() {
		right_ear_occlusion = $('#right-conductive-amount').val();
		right_cochlear_function = $('#right-cochlear-function-amount').val();

		left_ear_occlusion = $('#left-conductive-amount').val();
		left_cochlear_function = $('#left-cochlear-function-amount').val();

		var right_ear = new ear(right_ear_occlusion, AC_MULTIPLIER, right_cochlear_function, IPSI_BONE_TRANSMISSION, CONTRA_BONE_TRANSMISSION);
		var left_ear = new ear(left_ear_occlusion, AC_MULTIPLIER, left_cochlear_function, IPSI_BONE_TRANSMISSION, CONTRA_BONE_TRANSMISSION);

		var ears = {
			right: right_ear,
			left: left_ear
		};

		return ears;
}

$(document).ready(function(){
	console.log('ready');

/********************TEST EAR EXAMPLES*************************************************************************
	var normal_ear = new ear(0, AC_MULTIPLIER, 100, IPSI_BONE_TRANSMISSION, CONTRA_BONE_TRANSMISSION);
	var conductive_loss = new ear(100, AC_MULTIPLIER, 100, IPSI_BONE_TRANSMISSION, CONTRA_BONE_TRANSMISSION);
	var mild_ssnhl = new ear(0, AC_MULTIPLIER, 50, IPSI_BONE_TRANSMISSION, CONTRA_BONE_TRANSMISSION);
	var total_ssnhl = new ear(0, AC_MULTIPLIER, 0, IPSI_BONE_TRANSMISSION, CONTRA_BONE_TRANSMISSION);

	rinnes(SOUND, normal_ear, normal_ear, "Normal");
	rinnes(SOUND, conductive_loss, normal_ear, "Conductive");
	rinnes(SOUND, mild_ssnhl, normal_ear, "Mild SSNHL");
	rinnes(SOUND, total_ssnhl, normal_ear, "Dead ear");

	webers(SOUND, normal_ear, normal_ear, "Normal");
	webers(SOUND, conductive_loss, normal_ear, "Conductive");
	webers(SOUND, mild_ssnhl, normal_ear, "Mild SSNHL");
	webers(SOUND, total_ssnhl, normal_ear, "Dead ear");
***************************************************************************************************************/

/*------------------------------------RINNES TEST BUTTONS------------------------------------*/

	$('.rinnes-test').on('click', function(){
		console.log('rinnes test');

		var side = $(this).data('side');

		var ears = generate_ears();
		var right_ear = ears.right;
		var left_ear = ears.left;


		if (side == 'right'){

			var result = rinnes(SOUND, right_ear, left_ear);
			$('#right-rinnes').html(result);
			console.log('right rinnes');
			console.log(result);
		}
		else if (side == 'left') {
			var result = rinnes(SOUND, left_ear, right_ear)
			$('#left-rinnes').html(result);
			console.log('left rinnes');
			console.log(result);
		}
	});
/************************************************************************************************/


/*------------------------------------WEBERS TEST BUTTONS------------------------------------*/

	$('.webers-test').on('click', function(){
		console.log('webers test');

		var ears = generate_ears();
		var right_ear = ears.right;
		var left_ear = ears.left;

		var result = webers(SOUND, right_ear, left_ear)
		$('.webers-test').html(result);

	});

/***********************************************************************************************/


});