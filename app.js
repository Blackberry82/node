const express = require('express');

const users = require('./dataBase');
const fileService = require('./services/file.service');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.get('/', (req, res) => {
//     console.log('REQUEST PROSESSED')
//     res.json('hello world')
// })
app.get('/users', async (req, res) => {
    const usersFromService = await fileService.getUsers();
    res.json(usersFromService);
});

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    if (Number.isNaN(+userId) || +userId < 0) {
        res.status(400).json('Wrong status');
        return;
    }
    const user = await fileService.getOneUser(+userId);

    if (!user) {
        res.status(404).json('User not found');
        return;
    }
    res.json(user)
});

app.post('/users', async (req, res) => {
    const {age, name} = req.body;
    if (Number.isNaN(+age) || age <= 0) {
        res.status(400).json('Wrong users age');
        return;
    }
  const user = await fileService.insertUser({age, name});
    res.status(201).json(user);
});

app.put('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    if (Number.isNaN(+userId) || +userId < 0) {
        res.status(400).json('Wrong user Id');
        return;

        const user = await fileService.updateUser(+userId, req.body);
        if (!user) {
            res.status(404).json('User not found');
            return;
        }
        res.status(201).json(user);
    }
});

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    if (Number.isNaN(+userId) || +userId < 0) {
    res.status(400).json('Wrong user Id');
    return;

    const user = await fileService.deleteOneUser(+userId);
    if (!user) {
        res.status(404).json('User not found');
        return;
    }
    res.sendStatus(204);
    }
} )


app.listen(5000, () => {
    console.log('App listen 5000');
});