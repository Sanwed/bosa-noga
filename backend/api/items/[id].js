const items = require('../../data/products.json');

export default function handler(req, res) {
  const { id } = req.query;
  const item = items.find((o) => o.id === +id);

  if (!item) {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  res.status(200).json(item);
}