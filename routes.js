const app = require('express').Router();
const db = require('./db');

app.get('/',(req, res, next)=> {
	res.redirect('/users/filter/All')
});

app.get('/users/filter/:letter/:id?', (req, res, next)=> {
	let users, defaultUser=[];
	db.returnNamesTable()
	.then((namesTable)=> {
		if (req.params.letter === 'All'){
			// Index "26" of table contains All users;
			users = namesTable[26].users
		} else {
			users = namesTable[req.params.letter.charCodeAt(0)-65].users;
		}
		if (req.params.id) {
			defaultUser = users.filter((user)=> {
				console.log('user.id, req.params.id =', user.id, req.params.id )
				return user.id === req.params.id*1;
			});
		} else {
			defaultUser.push(users[0]);
		}

		res.render('index', {namesTable: namesTable, users: users, active: req.params.letter, defaultUser: defaultUser[0]});
	})
	.catch(next);
});

app.post('/regenerate', (req, res, next)=> {
	db.seed()
	.then(()=> res.redirect('/'))
	.catch(next);
});

module.exports = app;