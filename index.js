const express = require('express');

const { authRoute } = require('./src/routes/authRoutes');

require('dotenv').config();

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use('/auth', authRoute);

app.listen(port);
