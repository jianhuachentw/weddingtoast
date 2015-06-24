/*
 * Display the uploaded toasts
 */

var database = require('./database');

exports.admin = function(req, res) {
	database.getToasts('authorized', function(toasts) {
        console.log(toasts)
		res.render('admin', {
			title: 'Managing toasts',
			toasts: toasts,
		});
	});
};
