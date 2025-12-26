const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database simulation
const DB_FILE = path.join(__dirname, 'db.json');

// Initialize database
const initializeDB = () => {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      menu: [],
      categories: [
        { id: 'breakfast', name: 'Breakfast', icon: '🍳' },
        { id: 'lunch', name: 'Lunch', icon: '🍛' },
        { id: 'dinner', name: 'Dinner', icon: '🍽️' },
        { id: 'snacks', name: 'Snacks', icon: '🍟' },
        { id: 'beverages', name: 'Beverages', icon: '🥤' }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
  }
};

// Read database
const readDB = () => {
  initializeDB();
  const data = fs.readFileSync(DB_FILE);
  return JSON.parse(data);
};

// Write to database
const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// API Routes

// Get all menu items
app.get('/api/menu', (req, res) => {
  const db = readDB();
  res.json(db.menu);
});

// Get menu items by category
app.get('/api/menu/:category', (req, res) => {
  const db = readDB();
  const category = req.params.category;
  const items = db.menu.filter(item => item.category === category);
  res.json(items);
});

// Get all categories
app.get('/api/categories', (req, res) => {
  const db = readDB();
  res.json(db.categories);
});

// Add new menu item
app.post('/api/menu', upload.single('image'), (req, res) => {
  const db = readDB();
  const { name, description, price, category, available, type } = req.body;
  
  const newItem = {
    id: uuidv4(),
    name,
    description,
    price: parseFloat(price),
    category,
    available: available === 'true',
    type: type || 'veg',
    image: req.file ? `/uploads/${req.file.filename}` : null,
    rating: 4.5,
    createdAt: new Date().toISOString()
  };
  
  db.menu.push(newItem);
  writeDB(db);
  
  res.status(201).json(newItem);
});

// Update menu item
app.put('/api/menu/:id', upload.single('image'), (req, res) => {
  const db = readDB();
  const itemId = req.params.id;
  const { name, description, price, category, available, type } = req.body;
  
  const itemIndex = db.menu.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const updatedItem = {
    ...db.menu[itemIndex],
    name,
    description,
    price: parseFloat(price),
    category,
    available: available === 'true',
    type: type || 'veg'
  };
  
  if (req.file) {
    updatedItem.image = `/uploads/${req.file.filename}`;
  }
  
  db.menu[itemIndex] = updatedItem;
  writeDB(db);
  
  res.json(updatedItem);
});

// Delete menu item
app.delete('/api/menu/:id', (req, res) => {
  const db = readDB();
  const itemId = req.params.id;
  
  const itemIndex = db.menu.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  db.menu.splice(itemIndex, 1);
  writeDB(db);
  
  res.json({ message: 'Item deleted successfully' });
});

// Toggle item availability
app.patch('/api/menu/:id/toggle', (req, res) => {
  const db = readDB();
  const itemId = req.params.id;
  
  const itemIndex = db.menu.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  db.menu[itemIndex].available = !db.menu[itemIndex].available;
  writeDB(db);
  
  res.json(db.menu[itemIndex]);
});

// Get today's specials
app.get('/api/specials', (req, res) => {
  const db = readDB();
  const specials = db.menu
    .filter(item => item.available)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);
  res.json(specials);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  initializeDB();
});