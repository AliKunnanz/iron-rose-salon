const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
};

let transporter = null;
if (emailConfig.auth.user && emailConfig.auth.pass) {
  transporter = nodemailer.createTransport(emailConfig);
}

async function sendConfirmationEmail(appointment) {
  if (!transporter) {
    console.log('Email not configured - skipping confirmation email');
    return;
  }

  const service = db.prepare('SELECT name, price, duration FROM services WHERE id = ?').get(appointment.service_id);
  const stylist = db.prepare('SELECT name FROM stylists WHERE id = ?').get(appointment.stylist_id);

  const mailOptions = {
    from: '"Iron Rose Salon" <noreply@ironrosesalon.com>',
    to: appointment.customer_email,
    subject: 'Appointment Confirmed - Iron Rose Salon',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #d4a574; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Iron Rose Salon</h1>
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #8b4513;">Appointment Confirmed!</h2>
          <p>Thank you for booking with us, ${appointment.customer_name}!</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Appointment Details</h3>
            <p><strong>Service:</strong> ${service ? service.name : 'N/A'}</p>
            <p><strong>Stylist:</strong> ${stylist ? stylist.name : 'N/A'}</p>
            <p><strong>Date:</strong> ${appointment.appointment_date}</p>
            <p><strong>Time:</strong> ${appointment.appointment_time}</p>
            ${service && service.price > 0 ? `<p><strong>Price:</strong> $${service.price.toFixed(2)}</p>` : ''}
          </div>
          
          <p>Please arrive 5-10 minutes before your appointment.</p>
          <p>If you need to reschedule or cancel, please call us at (405) 673-7190.</p>
          
          <p style="margin-top: 30px;">See you soon!<br>The Iron Rose Team</p>
        </div>
        <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">3124 N. Classen BLVD, OKC, OK 73118 | (405) 673-7190</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to:', appointment.customer_email);
  } catch (error) {
    console.error('Failed to send email:', error.message);
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Iron Rose API is running' });
});

app.get('/api/services', (req, res) => {
  try {
    const services = db.prepare('SELECT * FROM services WHERE active = 1 ORDER BY category, name').all();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/stylists', (req, res) => {
  try {
    const { service } = req.query;
    let stylists;
    
    if (service) {
      stylists = db.prepare('SELECT * FROM stylists WHERE active = 1 ORDER BY name').all();
    } else {
      stylists = db.prepare('SELECT * FROM stylists WHERE active = 1 ORDER BY name').all();
    }
    
    res.json(stylists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/availability', (req, res) => {
  try {
    const { date, stylist_id } = req.query;
    
    if (!date) {
      return res.status(400).json({ error: 'Date is required' });
    }

    let bookedSlots;
    const params = [date];
    
    if (stylist_id) {
      bookedSlots = db.prepare(`
        SELECT appointment_time FROM appointments 
        WHERE appointment_date = ? AND stylist_id = ? AND status != 'cancelled'
      `).all(date, parseInt(stylist_id));
    } else {
      bookedSlots = db.prepare(`
        SELECT appointment_time FROM appointments 
        WHERE appointment_date = ? AND status != 'cancelled'
      `).all(date);
    }

    const bookedTimes = bookedSlots.map(b => b.appointment_time);

    const allSlots = [
      '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
      '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
    ];

    const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));

    res.json({
      date,
      stylist_id: stylist_id ? parseInt(stylist_id) : null,
      available_slots: availableSlots,
      booked_slots: bookedTimes
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/bookings', (req, res) => {
  try {
    const { customer_name, customer_email, customer_phone, service_id, stylist_id, appointment_date, appointment_time, notes } = req.body;

    if (!customer_name || !customer_email || !customer_phone || !service_id || !stylist_id || !appointment_date || !appointment_time) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingBooking = db.prepare(`
      SELECT id FROM appointments 
      WHERE appointment_date = ? AND appointment_time = ? AND stylist_id = ? AND status != 'cancelled'
    `).get(appointment_date, appointment_time, stylist_id);

    if (existingBooking) {
      return res.status(409).json({ error: 'This time slot is no longer available' });
    }

    const stmt = db.prepare(`
      INSERT INTO appointments (customer_name, customer_email, customer_phone, service_id, stylist_id, appointment_date, appointment_time, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(customer_name, customer_email, customer_phone, service_id, stylist_id, appointment_date, appointment_time, notes || '');

    const appointment = {
      id: result.lastInsertRowid,
      customer_name,
      customer_email,
      customer_phone,
      service_id: parseInt(service_id),
      stylist_id: parseInt(stylist_id),
      appointment_date,
      appointment_time,
      notes
    };

    sendConfirmationEmail(appointment);

    res.status(201).json({
      message: 'Appointment booked successfully!',
      booking_id: result.lastInsertRowid
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/bookings', (req, res) => {
  try {
    const { date, status } = req.query;
    
    let query = `
      SELECT 
        a.*,
        s.name as service_name, s.price as service_price, s.duration,
        st.name as stylist_name
      FROM appointments a
      LEFT JOIN services s ON a.service_id = s.id
      LEFT JOIN stylists st ON a.stylist_id = st.id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (date) {
      query += ' AND a.appointment_date = ?';
      params.push(date);
    }
    
    if (status) {
      query += ' AND a.status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY a.appointment_date DESC, a.appointment_time ASC';
    
    const bookings = db.prepare(query).all(...params);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/bookings/:id', (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    
    db.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(status, id);
    
    res.json({ message: 'Booking updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products ORDER BY category, name').all();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/messages', (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const stmt = db.prepare(`
      INSERT INTO messages (name, email, phone, service, message)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(name, email, phone || '', service || '', message || '');

    res.status(201).json({
      message: 'Message sent successfully!',
      id: result.lastInsertRowid
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/messages', (req, res) => {
  try {
    const messages = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/messages/:id/read', (req, res) => {
  try {
    db.prepare('UPDATE messages SET read = 1 WHERE id = ?').run(req.params.id);
    res.json({ message: 'Message marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/messages/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM messages WHERE id = ?').run(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Iron Rose API server running on http://localhost:${PORT}`);
  if (!transporter) {
    console.log('Note: Email not configured. Set SMTP_USER and SMTP_PASS environment variables to enable email confirmations.');
  }
});
