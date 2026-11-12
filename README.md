# ⚡ Lucacelli B2B Lead Gen, Clay.com, n8n & MCP Server (`v2.1.0`)

[![ocakciomursel-pixel/lucacelli-b2b-mcp-server MCP server](https://glama.ai/mcp/servers/ocakciomursel-pixel/lucacelli-b2b-mcp-server/badges/score.svg)](https://glama.ai/mcp/servers/ocakciomursel-pixel/lucacelli-b2b-mcp-server)
[![CI & MCP Protocol Verification](https://github.com/ocakciomursel-pixel/lucacelli-b2b-mcp-server/actions/workflows/ci.yml/badge.svg)](https://github.com/ocakciomursel-pixel/lucacelli-b2b-mcp-server/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-10b981.svg)](./LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-3b82f6.svg)](./package.json)

**Zero-dependency Model Context Protocol (MCP) Server + Streamable HTTP API + Direct CLI + Claude Code Skill + OpenAI Custom GPT Schema** exposing **34 verified B2B Lead Generation, Apollo Alternative, Google Maps, Skool MRR, Clutch Agencies, G2/Capterra Reviews, Wellfound Startups, SEC Form D Funded Startups, Google Ads Spy & SEO tools** powered by [Apify Cloud (`@lucacelli`)](https://apify.com/lucacelli).

> 🎁 **Run Free Every Month or Order Custom Verified Datasets:** Every Apify account automatically includes **\$5.00/month in free platform credit** — test up to **1,400 verified B2B leads every month for \$0.00** at our flat all-inclusive pricing (`$3.50–$4.50 / 1,000` records, 90% cheaper than Apollo/Clay, zero proxy add-on fees).
> - 🌐 **[Interactive Browser Cloud Playground, Token Injector & CSV Exporter](https://ocakciomursel-pixel.github.io/lucacelli-b2b-mcp-server/)**
> - 📥 **[Download Free 30-Row Live Sample CSV (SEC Funded Startups + Skool MRR + YC + US Agencies)](https://ocakciomursel-pixel.github.io/lucacelli-b2b-mcp-server/sample-leads-30-verified.csv)**
> - 🚀 **[Run Apollo, SEC Form D & Skool MRR Scrapers Live on Apify Cloud (`@lucacelli`)](https://apify.com/lucacelli)**
> - 📦 **[Order Custom 2,500+ Verified B2B Leads CSV Dataset (\$49 Done-For-You)](mailto:ocakciomursel@gmail.com?subject=Custom%202500%2B%20Verified%20B2B%20Leads%20CSV%20Order%20(%2449))**

---

## 🚀 1. Quickstart: Claude Desktop, Cursor, Windsurf & Cline (`stdio`)

No global install or build step needed. Get your free API token at [console.apify.com/settings/integrations](https://console.apify.com/settings/integrations) and paste into `claude_desktop_config.json` or `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "lucacelli-b2b": {
      "command": "npx",
      "args": ["-y", "github:ocakciomursel-pixel/lucacelli-b2b-mcp-server"],
      "env": {
        "APIFY_TOKEN": "apify_api_YOUR_TOKEN_HERE"
      }
    }
  }
}
```

---

## 🖥️ 2. Claude Code Skill, Terminal CLI & Streamable HTTP Server

### Install as a Claude Code / Cursor / Agent Skill (`SKILL.md`)
```bash
npx skills add ocakciomursel-pixel/lucacelli-b2b-mcp-server
```

### Direct Zero-Install CLI Mode (Bash / Cron / CI Pipelines)
```bash
export APIFY_TOKEN="apify_api_YOUR_TOKEN_HERE"

# List all 34 B2B tools & input schemas
npx -y github:ocakciomursel-pixel/lucacelli-b2b-mcp-server --list-tools

# Cookie-free Apollo alternative: enrich company domains & executives
npx -y github:ocakciomursel-pixel/lucacelli-b2b-mcp-server --call scrape_apollo_alternative_leads '{"domains":["linear.app","cal.com"]}'

# Scrape Skool communities with estimated Monthly Recurring Revenue (MRR)
npx -y github:ocakciomursel-pixel/lucacelli-b2b-mcp-server --call scrape_skool_communities_mrr '{"queries":["ai agency"],"maxCommunities":10}'

# Scrape Google Maps local business leads + website emails
npx -y github:ocakciomursel-pixel/lucacelli-b2b-mcp-server --call scrape_google_maps_leads '{"queries":["dental clinic"],"location":"Austin, TX","maxResultsPerQuery":20}'
```

### Self-Hosted Streamable HTTP MCP Server (Docker / Railway / Render)
```bash
npx -y github:ocakciomursel-pixel/lucacelli-b2b-mcp-server --http --port 8080
# Endpoints: POST /mcp | GET /health | GET /tools
```

### OpenAI ChatGPT Custom GPT Actions (1-URL Import)
Import all 34 scrapers into any **Custom GPT** via **Import from URL**:
```text
https://ocakciomursel-pixel.github.io/lucacelli-b2b-mcp-server/openapi.json
```
*(Set Authentication to **API Key → Bearer** and paste your `apify_api_...` token.)*

---

## 🧰 3. Complete 34 B2B MCP Tools & All-Inclusive Flat Pricing

| # | MCP Tool Name | Apify Cloud Actor | Flat Price | Description |
|---|---|---|---|---|
| 1 | `scrape_google_maps_leads` | [google-maps-scraper-places-emails-contacts-reviews](https://apify.com/lucacelli/google-maps-scraper-places-emails-contacts-reviews) | **$1.50 / 1k** | Extract local business leads from Google Maps including verified website emails (MX/SPF/DMARC), phone numbers, Instagram/LinkedIn/Facebook links, ad pixels, ratings, and reviews ($1.50/1k all-inclusive). |
| 2 | `enrich_b2b_company_domain` | [b2b-domain-contact-tech-enricher](https://apify.com/lucacelli/b2b-domain-contact-tech-enricher) | **$0.80 / 1k** | Enrich company domains with verified emails, phone numbers, LinkedIn/X/Instagram handles, DNS MX/SPF/DMARC records, and 38+ SaaS tech stack signatures ($0.80/1k). |
| 3 | `build_360_b2b_company_dossier` | [master-360-b2b-company-deep-dossier-enricher](https://apify.com/lucacelli/master-360-b2b-company-deep-dossier-enricher) | **$0.80 / 1k** | Generate a complete 360-degree B2B company intelligence dossier combining executive contacts, DNS/security posture, ad spend pixels, and tech stack ($0.80/1k). |
| 4 | `verify_bulk_emails_mx_syntax` | [bulk-email-verifier-mx-syntax](https://apify.com/lucacelli/bulk-email-verifier-mx-syntax) | **$0.50 / 1k** | Verify email lists in bulk for RFC syntax, live DNS MX records, disposable providers, role accounts, and cold-email deliverability readiness ($0.50/1k). |
| 5 | `generate_cold_email_icebreakers` | [cold-email-icebreaker-scraper](https://apify.com/lucacelli/cold-email-icebreaker-scraper) | **$0.50 / 1k** | Crawl prospect websites and generate personalized B2B cold email first-line icebreakers, value-prop summaries, and Clay/Instantly/Smartlead outreach hooks ($0.50/1k). |
| 6 | `detect_ad_spend_pixels` | [pixel-tag-manager-ad-spend-signal-detector](https://apify.com/lucacelli/pixel-tag-manager-ad-spend-signal-detector) | **$0.80 / 1k** | Detect active paid ad spend signals on any website including Meta Pixel, Google Ads/GTM, TikTok Pixel, LinkedIn Insight Tag, and Microsoft Clarity ($0.80/1k). |
| 7 | `detect_b2b_sales_funnel_calendly_hubspot` | [calendly-hubspot-booking-funnel-sales-stack-detector](https://apify.com/lucacelli/calendly-hubspot-booking-funnel-sales-stack-detector) | **$0.80 / 1k** | Detect Calendly, Chili Piper, HubSpot Meetings, Intercom, Drift, and high-intent B2B demo booking funnels across company websites ($0.80/1k). |
| 8 | `spy_shopify_store_products_contacts` | [shopify-store-product-contact-spy](https://apify.com/lucacelli/shopify-store-product-contact-spy) | **$0.50 / 1k** | Extract Shopify store product catalogs, live variant/SKU prices, stock availability, and merchant contact/social details ($0.50/1k). |
| 9 | `audit_technical_seo_broken_links` | [seo-technical-audit-broken-link-schema-analyzer](https://apify.com/lucacelli/seo-technical-audit-broken-link-schema-analyzer) | **$0.80 / 1k** | Run a 45-point technical SEO, broken link, JSON-LD Schema.org, OpenGraph, and security header audit on any URL ($0.80/1k). |
| 10 | `convert_website_to_ai_markdown_llms_txt` | [ai-ready-website-to-markdown-rag-crawler](https://apify.com/lucacelli/ai-ready-website-to-markdown-rag-crawler) | **$0.50 / 1k** | Convert webpages into clean LLM-ready Markdown, token-counted RAG chunks, and /llms.txt index entries ($0.50/1k). |
| 11 | `scrape_ats_job_board_hiring_signals` | [ats-job-board-hiring-signal-scraper](https://apify.com/lucacelli/ats-job-board-hiring-signal-scraper) | **$0.50 / 1k** | Extract active job openings, department hiring velocity, and B2B buying signals from Greenhouse, Lever, and Ashby career boards ($0.50/1k). |
| 12 | `find_restaurant_toast_opentable_leads` | [restaurant-toast-opentable-leads-scraper](https://apify.com/lucacelli/restaurant-toast-opentable-leads-scraper) | **$0.50 / 1k** | Detect Toast POS, Square, OpenTable, Resy, DoorDash, UberEats, and contact emails across restaurant websites ($0.50/1k). |
| 13 | `find_dental_medical_clinic_leads` | [dental-clinic-leads-scraper](https://apify.com/lucacelli/dental-clinic-leads-scraper) | **$0.50 / 1k** | Extract dental, medspa, and clinic contact emails, phones, and patient booking software (Zocdoc, NexHealth, LocalMed) ($0.50/1k). |
| 14 | `find_salon_medspa_mindbody_leads` | [salon-spa-fitness-studio-mindbody-vagaro-booking-spy](https://apify.com/lucacelli/salon-spa-fitness-studio-mindbody-vagaro-booking-spy) | **$0.80 / 1k** | Detect Mindbody, Vagaro, Boulevard, Fresha, Zenoti, and owner contact leads across salons, spas, and fitness studios ($0.80/1k). |
| 15 | `spy_chrome_firefox_extensions` | [chrome-extension-store-scraper](https://apify.com/lucacelli/chrome-extension-store-scraper) | **$0.50 / 1k** | Extract browser extension active users, ratings, versions, and publisher support emails by keyword or slug ($0.50/1k). |
| 16 | `extract_saas_competitor_pricing_matrix` | [saas-pricing-page-tier-feature-extractor](https://apify.com/lucacelli/saas-pricing-page-tier-feature-extractor) | **$0.80 / 1k** | Extract SaaS competitor pricing tiers, monthly/annual plan amounts, enterprise CTAs, and feature matrices ($0.80/1k). |
| 17 | `find_accounting_cpa_firm_leads` | [accounting-cpa-tax-advisory-firm-lead-enricher](https://apify.com/lucacelli/accounting-cpa-tax-advisory-firm-lead-enricher) | **$0.80 / 1k** | Extract partner emails, client portal software (CCH, Thomson Reuters, QuickBooks, Xero, Canopy), and phone numbers from CPA and accounting firm domains ($0.80/1k). |
| 18 | `find_solar_hvac_contractor_leads` | [solar-hvac-home-services-contractor-lead-enricher](https://apify.com/lucacelli/solar-hvac-home-services-contractor-lead-enricher) | **$0.80 / 1k** | Detect ServiceTitan, Housecall Pro, Jobber, financing widgets, license numbers, and owner contacts across home-service contractor websites ($0.80/1k). |
| 19 | `spy_hotel_direct_booking_ota_parity` | [hotel-resort-direct-booking-engine-ota-parity-spy](https://apify.com/lucacelli/hotel-resort-direct-booking-engine-ota-parity-spy) | **$0.80 / 1k** | Detect Cloudbeds, SynXis, Mews, SiteMinder, Booking.com/Expedia widgets, and hospitality GM/sales contacts across hotel websites ($0.80/1k). |
| 20 | `extract_b2b_case_studies_logos` | [b2b-case-study-customer-logo-testimonial-extractor](https://apify.com/lucacelli/b2b-case-study-customer-logo-testimonial-extractor) | **$0.80 / 1k** | Extract named enterprise customers, case study URLs, client logo walls, and testimonial quotes from competitor B2B websites ($0.80/1k). |
| 21 | `find_b2b_affiliate_partner_programs` | [b2b-partner-affiliate-program-commission-finder](https://apify.com/lucacelli/b2b-partner-affiliate-program-commission-finder) | **$0.80 / 1k** | Discover PartnerStack, Impact, Rewardful, FirstPromoter, Tolt, commission percentages, and partnership contacts on SaaS domains ($0.80/1k). |
| 22 | `spy_zapier_make_n8n_integrations` | [zapier-make-n8n-automation-integration-spy](https://apify.com/lucacelli/zapier-make-n8n-automation-integration-spy) | **$0.80 / 1k** | Detect public webhooks, REST API docs, Zapier apps, Make modules, n8n nodes, and developer relations contacts on SaaS domains ($0.80/1k). |
| 23 | `analyze_landing_page_cro_funnel` | [landing-page-cro-cta-form-funnel-analyzer](https://apify.com/lucacelli/landing-page-cro-cta-form-funnel-analyzer) | **$0.80 / 1k** | Audit landing page headlines, form field friction, CTA hierarchy, social proof density, and A/B testing scripts (VWO, Optimizely, PostHog) ($0.80/1k). |
| 24 | `scrape_substack_newsletter_authors` | [substack-newsletter-scraper](https://apify.com/lucacelli/substack-newsletter-scraper) | **$0.50 / 1k** | Extract Substack newsletter metadata, author profiles, recent post cadence, subscriber signals, and sponsorship contact links ($0.50/1k). |
| 25 | `scrape_vscode_marketplace_extensions` | [vscode-marketplace-scraper](https://apify.com/lucacelli/vscode-marketplace-scraper) | **$0.50 / 1k** | Extract VS Code extension install counts, ratings, GitHub repo links, and developer/company publisher details by keyword ($0.50/1k). |
| 26 | `scrape_apollo_alternative_leads` | [apollo-b2b-leads-email-finder](https://apify.com/lucacelli/apollo-b2b-leads-email-finder) | **$0.80 / 1k** | Cookie-free Apollo.io alternative: discover B2B companies by niche/city or enrich domains with verified emails, MX/SPF/DMARC status, executive names, LinkedIn URLs, phones, and 35+ tech stack signals ($0.80/1k). |
| 27 | `scrape_google_ads_transparency` | [google-ads-transparency-ad-spy-scraper](https://apify.com/lucacelli/google-ads-transparency-ad-spy-scraper) | **$0.75 / 1k** | Audit competitor domains or niches for Google Ads Transparency URLs, Google Ads Conversion IDs (AW-), GTM tags, Meta/LinkedIn/TikTok pixels, ads.txt sellers, and marketing contacts ($0.75/1k). |
| 28 | `scrape_g2_capterra_software_reviews` | [g2-capterra-software-reviews-scraper](https://apify.com/lucacelli/g2-capterra-software-reviews-scraper) | **$0.80 / 1k** | Extract SaaS product star ratings, review counts, G2 & Capterra listing URLs, pricing pages, free-trial flags, and verified vendor contact emails ($0.80/1k). |
| 29 | `scrape_wellfound_yc_startup_jobs` | [wellfound-startup-jobs-founders-scraper](https://apify.com/lucacelli/wellfound-startup-jobs-founders-scraper) | **$0.75 / 1k** | Extract actively hiring startups from Wellfound & Y Combinator directories with startup domains, team sizes, batch/stage, ATS career links, LinkedIn URLs, and verified contact emails ($0.75/1k). |
| 30 | `scrape_skool_communities_mrr` | [skool-community-creator-leads-scraper](https://apify.com/lucacelli/skool-community-creator-leads-scraper) | **$0.80 / 1k** | Scrape Skool.com communities by keyword: extract member counts, monthly subscription price ($/mo), estimated Monthly Recurring Revenue (MRR), ratings, external links, and creator emails ($0.80/1k). |
| 31 | `scrape_clutch_b2b_agency_leads` | [clutch-b2b-agency-leads-scraper](https://apify.com/lucacelli/clutch-b2b-agency-leads-scraper) | **$0.80 / 1k** | Extract B2B marketing, SEO, web design & software agencies from Clutch.co profiles with verified ratings, official domains, emails, phones, booking funnels, and LinkedIn URLs ($0.80/1k). |
| 32 | `scrape_cargurus_auto_dealer_leads` | [cargurus-auto-dealer-leads-scraper](https://apify.com/lucacelli/cargurus-auto-dealer-leads-scraper) | **$0.75 / 1k** | Extract auto dealerships by city/state with official dealer websites, CarGurus profile links, verified dealership emails, phone numbers, addresses, and automotive CRM/DMS software stack ($0.75/1k). |
| 33 | `scrape_funded_startups_sec_form_d` | [pitchbook-crunchbase-funded-startups-scraper](https://apify.com/lucacelli/pitchbook-crunchbase-funded-startups-scraper) | **$0.80 / 1k** | Find newly funded startups via real-time US SEC Form D filings + web enrichment: extract exact USD raised, founder/executive names, direct phone numbers, domains, and verified emails ($0.80/1k). |
| 34 | `scrape_whatnot_live_seller_leads` | [whatnot-ebay-live-seller-leads-scraper](https://apify.com/lucacelli/whatnot-ebay-live-seller-leads-scraper) | **$0.75 / 1k** | Discover Whatnot live auction sellers and collectible/sneaker/vintage resellers with profile URLs, categories, external storefronts, social handles, and contact emails ($0.75/1k). |

---

## 🔗 4. Built-in Chained Agency Prompts (`prompts/list`) & Clay / n8n Workflows

Includes **4 multi-actor MCP prompts** (`agency-ad-pixel-funnel-audit`, `local-business-outbound-campaign`, `hiring-signal-recruiter-outreach`, `saas-competitor-360-teardown`) plus ready-to-import JSON blueprints in [`./workflows/`](./workflows/) and [clay-n8n-b2b-enrichment-workflows](https://github.com/ocakciomursel-pixel/clay-n8n-b2b-enrichment-workflows):
- [`clay-25-column-master-waterfall.json`](./workflows/clay-25-column-master-waterfall.json) — Save **85%–98%** vs native Clay enrichment credits
- [`n8n-agency-ad-pixel-funnel-outbound.json`](./workflows/n8n-agency-ad-pixel-funnel-outbound.json) — 4x Chained Ad Pixel + Funnel + Contacts + Icebreaker
- [`n8n-local-vertical-hospitality-medspa-dental.json`](./workflows/n8n-local-vertical-hospitality-medspa-dental.json) — 4x Chained Google Maps + Vertical Spy + MX Verifier
- [`n8n-hiring-signal-recruiting-outbound.json`](./workflows/n8n-hiring-signal-recruiting-outbound.json) — 4x Chained ATS Jobs + Contacts + Icebreaker

## 🧪 Local Verification
```bash
npm test
```

## 📄 License
MIT © [Lucacelli Data Engineering (`@lucacelli`)](https://apify.com/lucacelli)
