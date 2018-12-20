const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/', async (req, res) => {
    let user = { name: 'user1' };
    res.send(user);
})

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

module.exports = server;