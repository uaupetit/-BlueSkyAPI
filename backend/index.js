require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { BskyAgent } = require('@atproto/api');

const app = express();
app.use(cors());
const port = 3000;

const agent = new BskyAgent({ service: 'https://bsky.social' });

(async () => {
  try {
    await agent.login({
      identifier: process.env.BSKY_IDENTIFIER,
      password: process.env.BSKY_PASSWORD,
    });
    console.log('✅ Connecté à Bluesky');
  } catch (err) {
    console.error('❌ Connexion à Bluesky échouée :', err.message);
  }
})();

app.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Paramètre "q" requis' });

  try {
    const result = await agent.app.bsky.feed.searchPosts({ q });
    res.json(result.data.posts);
  } catch (err) {
    res.status(500).json({ error: 'Erreur de recherche', details: err.message });
  }
});

app.get('/users/:handle', async (req, res) => {
  const { handle } = req.params;

  try {
    const result = await agent.getProfile({ actor: handle });
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ error: 'Erreur profil utilisateur', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Serveur API lancé sur http://localhost:${port}`);
});
