const categories = require('../data/categories.json');

export default function handler(req, res) {
  res.status(200).json(categories);
}