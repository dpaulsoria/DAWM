const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = [
    'http://localhost:8000',
]

const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed'));
        }
    }
}

app.use(cors(options));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(port, () => {
    console.log('Running on port {' + port + '}');
});