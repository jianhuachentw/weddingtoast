/*
 * Display the uploaded toasts
 */

exports.pending = function(req, res){

var fs = require('fs');

var dataFolder = 'public/unauthorized';
fs.readdir(dataFolder, function(err, files) {
	console.log(files);
	var toasts = [];

	files.forEach(function(file, index) {
		if (file === ".placeholder") return;

		var toastFolder = dataFolder + '/' + file;
		var name = fs.readFileSync(toastFolder + '/name', "utf-8");
		var text = fs.readFileSync(toastFolder + '/text', "utf-8");
		var toast = {
			fbId: file,
			name: name,
			text: text,
			image: file + "/image",
		}
		console.log(JSON.stringify(toast));
		toasts.push(toast);
	});

	res.render('pending', {
		title: 'Pending toasts',
		toasts: toasts,
	 });
});


};
