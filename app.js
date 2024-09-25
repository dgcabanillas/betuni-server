const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const betRoutes = require('./src/routes/bet.routes');
const userRoutes = require('./src/routes/user.routes');
const creditRoutes = require('./src/routes/credit.routes');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/bet', betRoutes);
app.use('/user', userRoutes);
app.use('/credit', creditRoutes);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
	console.log(`\nServidor corriendo en el puerto ${PORT}\n`);
});

module.exports = app;