const db = require('./database');

db.exec('DROP TABLE IF EXISTS appointments');

db.exec(`
  CREATE TABLE appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    service_id INTEGER,
    stylist_id INTEGER,
    appointment_date DATE NOT NULL,
    appointment_time TEXT NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'confirmed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (stylist_id) REFERENCES stylists(id)
  )
`);

console.log('Appointments table recreated with correct schema');
