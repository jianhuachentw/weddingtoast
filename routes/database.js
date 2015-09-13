/*
 * Display the uploaded toasts
 */

exports.getToasts = getToasts;
exports.getBoothPhotos = getBoothPhotos;

function getToasts(folder, callback){
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
			var hidden = false;
			hidden = fs.existsSync(toastFolder + '/hide');
			var toast = {
				id: file,
				name: name,
				text: text,
				image: file + "/image",
				serial: serial,
				hidden: hidden,
			}

			toasts.push(toast);
		});
		callback(toasts);
	});
};

function getBoothPhotos(callback){
	var fs = require('fs');
	var dataFolder = 'public/photobooth';
	fs.readdir(dataFolder, function(err, files) {
		var photos = [];

		files.forEach(function(file, index) {
			if (file === ".placeholder") return;

			photos.push(file);
		});
		callback(photos);
	});
};

