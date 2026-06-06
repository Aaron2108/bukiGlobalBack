require('dotenv').config();
const express = require('express');
const cors = require('cors');
const servicesRoutes = require('./routes/services.routes');
const bookingsRoutes = require('./routes/bookings.routes');

const app = express();
const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/services', servicesRoutes);
app.use('/api/bookings', bookingsRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
