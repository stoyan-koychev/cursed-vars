import temporary from '../data/temporary.json';
import emotional from '../data/emotional.json';
import passive_aggressive from '../data/passive_aggressive.json';
import honest from '../data/honest.json';
import threeAm from '../data/3am.json';
import enterprise from '../data/enterprise.json';
import unhinged from '../data/unhinged.json';
import overconfident from '../data/overconfident.json';
import intern from '../data/intern.json';
const categories = {
  temporary,
  emotional,
  passive_aggressive,
  honest,
  '3am': threeAm,
  enterprise,
  unhinged,
  overconfident,
  intern,
};

const variables = Object.entries(categories).flatMap(([category, names]) =>
  names.map((name) => ({ name, category }))
);

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== 'GET') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: CORS_HEADERS }
      );
    }

    if (url.pathname === '/api') {
      try {
        const entry = variables[Math.floor(Math.random() * variables.length)];
        return new Response(
          JSON.stringify({ name: entry.name, category: entry.category }),
          { status: 200, headers: CORS_HEADERS }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ error: 'Internal server error' }),
          { status: 500, headers: CORS_HEADERS }
        );
      }
    }

    return new Response(HTML, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  },
};

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>cursed-vars</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
      background: #0a0a0a;
      color: #e0e0e0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #ff6b6b;
    }
    .tagline {
      color: #666;
      margin-bottom: 3rem;
      font-size: 0.9rem;
    }
    .result {
      background: #1a1a2e;
      border: 1px solid #333;
      border-radius: 12px;
      padding: 2rem 3rem;
      text-align: center;
      min-width: 320px;
      height: 140px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
    }
    .var-name {
      font-size: 1.8rem;
      color: #7bed9f;
      word-break: break-all;
    }
    .category {
      margin-top: 0.75rem;
      font-size: 0.85rem;
      color: #666;
    }
    .category span {
      color: #ffa502;
      background: #2a2a1e;
      padding: 2px 8px;
      border-radius: 4px;
    }
    button {
      background: #ff6b6b;
      color: #0a0a0a;
      border: none;
      padding: 0.8rem 2.5rem;
      font-size: 1.1rem;
      font-family: inherit;
      font-weight: bold;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s;
    }
    button:hover { background: #ee5a5a; }
    button:active { transform: scale(0.97); }
    .api-hint {
      position: fixed;
      bottom: 1.5rem;
      color: #444;
      font-size: 0.75rem;
    }
    .api-hint code {
      color: #666;
      background: #1a1a1a;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .api-hint a {
      color: #555;
      text-decoration: none;
    }
    .api-hint a:hover {
      color: #888;
    }
  </style>
</head>
<body>
  <h1>cursed-vars</h1>
  <p class="tagline">naming variables is hard. we made it worse.</p>
  <div class="result">
    <div class="var-name" id="name">click the button</div>
    <div class="category" id="category"></div>
  </div>
  <button onclick="generate()">generate</button>
  <p class="api-hint">API: <code>GET /api</code> · <a href="https://github.com/stoyan-koychev/cursed-vars">GitHub</a></p>
  <script>
    async function generate() {
      try {
        const res = await fetch('/api');
        const data = await res.json();
        document.getElementById('name').textContent = data.name;
        document.getElementById('category').innerHTML = '<span>' + data.category + '</span>';
      } catch (e) {
        document.getElementById('name').textContent = 'sadVariable';
      }
    }
    generate();
  </script>
</body>
</html>`;
