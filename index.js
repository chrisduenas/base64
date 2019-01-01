const express = require('express');
const app = express();

app.use(express.json());

const users = [
    { id: 1, name: 'user1'},
    { id: 2, name: 'user2'},
    { id: 3, name: 'user3'},
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/user', (req, res) => {
    res.send(users);
});

app.post('/user', (req, res) => {
    const user = {
        id: req.body.id,
        name: req.body.name
    };
    if (!req.body.name) return res.status(404).send('User not found');
    users.push(user);
    res.send(user);
});

app.get('/user/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Cannot find user with given Id');
    res.send(user);
});

app.put('/user/:id', (req, res) => {
    const user = {
        id: req.body.id,
        name: req.body.name
    };
    if(!req.body.name) return res.status(404).send('User cannot be updated');
    if(req.body.name.length < 5) return res.status(400).send('Name must be at least 5 characters');

    res.send(user);
});

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

module.exports = server;