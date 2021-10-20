let express = require('express');
let cookieParser = require('cookie-parser');
let app = express();

let { PORT } = require('./config/constants');
let { auth } = require('./middlewares/auth');
let router = require('./router');

require('./config/express.js')(app);
require('./config/exphbs.js')(app);
require('./config/database.js')(app);

app.use(cookieParser());
app.use(auth);
app.use(router);

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}...`);
});