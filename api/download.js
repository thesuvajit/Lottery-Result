// Vercel Serverless Function: Direct Image Download with Content-Disposition
export default async function handler(req, res) {
  const { url, filename = 'lottery-result.webp', name } = req.query;
  const targetUrl = url;
  const downloadName = filename || name || 'lottery-result.webp';

  if (!targetUrl) {
    return res.status(400).send('Missing url parameter');
  }

  try {
    const upstreamRes = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!upstreamRes.ok) {
      return res.status(upstreamRes.status).send('Failed to fetch image upstream');
    }

    const arrayBuffer = await upstreamRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = upstreamRes.headers.get('content-type') || 'image/webp';

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${downloadName}"`);
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400');

    return res.status(200).send(buffer);
  } catch (error) {
    return res.status(502).send('Download proxy failed: ' + error.message);
  }
}
