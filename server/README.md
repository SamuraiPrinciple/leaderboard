# Leaderboard

## getLeaderboard

curl -s -X POST http://localhost:4000 --data-binary @- <<EOF
{
  "jsonrpc": "2.0",
  "method": "getLeaderboard",
  "params": [],
  "id": 12345
}
EOF

## getPlayer

curl -s -X POST http://localhost:4000 --data-binary @- <<EOF
{
  "jsonrpc": "2.0",
  "method": "getPlayer",
  "params": [3],
  "id": 12345
}
EOF
