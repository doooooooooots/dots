export default function handler(req, res) {
  const { param } = req.query;
  const [from, to] = param;
  res.status(200).json({ from, to });
}
