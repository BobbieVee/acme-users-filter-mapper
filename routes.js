const app = require('express').Router();
const db = require('./db');

app.get('/',(req, res, next)=> {
	res.redirect('/users/filter/All')
});

app.get('/users/filter/:letter/:id?', (req, res, next)=> {
	let users, defaultUser=[];
	db.returnNamesTable(req.params.letter, req.params.id)
	.then((namesTableData)=> {
		res.render('index', {namesTable: namesTableData[0], users: namesTableData[1], active: req.params.letter, defaultUser: namesTableData[2]});
	})
	.catch(next);
});

app.post('/regenerate', (req, res, next)=> {
	db.seed()
	.then(()=> res.redirect('/'))
	.catch(next);
});

module.exports = app;