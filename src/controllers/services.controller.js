const db = require('../config/db');

exports.list = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM services ORDER BY id DESC');
    res.json(rows);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const { name, description, price, duration } = req.body;
    if (!name || price == null || duration == null) {
      return res.status(400).json({ error: 'Nombre, precio y duración son obligatorios' });
    }
    if (isNaN(Number(price)) || isNaN(Number(duration))) {
      return res.status(400).json({ error: 'Precio y duración deben ser numéricos' });
    }
    const [result] = await db.query(
      'INSERT INTO services (name, description, price, duration) VALUES (?, ?, ?, ?)',
      [name, description || '', price, duration]
    );
    res.status(201).json({ id: result.insertId, name, description, price, duration });
  } catch (e) { next(e); }
};
