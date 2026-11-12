# Changelog

All notable changes to `lucacelli-b2b-mcp-server` are documented in this file.

## [2.0.0] - 2026-11-12
### Added
- Expanded from **16 to 25** verified B2B Lead Generation, Vertical Tech Spy, E-Commerce, and Technical SEO MCP tools (`@lucacelli` on Apify Cloud).
- Added **MCP 2025-03-26 Streamable HTTP server mode** (`--http` / `MCP_TRANSPORT=http`, `POST /mcp`, `GET /health`, `GET /tools`).
- Added **Direct Terminal CLI mode** (`--list-tools`, `--call <tool> '<json>'`) for bash pipelines and AI coding agent skills.
- Added **4 Chained Agency Playbook MCP Prompts** (`prompts/list`, `prompts/get`) and **3 MCP Resources** (`resources/list`, `resources/read`).
- Added **MCP Tool Annotations** (`readOnlyHint: true`, `destructiveHint: false`) across all 25 tools.
- Added **Claude Code Skill (`SKILL.md`)**, **Subagent (`agents/b2b-outbound-enricher.md`)**, **Cursor Rule (`.cursor/rules/lucacelli-b2b.mdc`)**, and **25-Endpoint OpenAPI 3.1.0 Custom GPT Action Schema (`docs/openapi.json`)**.
- Added automated `node:test` test suite and GitHub Actions CI matrix (Node 20 & 22).

## [1.2.0] - 2026-11-11
### Added
- Initial public release with 16 zero-dependency MCP stdio tools, Clay.com HTTP API Waterfall Pack, and 7 chained n8n workflows.
