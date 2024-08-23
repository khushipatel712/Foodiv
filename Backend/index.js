const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const multer = require('multer');
const upload = multer();
const path=require('path')

app.use(cookieParser());

const db = require('./config/db');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    exposedHeaders: ['x-filename']
}));

app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', subcategoryRoutes);
app.use('/api', menuItemRoutes);
app.use('/api', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
