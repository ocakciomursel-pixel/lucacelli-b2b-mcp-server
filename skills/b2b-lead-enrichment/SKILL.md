---
name: b2b-lead-enrichment
description: Scrape Google Maps business leads, enrich company domains with verified emails/phones/tech stacks, verify bulk email lists via DNS MX, spy on competitor ad pixels (Meta/Google/TikTok), extract SaaS pricing matrices, and generate personalized cold-email icebreakers via 25 ultra-low-cost Apify Cloud APIs ($5.00/mo free credit included).
---

# B2B Lead Generation, Domain Enrichment & Competitor Intelligence Skill (`@lucacelli`)

Use this skill whenever the user asks to find B2B leads, scrape local businesses from Google Maps, enrich company domains with verified emails and tech stacks, verify email lists via DNS MX, audit ad pixels or booking funnels, or generate personalized cold outreach.

## Quick Execution via Zero-Install CLI
Ensure `APIFY_TOKEN` is set in the environment (`https://console.apify.com/settings/integrations` — includes $5.00/mo free credit).

```bash
# List all 25 available B2B scrapers & enrichers
npx -y github:ocakciomursel-pixel/lucacelli-b2b-mcp-server --list-tools

# Enrich company domains
npx -y github:ocakciomursel-pixel/lucacelli-b2b-mcp-server --call enrich_b2b_company_domain '{"domains":["stripe.com","vercel.com"]}'

# Scrape Google Maps local business leads + website emails
npx -y github:ocakciomursel-pixel/lucacelli-b2b-mcp-server --call scrape_google_maps_leads '{"queries":["medspa"],"location":"Miami, FL","maxResultsPerQuery":25}'

# Verify bulk email deliverability (MX/syntax/disposable)
npx -y github:ocakciomursel-pixel/lucacelli-b2b-mcp-server --call verify_bulk_emails_mx_syntax '{"emails":["team@vercel.com"]}'
```

## MCP Configuration (`claude_desktop_config.json` / `.cursor/mcp.json`)
```json
{
  "mcpServers": {
    "lucacelli-b2b": {
      "command": "npx",
      "args": ["-y", "github:ocakciomursel-pixel/lucacelli-b2b-mcp-server"],
      "env": {
        "APIFY_TOKEN": "YOUR_APIFY_API_TOKEN"
      }
    }
  }
}
```
