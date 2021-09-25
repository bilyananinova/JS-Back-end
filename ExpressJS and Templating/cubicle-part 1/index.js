let env = process.env.NODE_ENV || 'development';

let config = require('./config/config.js')[env];
let app = require('express')();

require('./config/express.js')(app);
require('./routes')(app);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));