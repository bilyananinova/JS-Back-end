let express = require('express');
let app = express();

let config = require('./config/config.js');

require('./config/express.js')(app);
require('./config/exphbs.js')(app);

app.use(require('./routes.js'));

app.listen(config.PORT, () => {
    console.log(`App is running on port ${config.PORT}...`);
});
