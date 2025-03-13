const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
    analytics: [{ timestamp: { type: Date, default: Date.now }, ip: String }]
});

module.exports = mongoose.model('URL', urlSchema);
