const app = require('express').Router();
const db = require('./db');

app.get('/',(req, res, next)=> {
	res.redirect('/users/filter/All')
});

app.get('/users/filter/:letter', (req, res, next)=> {
	let users;
	db.returnNamesTable()
	.then((namesTable)=> {
		if (req.params.letter === 'All'){
			// Index "26" of table contains All users;
			users = namesTable[26].users
		} else {
			users = namesTable[req.params.letter.charCodeAt(0)-65].users;
		}
		let mapDefaultUser = users[0];
		let lat, lng, mapLastName, mapFirstName;
		if  (req.query.lat && req.query.lng) {
			lat = req.query.lat;
			lng = req.query.lng;
			mapLastName = req.query.lastName;
			mapFirstName = req.query.firstName;
			
		} else {
			lat = mapDefaultUser.latitude;
			lng = mapDefaultUser.longitude;
			mapLastName = mapDefaultUser.lastName;
			mapFirstName = mapDefaultUser.firstName;
		}
		res.render('index', {namesTable: namesTable, users: users, active: req.params.letter, lat: lat, lng: lng, mapLastName: mapLastName, mapFirstName: mapFirstName });
	})
	.catch(next);
});

app.post('/regenerate', (req, res, next)=> {
	db.seed()
	.then(()=> res.redirect('/'))
	.catch(next);
});

module.exports = app;