require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const home = require("./routes/home") ;
const app = express();
connectDB();

app.use(cors({
    origin: ['http://localhost:5173', 'https://your-frontend-domain.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Handle preflight requests
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", home)
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
