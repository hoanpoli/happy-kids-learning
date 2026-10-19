import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory cache for speech audio clips
const ttsCache = new Map<string, { audio: string; mimeType: string }>();

app.post('/api/tts', async (req, res) => {
  try {
    const { text, lang = 'vi' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    const cleanText = text.trim();
    const targetLang = lang === 'en' ? 'en' : 'vi';
    const cacheKey = `${targetLang}:${cleanText.toLowerCase()}`;

    if (ttsCache.has(cacheKey)) {
      const cached = ttsCache.get(cacheKey)!;
      return res.json({ audio: cached.audio, mimeType: cached.mimeType, cached: true });
    }

    // High quality standard voice fetch (Google standard pronunciation)
    // Avoids 429 RESOURCE_EXHAUSTED errors on free-tier Gemini API
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${targetLang}&client=tw-ob&q=${encodeURIComponent(
      cleanText
    )}`;

    const response = await fetch(ttsUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'audio/mpeg,audio/*;q=0.9,*/*;q=0.8'
      }
    });

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const base64Audio = Buffer.from(arrayBuffer).toString('base64');
      const result = { audio: base64Audio, mimeType: 'audio/mpeg' };
      ttsCache.set(cacheKey, result);
      return res.json({ ...result, cached: false });
    }

    // If external service is unavailable, inform frontend gracefully so client Web Speech API takes over
    return res.status(204).end();
  } catch (error) {
    // Graceful fallback to client synthesis without breaking server or throwing 429
    return res.status(204).end();
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
