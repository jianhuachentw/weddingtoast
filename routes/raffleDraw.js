/*
 * Display the uploaded toasts
 */
var database = require('./database');

exports.raffleDraw = function(req, res) {
	database.getToasts('authorized', function(toasts) {
		res.render('raffleDraw', {
			title: 'Raffle Draw',
			toasts: toasts,
		});
	});
};
