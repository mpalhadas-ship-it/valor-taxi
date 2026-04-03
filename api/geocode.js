export default async function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: 'Parâmetro address obrigatório' });
  }

  const key = process.env.GOOGLE_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'GOOGLE_API_KEY não configurada' });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&region=br&language=pt-BR&key=${key}`;
    const r = await fetch(url);
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: 'Erro ao consultar Google Geocoding' });
  }
}
