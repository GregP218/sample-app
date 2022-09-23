const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const {
	body
} = require('express-validator'); // validate/sanitize user input
const bcrypt = require('bcrypt'); // used to hash passwords

//generate connection to database
const connection = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: '',
	database: 'coa_development'
});

const app = express();
app.use(bodyParser.json({
	type: 'application/json'
}));
app.use(bodyParser.urlencoded({
	extended: true
}));

var server = app.listen(3000, function () {
	var host = server.address().address
	var port = server.address().port
});
//attempt connection 
connection.connect(function (error) {
	if (error) console.log(error);
	else console.log("connected");
});



//get driver info based on user ID
app.get('/driver', function (req, res) {

	var user = req.query.user_id;
	connection.query('select * from driver WHERE user_id = ?', [user], function (error, rows, fields) {
		if (error) console.log(error);
		else {
			res.send(rows);
		}
	});
});
//get upcoming time off requests by todays date and driver ID
app.get('/viewTime', function (req, res) {

	var yest = new Date();
	yest.setDate(yest.getDate() - 1);
	var user = req.query.user_id;
	connection.query('select * from driver_vacation WHERE day_off_end > ? && driver_id = ? order by day_off_start', [yest, user], function (error, rows, fields) {
		if (error) console.log(error);
		else {
			res.send(rows);
		}
	});
});
//get client info based on client ID
app.get('/clientInfo', function (req, res) {

	var idclient = req.query.idclient;
	connection.query('select fname, lname, phone_home, phone_cell from client WHERE idclient = ?', [idclient], function (error, rows, fields) {
		if (error) console.log(error);
		else {
			res.send(rows);
		}
	});
});
//get passenger info based on daytrip ID
app.get('/passInfo', function (req, res) {
	var dtid = req.query.idtrip;
	connection.query('select * from daytrip_pick_drop_loc WHERE dtid = ?', [dtid], function (error, rows, fields) {
		if (error) console.log(error);
		else {
			res.send(rows);
		}
	});
});
//get destination information based on daytrip ID selected from daytrip destination
app.get('/destInfo', function (req, res) {
	var dtid = req.query.idtrip;
	connection.query('select * from destination WHERE (dest_id IN (select dest_id from daytrip_destination WHERE dtid = ?)) order by dest_id', [dtid], function (error, rows, fields) {
		if (error) console.log(error);
		else {
			res.send(rows);
		}
	});
});
//get destination order based on daytrip id
app.get('/destOrder', function (req, res) {
	var dtid = req.query.idtrip;
	connection.query('select * from daytrip_destination WHERE dtid = ? order by dest_id', [dtid], function (error, rows, fields) {
		if (error) console.log(error);
		else {
			res.send(rows);
		}
	});
})
//get list of vehicle info
app.get('/vehicleList', function (req, res) {
	connection.query('select vehicle_id, make, model, year from vehicle', function (error, rows, fields) {
		if (error) console.log(error);
		else {
			res.send(rows);
		}
	});
});
//get list of trips and info based on driver ID and appt date
app.get('/getTrips', function (req, res) {

	var driver_id = req.query.user_id;
	var appt_date = req.query.appt_date;
	connection.query('select pickup_time, pickup_street1, idtrip from trip WHERE driver_id = ? && appt_date = ?', [driver_id, appt_date], function (error, rows, fields) {
		if (error) console.log(error);
		else {
			res.send(rows);
		}
	});
});
//get vehicle and appt date based on trip ID
app.get('/getTransportTrip', function (req, res) {

	var idtrip = req.query.idtrip;
	connection.query('select vehicle1_id, appt_date from trip WHERE idtrip = ?', [idtrip], function (error, rows, fields) {
		if (error) console.log(error);
		else {
			res.send(rows);
		}
	});
});
//get assigned vehicle info based on vehicle ID
app.get('/assignedVehicle', function (req, res) {
	var vehicle_id = req.query.vehicle_id
	connection.query('select make, model, year from vehicle WHERE vehicle_id = ?', [vehicle_id], function (error, rows, fields) {
		if (error) console.log(error);
		else {
			res.send(rows);
		}
	});
});

//display list of upcoming trips based on driver ID and todays date, ordered by date and time.
app.get('/displayTrip', function (req, res) {
	var yest = new Date();
	yest.setDate(yest.getDate() - 1);
	var user = req.query.user_id;
	connection.query('select * from trip WHERE (driver_id = ? && appt_date > ?) order by appt_date, pickup_time', [user, yest, user, yest], function (error, rows, fields) {
		if (error) console.log(error);
		else {
			res.send(rows);
		}
	});
});
//get trips currently with no drivers based on driver ID
app.get('/displayPending', function (req, res) {
	var yest = new Date();
	yest.setDate(yest.getDate() - 1);
	var active = 1;
	var user = req.query.user_id;
	connection.query('select * from trip WHERE (driver_id is null && active = ? && appt_date > ?) && (idtrip IN (select trip_id from pending WHERE driver_id = ?)) order by appt_date, pickup_time', [active, yest, user], function (error, rows, fields) {
		if (error) console.log(error);
		else {
			res.send(rows);
		}
	});
});
//post driver ID to trip that a driver accepts
app.post('/acceptTrip', function (req, res) {

	var user_id = req.body.user_id;
	var idtrip = req.body.idtrip;
	var flag = 0;

	connection.query('UPDATE trip SET driver_id = ? WHERE idtrip = ?',
		[user_id, idtrip],
		function (error, results, fields) {
			if (error) {
				console.log(error.message);
			} else {
				console.log(results);
				connection.query('UPDATE pending SET flag = ? WHERE driver_id = ? && trip_id = ?',
				[flag, user_id, idtrip],
				function (error, results, fields) {
					if (error) {
						console.log(error.message);
						res.send(false)
					} else {
						console.log(results);
						res.send(true)
					}
				}
			);
				
			}
		}
	);

});
//remove trip from pending trip based on driver ID and trip ID when trip is declined
app.post('/declineTrip', function (req, res) {

	var user_id = req.body.user_id;
	var idtrip = req.body.idtrip;

	connection.query('DELETE from pending WHERE (driver_id = ? && trip_id = ?)',
		[user_id, idtrip],
		function (error, results, fields) {
			if (error) {
				console.log(error.message);
			} else {
				console.log(results);
				res.send(true)
			}
		}
	);

});
//post new time off request with driver ID and requested dates
app.post('/time_off', function (req, res) {
	console.log('Time Off Form Submitted...');

	var day_off_start = req.body.timeOff.day_off_start;
	var day_off_end = req.body.timeOff.day_off_end;
	var user_id = req.body.timeOff.user_id;

	connection.query('INSERT INTO driver_vacation (driver_id, day_off_start, day_off_end) VALUES (?, ?, ?)',
		[user_id, day_off_start, day_off_end],
		function (error, results, fields) {
			if (error) {
				console.log(error.message);
				res.send("An error occurred while adding time off request.")
			} else {
				console.log("Time Off Request: ", results);
				res.send("Time Off succesfully added!")
			}
		}
	);

});
//delete time off request based on vacation id
app.delete('/cancelTime', function (req, res) {

	var vacation_id = req.body.time.vacation_id;

	connection.query('DELETE FROM driver_vacation WHERE vacation_id = ?',
		[vacation_id],
		function (error, results, fields) {
			if (error) {
				console.log(error.message);
			} else {
				console.log(results);
			}
		}
	);

});
//post completed transportation report with all fields
app.post('/transport', function (req, res) {

	var report_vid = req.body.Transport.report_vid;
	var report_date = req.body.Transport.report_date;
	var report_day = req.body.Transport.report_day;
	var report_destination = req.body.Transport.report_destination;
	var report_starttime = req.body.Transport.report_starttime;
	var report_endtime = req.body.Transport.report_endtime;
	var report_odometerstart = req.body.Transport.report_odometerstart;
	var report_odometerend = req.body.Transport.report_odometerend;
	var report_total_passengers = req.body.Transport.report_total_passengers;
	var report_cash = req.body.Transport.report_cash;
	var user_id = req.body.Transport.user_id;
	var elder_ambul = req.body.Transport.elder_ambul;
	var eld_nonamb = req.body.Transport.eld_nonamb;
	var noneld_amb = req.body.Transport.noneld_amb;
	var noneld_nonamb = req.body.Transport.noneld_nonamb;
	var transreport_note = req.body.Transport.transreport_note;
	var trans_report_id;

	connection.query('INSERT INTO trans_report (report_vid, report_date, report_day, report_destination, report_driver_id, report_starttime, report_endtime, report_odometerstart, report_odometerend, report_total_passengers, report_cash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
		[report_vid, report_date, report_day, report_destination, user_id, report_starttime, report_endtime, report_odometerstart, report_odometerend, report_total_passengers, report_cash],
		function (error, results, fields) {
			if (error) {
				console.log(error.message);
				res.send(false)
			} else {
				connection.query('select report_id from trans_report WHERE report_date = ? && report_driver_id = ? && report_starttime = ?', [report_date, user_id, report_starttime], 
				function (error, rows, fields) {
					if (error){
						console.log(error);
					} 
					else {
						trans_report_id = rows[0].report_id;
						connection.query('INSERT INTO trans_report_passengers (elder_ambul, eld_nonamb, noneld_amb, noneld_nonamb, transreport_note, trans_report_id) VALUES (?, ?, ?, ?, ?, ?)',
						[elder_ambul, eld_nonamb, noneld_amb, noneld_nonamb, transreport_note, trans_report_id],
						function (error, results, fields) {
							if (error) {
								console.log(error.message);
								res.send(false)
							} else {
								res.send(true)
							}
						}
					);
					}
				});
			}
		}
	);

});
//post pre trip report with all fields
app.post('/pretrip', function (req, res) {

	var parking_brake = req.body.preTripReport.parking_brake;
	var check_fuel_level = req.body.preTripReport.check_fuel_level;
	var wiper_washer = req.body.preTripReport.wiper_washer;
	var heater_defroster = req.body.preTripReport.heater_defroster;
	var mirrors = req.body.preTripReport.mirrors;
	var instrument_panel = req.body.preTripReport.instrument_panel;
	var horn = req.body.preTripReport.horn;
	var er_door = req.body.preTripReport.er_door;
	var rear_wheelbrakes = req.body.preTripReport.rear_wheelbrakes;
	var windows = req.body.preTripReport.windows;
	var steering_wheel = req.body.preTripReport.steering_wheel;
	var warning_devices = req.body.preTripReport.warning_devices;
	var wheelchair_clamps = req.body.preTripReport.wheelchair_clamps;
	var headlights = req.body.preTripReport.headlights;
	var clearance_lights_front = req.body.preTripReport.clearance_lights_front;
	var id_lights_front = req.body.preTripReport.id_lights_front;
	var turn_signals = req.body.preTripReport.turn_signals;
	var alt_flashing_front = req.body.preTripReport.alt_flashing_front;
	var sidemarker_lights_left = req.body.preTripReport.sidemarker_lights_left;
	var reflectors_left = req.body.preTripReport.reflectors_left;
	var er_door_left = req.body.preTripReport.er_door_left;
	var tail_lights = req.body.preTripReport.tail_lights;
	var stop_lights = req.body.preTripReport.stop_lights;
	var clearance_lights_rear = req.body.preTripReport.clearance_lights_rear;
	var id_lights_rear = req.body.preTripReport.id_lights_rear;
	var reflectors_rear = req.body.preTripReport.reflectors_rear;
	var alt_flashing_rear = req.body.preTripReport.alt_flashing_rear;
	var er_door_rear = req.body.preTripReport.er_door_rear;
	var sidemarker_lights_right = req.body.preTripReport.sidemarker_lights_right;
	var reflectors_right = req.body.preTripReport.reflectors_right;
	var entrance_door = req.body.preTripReport.entrance_door;
	var wheellug_6tires = req.body.preTripReport.wheellug_6tires;
	var secure_inside = req.body.preTripReport.secure_inside;
	var secure_under = req.body.preTripReport.secure_under;
	var secure_around = req.body.preTripReport.secure_around;
	var vehicle_id = req.body.preTripReport.vehicle_id;
	var notes = req.body.preTripReport.notes;
	var date = req.body.preTripReport.date;
	var route_text = req.body.preTripReport.route_text;
	var mileage_start = req.body.preTripReport.mileage_start;
	var last_oilchange_mileage = req.body.preTripReport.last_oilchange_mileage;
	var user_id = req.body.preTripReport.user_id;

	connection.query('INSERT INTO `pre-trip checklist` (vehicle_id, driver_id, notes, date, route_text, mileage_start, last_oilchange_mileage, parking_brake, check_fuel_level, wiper_washer, heater_defroster, mirrors, instrument_panel, horn, er_door, rear_wheelbrakes, windows, steering_wheel, warning_devices, wheelchair_clamps, headlights, clearance_lights_front, id_lights_front, turn_signals, alt_flashing_front, sidemarker_lights_left, reflectors_left, er_door_left, tail_lights, stop_lights, clearance_lights_rear, id_lights_rear, reflectors_rear, alt_flashing_rear, er_door_rear, sidemarker_lights_right, reflectors_right, entrance_door, wheellug_6tires, secure_inside, secure_under, secure_around) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
		[vehicle_id, user_id, notes, date, route_text, mileage_start, last_oilchange_mileage, parking_brake, check_fuel_level, wiper_washer, heater_defroster, mirrors, instrument_panel, horn, er_door, rear_wheelbrakes, windows, steering_wheel, warning_devices, wheelchair_clamps, headlights, clearance_lights_front, id_lights_front, turn_signals, alt_flashing_front, sidemarker_lights_left, reflectors_left, er_door_left, tail_lights, stop_lights, clearance_lights_rear, id_lights_rear, reflectors_rear, alt_flashing_rear, er_door_rear, sidemarker_lights_right, reflectors_right, entrance_door, wheellug_6tires, secure_inside, secure_under, secure_around],
		function (error, results, fields) {
			if (error) {
				console.log(error.message);
				res.send(false)
			} else {
				console.log("Pre-Trip Checklist Submission: ", results);
				res.send(true)
			}
		}
	);

});

//post request for login authentication
app.post('/auth',
		body('username').exists().trim().escape(),
		body('password').exists().trim().escape(),
		function (request, response) {

			var username = request.body.username;
			var password = request.body.password;
				// check if there is a user with matching username in database
				connection.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {

					if (results.length > 0) {
						if (results[0].Status == 1){
							if (results[0].user_type == 'driver'){
								bcrypt.compare(password, results[0].pwd, function (err, res) {
								// Passwords match
									if (res) {
										// send a response that signals user is valid 
										response.send(String(results[0].id));
										// Passwords don't match
									} else {
										response.send(false);
									}
								});
							} else {
								// send a response that signals user is not valid 
								response.send(false);
							}
							}else{
								// send a response that signals user is not valid 
								response.send(false);
							}	
							}else{
								// send a response that signals user is not valid 
								response.send(false);
								};
				});
	});