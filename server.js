const bodyParser = require('body-parser');
const Ascii = require('ascii-table');
const status = require('./src/Routers/status');
const messages = require('./src/Routers/messages');
const subjects = require('./src/Routers/subjects');
const classes = require('./src/Routers/classes');

module.exports = async (server, client) => {
    const table = new Ascii('Express Sever');

    server.use(bodyParser.json());
    server.use('', (request, response, next) => {
        request.client = client;
        next();
    })

    // INDEX
    server.get('/', (request, response) => {
        response.send(`Hello, I'm ${client.user.username}.`);
        console.log('hello world', client.user.username);
    })

    // SETTING THE ROUTERS
    server.use(status);
    server.use(messages);
    server.use(subjects);
    server.use(classes);

    await table.addRow('Started Successfully');
    console.log(table.toString());
}
