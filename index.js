var fs = require("fs");
var file = 'db/development.sqlite3';
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
	if(!exists) {
		db.run('CREATE TABLE IF NOT EXISTS devices (id INTEGER PRIMARY KEY, name TEXT, serial_number TEXT, description TEXT)');
    db.run('INSERT INTO devices (name, serial_number, description) VALUES (?, ?, ?)', 'A100', 'A100-SN', 'A100 device');
    db.run('INSERT INTO devices (name, serial_number, description) VALUES (?, ?, ?)', 'B100', 'B100-SN', 'B100 device');
	}
});

var express = require('express');
var restApi = express();


restApi.get('/devices', function(request, response) {
	db.all('SELECT * FROM devices', function(error, row) {
		response.json(row);
	});
});


restApi.listen(3000);

console.log("Submit GET or POST to http://localhost:3000");
