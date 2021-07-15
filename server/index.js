const { createServer } = require('http');

const perm = (xs) =>
  xs.length === 1 ? xs : xs.map((_, i) => i).reduce((acc, i) => [...acc, ...perm(xs.filter((_, index) => index !== i)).map((ps) => [xs[i]].concat(ps))], []);

const getLeaderboard = (
  (leaderboards) => () =>
    leaderboards[Math.floor(Date.now() / 3000) % leaderboards.length]
)(perm(Array.from({ length: 5 }, (_, i) => i + 1)));

const getPlayer = (
  (players) => (playerId) =>
    players[playerId] || null
)(['First', 'Second', 'Third', 'Fourth', 'Fifth'].reduce((acc, name, index) => ({ ...acc, [index + 1]: { name } }), {}));

const rpc = (stringify, logger, portNum, handlers) =>
  createServer((req, res) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', async () => {
      const payload = chunks.length === 1 ? chunks[0] : Buffer.concat(chunks);
      let parsedPayload;
      try {
        if (Math.random() < parseFloat(req.headers['p-failure']) || 0) {
          throw { code: -1, message: 'Internal error' };
        }
        if (Math.random() < parseFloat(req.headers['p-timeout']) || 0) {
          return;
        }
        try {
          parsedPayload = JSON.parse(payload);
        } catch (error) {
          throw { code: -32700, message: 'Parse error' };
        }
        const { jsonrpc, method, params, id } = parsedPayload;
        if (jsonrpc !== '2.0' || typeof method !== 'string' || !Array.isArray(params)) {
          throw { code: -32602, message: 'Invalid params' };
        }
        const handler = handlers[method];
        if (!handler) {
          throw { code: -32601, message: 'Method not found' };
        }
        const result = await handler(...params);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(stringify({ jsonrpc, result, id }));
      } catch (error) {
        res.end(stringify({ jsonrpc: '2.0', error, id: parsedPayload?.id === undefined ? null : parsedPayload.id }));
        logger.error('Error %s invoking %s', JSON.stringify(error), payload);
        logger.error(error.message); //todo
      }
    });
  }).listen(portNum);

rpc(JSON.stringify, console, 4000, { getLeaderboard, getPlayer });
