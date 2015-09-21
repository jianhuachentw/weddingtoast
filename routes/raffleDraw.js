/*
 * Display the uploaded toasts
 */
var database = require('./database');

exports.raffleDraw = function(req, res) {
    database.getToasts('authorized', function(toasts) {
        database.getBoothPhotos(function(photos) {
            res.render('raffleDraw', {
                title: 'Raffle Draw',
                toasts: toasts,
                photos: photos,
            });
        });
    });
};
