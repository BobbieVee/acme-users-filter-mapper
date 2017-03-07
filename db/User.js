const db = require('./_conn');
const Sequelize = db.Sequelize;

console.log('db = ', db)

const User = db.define('user', {
	firstName: Sequelize.STRING,
	lastName: Sequelize.STRING,
	email: Sequelize.STRING,
	latitude: Sequelize.DECIMAL,
	longitude: Sequelize.DECIMAL
});

module.exports = User;