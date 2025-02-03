const items = require('../backend/data/products.json');
const topSaleIds = [66, 65, 73];

const itemBasicMapper = (item) => ({
  id: item.id,
  category: item.category,
  title: item.title,
  price: item.price,
  images: item.images,
});

export default function handler(req, res) {
  const topSales = items.filter((o) => topSaleIds.includes(o.id)).map(itemBasicMapper);
  res.status(200).json(topSales);
}