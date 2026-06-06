const db = require('../config/db');

exports.list = async (req, res, next) => {
  try {
    const [rows] = await db.query(`
      SELECT b.*, s.name AS service_name, s.price AS service_price, s.duration AS service_duration
      FROM bookings b
      INNER JOIN services s ON s.id = b.service_id
      ORDER BY b.id DESC
    `);
    res.json(rows);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const { client_name, client_email, service_id, booking_date, booking_time } = req.body;
    if (!client_name || !client_email || !service_id || !booking_date || !booking_time) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(client_email)) {
      return res.status(400).json({ error: 'Correo inválido' });
    }
    const [svc] = await db.query('SELECT id FROM services WHERE id = ?', [service_id]);
    if (svc.length === 0) {
      return res.status(404).json({ error: 'Servicio inexistente' });
    }
    const [result] = await db.query(
      `INSERT INTO bookings (client_name, client_email, service_id, booking_date, booking_time, status)
       VALUES (?, ?, ?, ?, ?, 'pending')`,
      [client_name, client_email, service_id, booking_date, booking_time]
    );
    res.status(201).json({ id: result.insertId, client_name, client_email, service_id, booking_date, booking_time, status: 'pending' });
  } catch (e) { next(e); }
};
