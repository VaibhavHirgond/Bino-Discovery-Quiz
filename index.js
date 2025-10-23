// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/bino_quickshare';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log('Mongo connected'))
  .catch(err => console.error(err));

const shareSchema = new mongoose.Schema({
  message: String,
  origin: String,
  ip: String,
  createdAt: { type: Date, default: Date.now }
});
const Share = mongoose.model('Share', shareSchema);

app.post('/api/share', async (req, res) => {
  try {
    const { message, origin } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const share = new Share({ message, origin, ip });
    await share.save();
    const total = await Share.countDocuments();
    res.json({ ok: true, total });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const total = await Share.countDocuments();
    res.json({ total });
  } catch (e) {
    res.status(500).json({ ok: false });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
