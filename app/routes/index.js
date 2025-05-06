const express = require('express');
const userRoutes = require('./users');
const app = express();
app.use(express.json());
app.use('/usuarios', userRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = 8001;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
