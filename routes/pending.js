/*
 * Display the uploaded toasts
 */

var database = require('./database');

exports.pending = function(req, res) {
	database.getToasts('unauthorized', function(toasts) {
		res.render('pending', {
			title: 'Pending toasts',
			toasts: toasts,
		});
	});
};
