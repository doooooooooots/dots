export default function handler(req, res) {
  res.status(200).json({ from: 'me', with: 'love' });
}
