export default async function handler(req: any, res: any) {
  // Support both GET (query) and POST (body)
  const text = req.method === 'POST' ? req.body?.text : req.query?.text;
  const lang = req.method === 'POST' ? req.body?.lang : req.query?.lang;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const cleanText = text.trim();
    const targetLang = lang === 'en' ? 'en' : 'vi';

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
      return res.status(200).json({ audio: base64Audio, mimeType: 'audio/mpeg' });
    }

    return res.status(204).end();
  } catch (error) {
    return res.status(204).end();
  }
}
