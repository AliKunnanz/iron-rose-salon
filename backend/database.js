const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'salon.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS stylists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    specialties TEXT,
    image_url TEXT,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    duration INTEGER DEFAULT 60,
    category TEXT,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS appointments (
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
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    category TEXT,
    image_url TEXT,
    in_stock INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT,
    message TEXT,
    read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const stylistCount = db.prepare('SELECT COUNT(*) as count FROM stylists').get();
if (stylistCount.count === 0) {
  const insertStylist = db.prepare(`
    INSERT INTO stylists (name, specialties, image_url)
    VALUES (?, ?, ?)
  `);
  
  insertStylist.run('Ashly', 'Cuts, Color, Highlights', 'ashly.jpg');
  insertStylist.run('Marcus', 'Cuts, Dreadlocks, Locs', 'marcus.jpg');
  insertStylist.run('Jasmine', 'Color, Highlights, Treatments', 'jasmine.jpg');
  insertStylist.run('Devon', 'Cuts, Styling, Kids', 'devon.jpg');
}

const serviceCount = db.prepare('SELECT COUNT(*) as count FROM services').get();
if (serviceCount.count === 0) {
  const insertService = db.prepare(`
    INSERT INTO services (name, description, price, duration, category)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  insertService.run('Clipper Cut', 'Quick clipper cut styling', 40, 30, 'Cuts');
  insertService.run('Short Cut', 'Haircut for short length hair', 50, 45, 'Cuts');
  insertService.run('Medium Cut', 'Haircut for medium length hair', 55, 60, 'Cuts');
  insertService.run('Long Cut', 'Haircut for long length hair', 60, 75, 'Cuts');
  insertService.run('Kids Cut', 'Haircut for children 12 and under', 25, 30, 'Cuts');
  insertService.run('All Over Color', 'Full color application', 160, 120, 'Color');
  insertService.run('Ombre', 'Gradient color effect', 160, 150, 'Color');
  insertService.run('Highlights', 'Partial or full highlights', 180, 180, 'Color');
  insertService.run('Dreadlock Maintenance', 'Hourly rate for loc maintenance', 100, 60, 'Specialty');
  insertService.run('Dreadlock Install', 'Consultation required', 0, 60, 'Specialty');
  insertService.run('Consultation', 'Discuss your needs with a stylist', 0, 30, 'Consultation');
}

const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get();
if (productCount.count === 0) {
  const insertProduct = db.prepare(`
    INSERT INTO products (name, description, price, category, image_url)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  const products = [
    { name: 'Professional Shampoo', description: 'Sulfate-free shampoo for all hair types', price: 24.99, category: 'Shampoo', image: 'shampoo.jpg' },
    { name: 'Moisturizing Conditioner', description: 'Deep conditioning for dry or damaged hair', price: 26.99, category: 'Conditioner', image: 'conditioner.jpg' },
    { name: 'Styling Pomade', description: 'Medium hold pomade for classic styles', price: 18.99, category: 'Styling', image: 'pomade.jpg' },
    { name: 'Texturizing Spray', description: 'Adds volume and texture to any style', price: 22.99, category: 'Styling', image: 'texturizer.jpg' },
    { name: 'Color Protect Serum', description: 'Shield your color from fading', price: 32.99, category: 'Color Care', image: 'serum.jpg' },
    { name: 'Heat Protection Spray', description: 'Protect hair from heat damage up to 450°F', price: 19.99, category: 'Heat Protection', image: 'heatprotect.jpg' },
    { name: 'Scalp Treatment Oil', description: 'Nourishing treatment for scalp health', price: 28.99, category: 'Treatment', image: 'scalp.jpg' },
    { name: 'Finishing Hairspray', description: 'Flexible hold finishing spray', price: 16.99, category: 'Styling', image: 'hairspray.jpg' },
  ];

  for (const p of products) {
    insertProduct.run(p.name, p.description, p.price, p.category, p.image);
  }
}

module.exports = db;
