const express = require('express');
const path = require('path');
const {usersRoutes} = require('./src/routes/index');

const app = express();

const port = 3000;
app.use('/users', usersRoutes);
app.use('/assets', express.static(path.join(__dirname, 'dist', 'assets')));

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`app is listening to port ${port}`)
});