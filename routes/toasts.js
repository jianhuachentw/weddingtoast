/*
 * Display the uploaded toasts
 */
var database = require('./database');

exports.toasts = function(req, res) {
	database.getToasts('authorized', function(toasts) {
		database.getBoothPhotos(function(photos) {
			res.render('toasts', {
				title: 'Toasts',
				toasts: toasts,
				photos: photos,
			});
		});
	});
};
