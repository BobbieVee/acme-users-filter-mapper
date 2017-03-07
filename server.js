const server = require('http').createServer(require('./app'));
const db = require('./db');
const port = process.env.PORT || 3000;

db.seed()
.then(()=> server.listen(port, ()=> console.log(`listening on port ${port}\n`)))
.catch( e => console.log(e));

