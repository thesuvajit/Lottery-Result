const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function createStaticServer(port) {
  const server = http.createServer(async (req, res) => {
    // Proxy /api/sambad/* to Sambad REST API
    if (req.url.startsWith('/api/sambad/')) {
      const subPath = req.url.replace(/^\/api\/sambad\//, '');
      const targetUrl = 'https://sambad.tv/wp-json/lottery-sambad/v1/' + subPath;
      try {
        const apiRes = await fetch(targetUrl, {
          headers: { 'User-Agent': 'LotteryResultApp/2.0' }
        });
        const body = await apiRes.text();
        res.writeHead(apiRes.status, {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Cache-Control': 'no-cache'
        });
        return res.end(body);
      } catch (e) {
        res.writeHead(502, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        return res.end(JSON.stringify({ error: 'Proxy failed', message: e.message }));
      }
    }

    // Direct Image Download proxy with Content-Disposition: attachment
    if (req.url.startsWith('/api/download')) {
      try {
        const parsedUrl = new URL(req.url, 'http://localhost');
        const targetUrl = parsedUrl.searchParams.get('url');
        const filename = parsedUrl.searchParams.get('filename') || parsedUrl.searchParams.get('name') || 'lottery-result.webp';
        if (!targetUrl) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          return res.end('Missing url parameter');
        }
        const fetchRes = await fetch(targetUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        if (!fetchRes.ok) {
          res.writeHead(fetchRes.status, { 'Content-Type': 'text/plain' });
          return res.end('Failed to fetch image upstream');
        }
        const buffer = Buffer.from(await fetchRes.arrayBuffer());
        const contentType = fetchRes.headers.get('content-type') || 'image/webp';
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Content-Length': buffer.length,
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=86400'
        });
        return res.end(buffer);
      } catch (err) {
        res.writeHead(502, { 'Content-Type': 'text/plain' });
        return res.end('Download proxy error: ' + err.message);
      }
    }

    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    if (reqPath === '/admin' || reqPath === '/admin/') reqPath = '/admin.html';
    
    let filePath = path.join(__dirname, reqPath);
    if (!filePath.startsWith(__dirname)) {
      res.writeHead(403);
      return res.end('Forbidden');
    }

    // Support clean URLs e.g. /admin -> /admin.html
    if (path.extname(filePath) === '' && fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(filePath).pipe(res);
    });
  });

  server.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}/ and http://127.0.0.1:${port}/`);
  });

  server.on('error', (e) => {
    console.warn(`Port ${port} unavailable: ${e.message}`);
  });

  return server;
}

// Start listeners on ports 8080, 5500, and 3000 to support all common local links
createStaticServer(8080);
createStaticServer(5500);
createStaticServer(3000);
