const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const users = [
    { id: 1, name: 'user1'},
    { id: 2, name: 'user2'},
    { id: 3, name: 'user3'}
];

app.get('/user', (req, res) => {
    res.send(users);
});

app.post('/user', (req, res) => {
    const schema = {
        name: Joi.string().min(3).max(20).required()
    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const user = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(user);
    res.send(user);
});

app.get('/user/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Cannot find user with given ID');
    res.send(user);
});

app.put('/user/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The user with the given ID was not found');

    const schema = {
        name: Joi.string().min(3).max(20).required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    user.name = req.body.name;
    res.send(user);
});

app.delete('/user/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Cannot find user with given ID');

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(user);
});

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

module.exports = server;