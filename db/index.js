const db = require('./_conn');
const Sequelize = db.Sequelize;
const faker = require('faker');
const User = require('./User');

const sync = () => db.sync({force: true});
const seed = () => {
	return sync()
	.then(()=> {
		let userPromises = [];
		for (var i=0; i<40; i++){
			userPromises.push(User.create({
				firstName: faker.fake("{{name.firstName}}"),
			    lastName: faker.fake("{{name.firstName}}"), 
			    email: faker.fake("{{internet.email}}"),
			    latitude: faker.fake("{{address.latitude}}"),
			    longitude: faker.fake("{{address.longitude}}")
			})
			);
		};
		return Promise.all(userPromises);
	})
	.then((users)=> {
		return users;
	})	
	.catch((err)=> console.log(err));
};

const returnNamesTable = (letter, id)=> {
	let promises = [];
	let namesTable;
	let defaultUser = [];
	// Create promises for searches for each Letter
	for (var i=65; i<=90; i++){
		let letter = String.fromCharCode(i) + '%';
		promises.push(User.findAll({where: {lastName:
				{$like: letter}
			}
		}));
	} 
	return Promise.all(promises)
	.then((namesData)=> {
		// Map letter to each data object
		let _namesTable  = namesData.map((letterData, index)=> {
			let letter = String.fromCharCode(index+65);
			return {letter: letter, users: letterData};
		});
		return _namesTable;
	})	
	.then((_namesTable)=>{
		namesTable = _namesTable;
		return User.findAll();
	})
	.then((allUserData)=>{
		// Add "All" names object as last obj in table
		namesTable.push({letter: "All", users: allUserData});

		// Select which set of users should be returned for current page
		if (letter === 'All'){
				// Index "26" of table contains All users;
				users = namesTable[26].users
			} else {
				users = namesTable[letter.charCodeAt(0)-65].users;
			}

		// Set the default user
		if (id) {
			defaultUser = users.filter((user)=> {
				return user.id === id*1;
			});
		} else {
			defaultUser.push(users[0]);
		}

		return [namesTable, users, defaultUser[0]];
	})
	.catch((err)=> console.log(err));	
};

module.exports = {
	sync,
	seed,
	returnNamesTable, 
	model: {
		User
	}
};

