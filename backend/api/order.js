export default function handler(req, res) {
  const { owner: { phone, address }, items } = req.body;

  if (typeof phone !== 'string' || typeof address !== 'string' || !Array.isArray(items)) {
    res.status(400).json({ error: 'Bad Request' });
    return;
  }

  if (
    !items.every(({ id, price, count }) =>
      typeof id === 'number' && id > 0 &&
      typeof price === 'number' && price > 0 &&
      typeof count === 'number' && count > 0
    )
  ) {
    res.status(400).json({ error: 'Bad Request' });
    return;
  }

  res.status(204).end();
}