require('dotenv').config();

const express = require('express');
const cors = require('cors');

require('./firebase-admin');

const app = express();
const forgotPasswordRoute = require('./forgot-password');

app.use(cors());

app.use(express.json());
app.use('/api', forgotPasswordRoute);

app.get('/', (req, res) => {
	res.send('Backend Server Running Successfully');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});