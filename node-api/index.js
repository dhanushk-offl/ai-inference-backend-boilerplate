const express = require('express');
const redis = require('./redisClient');
const runPython = require('./runPython');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30
});
app.use(limiter);

function hashInput(data) {
  return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
}

app.post('/predict', async (req, res) => {
  const key = hashInput(req.body);

  const cached = await redis.get(key);
  if (cached) return res.json({ output: JSON.parse(cached), cached: true });

  const result = await runPython(req.body);
  await redis.set(key, JSON.stringify(result), 'EX', 3600);
  res.json({ output: result, cached: false });
});

app.listen(5000, () => console.log("Node API running on port 5000"));
