const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/dashboard.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
