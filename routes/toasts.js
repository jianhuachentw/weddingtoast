/*
 * Display the uploaded toasts
 */
var database = require('./database');

exports.toasts = function(req, res) {
	database.getToasts('authorized', function(toasts) {
		res.render('toasts', {
			title: 'Toasts',
			toasts: toasts,
		});
	});
};
