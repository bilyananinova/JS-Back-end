let express = require('express');
let path = require('path');
let app = express();

let config = require('./config/config.js')[process.env.NODE_ENV.trim()];
require('./config/express.js')(app);
require('./config/exphbs.js')(app);
require('./config/database.js')(app);

app.use(express.static(path.relative(__dirname, './static')));
app.use(require('./router'));

app.listen(config.PORT, () => {
    console.log(`App is running on port ${config.PORT}...`);
});