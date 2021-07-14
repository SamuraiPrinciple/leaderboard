# Leaderboard

## Setup

```bash
git clone https://github.com/SamuraiPrinciple/leaderboard.git
cd leaderboard/client
npm install
npm start
```

## Task

Modify `client/src/app/app.component.ts` so that it renders the leaderboard (names of top n players). The information should be obtained by making JSON rpc requests against the `/api/rpc` HTTP endpoint (see details below).

For example, if we assume that `getPlayer(i)` returns `{id: i, name: 'Player ${i}'}` and `getLeaderboard()` returns `[1, 3, 5, 2, 4]`, then the following should be rendered:

- Player 1
- Player 3
- Player 5
- Player 2
- Player 4

## getLeaderboard

Request:

```bash
curl -s -X POST http://localhost:4200/api/rpc --data-binary @- <<EOF
{
  "jsonrpc": "2.0",
  "method": "getLeaderboard",
  "params": [],
  "id": 12345
}
EOF
```

Example response:

```json
{ "jsonrpc": "2.0", "result": [5, 3, 2, 4, 1], "id": 12345 }
```

## getPlayer

Request:

```bash
curl -s -X POST http://localhost:4200/api/rpc --data-binary @- <<EOF
{
  "jsonrpc": "2.0",
  "method": "getPlayer",
  "params": [3],
  "id": 12345
}
EOF
```

Example response:

```json
{ "jsonrpc": "2.0", "result": { "name": "Third" }, "id": 12345 }
```
