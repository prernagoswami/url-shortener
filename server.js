const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const urlRoutes = require('./routes/urlRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
app.use(express.static(path.join(__dirname, 'views')));


// Middleware
app.use(express.json());

// Routes
app.use('/', urlRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
