const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
require('dotenv').config();

app.use(express.json());
app.use('/usuarios', userRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
