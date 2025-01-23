const items = require('../data/products.json');

const itemBasicMapper = (item) => ({
  id: item.id,
  category: item.category,
  title: item.title,
  price: item.price,
  images: item.images,
});

export default function handler(req, res) {
  const { categoryId = 0, offset = 0, q = '' } = req.query;

  const filtered = items
  .filter((o) => +categoryId === 0 || o.category === +categoryId)
  .filter((o) => o.title.toLowerCase().includes(q.toLowerCase()) || o.color?.toLowerCase() === q.toLowerCase())
  .slice(+offset, +offset + 6)
  .map(itemBasicMapper);

  res.status(200).json(filtered);
}