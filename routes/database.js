/*
 * Display the uploaded toasts
 */

exports.getToasts = function(folder, callback){

var fs = require('fs');

var dataFolder = 'public/' + folder;
fs.readdir(dataFolder, function(err, files) {
	var toasts = [];

	files.forEach(function(file, index) {
		if (file === ".placeholder") return;

		var toastFolder = dataFolder + '/' + file;
		var name = fs.readFileSync(toastFolder + '/name', "utf-8");
		var text = fs.readFileSync(toastFolder + '/text', "utf-8");
		var serial = 0;
		try {
			serial = fs.readFileSync(toastFolder + '/serial', "utf-8");
		} catch (ex) {
			// do nothing
		}
		var toast = {
			id: file,
			name: name,
			text: text,
			image: file + "/image",
			serial: serial,
		}

		toasts.push(toast);
	});
	callback(toasts);
});


};
