# Contributing to Lucacelli B2B MCP Server

Contributions adding new workflow templates, client integrations, or MCP prompt playbooks are welcome!

## Development & Testing
Because this package has **zero external dependencies**, only Node.js `>=18.0.0` is required:

```bash
git clone https://github.com/ocakciomursel-pixel/lucacelli-b2b-mcp-server.git
cd lucacelli-b2b-mcp-server
npm test
```

## Pull Request Checklist
1. Ensure `npm test` passes cleanly on Node 20+.
2. Keep `bin/mcp-server.mjs` zero-dependency (standard `node:*` built-in modules only).
3. Include accurate `annotations` (`readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`) for any new tool.
