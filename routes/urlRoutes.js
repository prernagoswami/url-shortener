const express = require('express');
const router = express.Router();
const URL = require('../models/urlModel');
const { nanoid } = require('nanoid');

// POST: Create Short URL
router.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const shortUrl = nanoid(8);

    const newUrl = await URL.create({ originalUrl, shortUrl });
    res.json({ shortUrl });
});

// GET: Redirect to Original URL
router.get('/:shortUrl', async (req, res) => {
    const urlData = await URL.findOne({ shortUrl: req.params.shortUrl });

    if (urlData) {
        urlData.clicks++;
        urlData.analytics.push({ ip: req.ip });
        await urlData.save();
        res.redirect(urlData.originalUrl);
    } else {
        res.status(404).json({ error: "URL not found" });
    }
});

module.exports = router;
