require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');

let journal = require('./controllers/journalcontroller');
let user = require('./controllers/usercontroller');

sequelize.sync();
// sequelize.sync({force: true});
app.use(require('./middleware/headers'));

app.use(express.json());

/********************
 * Exposed route *
 ********************/
app.use('/user', user);

/********************
 * Protected route *
 ********************/
// app.use(require('./middleware/validate-session'));
app.use('/journal', journal);

// app.use("/calculator", calc);

app.listen(3000, function(){
  console.log('App is listening on port 3000');
});
