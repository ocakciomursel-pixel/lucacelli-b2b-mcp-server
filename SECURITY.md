# Security Policy

## Architecture & Zero-Telemetry Guarantee
`lucacelli-b2b-mcp-server` is a **100% dependency-free** Node.js ESM package (`dependencies: {}` — zero supply-chain risk from third-party npm packages).

- **Credential Handling:** Your `APIFY_TOKEN` is read exclusively from process environment variables (`APIFY_TOKEN` or `APIFY_API_TOKEN`) or explicit HTTP `Authorization` headers when self-hosting Streamable HTTP mode, and sent strictly over TLS 1.3 to `https://api.apify.com/v2/`.
- **Read-Only Tool Execution:** Every MCP tool is annotated with `readOnlyHint: true` and `destructiveHint: false`. No local files, shells, or system states are mutated.

## Reporting a Vulnerability
Please report security issues privately via GitHub Security Advisories at:
https://github.com/ocakciomursel-pixel/lucacelli-b2b-mcp-server/security/advisories/new
