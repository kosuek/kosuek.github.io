export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const content = body.content || '';
    const history = Array.isArray(body.history) ? body.history : [];
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured. Set it in Vercel project environment variables.',
      });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    const chatHistory = history
      .filter((message) => message && message.text && message.text.trim())
      .slice(-8)
      .map((message) => ({
        role: message.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: message.text }],
      }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: 'あなたは「壁打ち相手」のAIアシスタントです。ユーザーの発想や悩みを一緒に整理し、会話の流れを尊重してください。前の会話を踏まえて、次の一問を投げかけたり、具体例を出したり、ユーザーの考えを深掘りしてください。日本語で自然に丁寧に返答し、1つの質問に集中して相手の思考を促します。',
              },
            ],
          },
          contents: [
            ...chatHistory,
            {
              role: 'user',
              parts: [{ text: content }],
            },
          ],
          generationConfig: {
            temperature: 0.9,
            topP: 0.9,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    const rawText = await response.text();

    if (!response.ok) {
      let message = rawText;
      try {
        const parsed = JSON.parse(rawText);
        message = parsed?.error?.message || parsed?.error?.status || rawText;
      } catch (error) {
        // ignore parse error and use raw text
      }
      return res.status(response.status).json({ error: message || 'Gemini API request failed.' });
    }

    const data = JSON.parse(rawText);
    const text = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .join('')
      .trim();

    if (!text) {
      return res.status(500).json({ error: 'Gemini API returned empty content.' });
    }

    return res.status(200).json({ text });
  } catch (error) {
    return res.status(500).json({
      error: error?.message || 'Internal server error',
    });
  }
}
