const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const debug = require('debug')('myapp:server');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const personsRouter = require('./routes/persons');
app.use('/persons', personsRouter);

app.listen(port, () => {
    console.log(chalk.green(`Server is running on http://localhost:${port}`));
    debug(`Server is running on http://localhost:${port}`);
});
