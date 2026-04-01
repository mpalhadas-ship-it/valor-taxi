export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { senha } = req.body;

  const senhaCorreta = process.env.PAINEL_SENHA;

  if (!senhaCorreta) {
    return res.status(500).json({ error: 'Variável de ambiente PAINEL_SENHA não configurada' });
  }

  if (senha === senhaCorreta) {
    return res.status(200).json({ ok: true });
  } else {
    setTimeout(() => res.status(401).json({ ok: false }), 500);
  }
}
