const { Client, Collection } = require('discord.js');
const express = require('express')
const { TOKEN, PORT } = require('./config.json');

const client = new Client({intents: 32767});
const server = express();

client.commands = new Collection();

require('./src/Handlers/Events')(client);
require('./src/Handlers/Commands')(client);

client.login(TOKEN)
    .then(() => console.log('The Client Logged in successfully.'))
    .catch(error => console.log(error));
require('./server')(server, client);
server.listen(PORT, () => {
    console.log(`Express Server started successfully on port: ${PORT}.`);
});