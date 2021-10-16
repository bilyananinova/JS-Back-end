let express = require('express');
let app = express();
let cookieParser = require('cookie-parser');

let port = 3000;

require('./config/express.js')(app);
require('./config/exphbs.js')(app);
require('./config/database.js')(app);

app.use(cookieParser());
app.use(require('./middlewares/isLogged'));
app.use(require('./routes'));
app.use(require('./middlewares/errorHandling'));

app.listen(port, () => {
    console.log(`App is running on port ${port}...`);
});