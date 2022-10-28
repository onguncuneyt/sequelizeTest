require('dotenv').config();
require('./db');
const express = require('express');
const Router = require('./routes/index');
const app = express();

app.use(express.json());
app.use(Router);

app.listen(process.env.PORT, () => {
	console.log(`Server listening on Port ${process.env.PORT}`);
});
