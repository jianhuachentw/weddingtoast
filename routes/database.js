/*
 * Display the uploaded toasts
 */

exports.pending = function(req, res){

var fs = require('fs');

var dataFolder = 'unauthorized';
fs.readdir(dataFolder, function(err, files) {
	console.log(files);
	var toasts = [];

	files.forEach(function(file, index) {
		if (file === ".placeholder") return;

		var toastFolder = dataFolder + '/' + file;
		var name = fs.readFileSync(toastFolder + '/name', "utf-8");
		var text = fs.readFileSync(toastFolder + '/text', "utf-8");
		var toast = {
			name: name,
			text: text,
			image: file + "/image",
		}

		toasts.push(toast);
	});

	console.log(JSON.stringify(toasts));

	res.render('pending', {
		title: 'Toasts',
		toasts: toasts,
	 });
});


};
