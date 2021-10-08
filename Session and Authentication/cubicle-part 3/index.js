let express = require('express');
let app = express();

let port = 3000;

require('./config/express.js')(app);
require('./config/exphbs.js')(app);
require('./config/database.js')(app);

app.use(require('./routes'));

app.listen(port, () => {
    console.log(`App is running on port ${port}...`);
});