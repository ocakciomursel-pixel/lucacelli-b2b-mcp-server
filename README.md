# ⚡ Lucacelli B2B Intelligence, Clay.com, n8n & MCP Server (`@lucacelli`)

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![MCP Protocol](https://img.shields.io/badge/MCP-2024--11--05-blue)](https://modelcontextprotocol.io)
[![Apify Store](https://img.shields.io/badge/Apify_Store-89%2B_Live_APIs-orange)](https://apify.com/lucacelli)
[![Live Ecosystem Hub](https://img.shields.io/badge/Live_Hub-Interactive_Token_Injector-purple)](https://ocakciomursel-pixel.github.io/lucacelli-b2b-mcp-server/)

**Zero-dependency Model Context Protocol (MCP) server + Clay.com HTTP API Waterfall Pack + 7 Chained n8n Outbound Pipelines** powered by 89+ ultra-low-cost Apify Cloud Scrapers (`$0.50 – $1.50 / 1,000 records` all-inclusive, zero hidden add-ons, **$5.00/mo free Apify compute credit included**).

🌐 **Live Interactive Hub & 1-Click Token Injector:** **[https://ocakciomursel-pixel.github.io/lucacelli-b2b-mcp-server/](https://ocakciomursel-pixel.github.io/lucacelli-b2b-mcp-server/)**

---

## 🚀 Quickstart: Claude Desktop, Cursor, Windsurf & Cline (Zero Install)

No global `npm install` or build step required. Paste directly into `claude_desktop_config.json` or `.cursor/mcp.json`:

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

> 🎁 **Free $5.00/month API Credit:** Grab your free `APIFY_TOKEN` in 10 seconds at **[console.apify.com/settings/integrations](https://console.apify.com/settings/integrations)** — covers up to **6,250–10,000 enriched B2B records every month for $0.00**.

---

## 🛠️ 16 Built-In MCP Tools for AI Agents & RevOps

| MCP Tool Name | Underlying Cloud Actor (`@lucacelli`) | All-Inclusive Price |
| :--- | :--- | :---: |
| `scrape_google_maps_leads` | [`google-maps-scraper-places-emails-contacts-reviews`](https://apify.com/lucacelli/google-maps-scraper-places-emails-contacts-reviews) | **$1.50 / 1k** |
| `enrich_b2b_company_domain` | [`b2b-domain-contact-tech-enricher`](https://apify.com/lucacelli/b2b-domain-contact-tech-enricher) | **$0.80 / 1k** |
| `build_360_b2b_company_dossier` | [`master-360-b2b-company-deep-dossier-enricher`](https://apify.com/lucacelli/master-360-b2b-company-deep-dossier-enricher) | **$0.80 / 1k** |
| `verify_bulk_emails_mx_syntax` | [`bulk-email-verifier-mx-syntax`](https://apify.com/lucacelli/bulk-email-verifier-mx-syntax) | **$0.50 / 1k** |
| `generate_cold_email_icebreakers` | [`cold-email-icebreaker-scraper`](https://apify.com/lucacelli/cold-email-icebreaker-scraper) | **$0.50 / 1k** |
| `detect_ad_spend_pixels` | [`pixel-tag-manager-ad-spend-signal-detector`](https://apify.com/lucacelli/pixel-tag-manager-ad-spend-signal-detector) | **$0.80 / 1k** |
| `detect_b2b_sales_funnel_calendly_hubspot` | [`calendly-hubspot-booking-funnel-sales-stack-detector`](https://apify.com/lucacelli/calendly-hubspot-booking-funnel-sales-stack-detector) | **$0.80 / 1k** |
| `spy_shopify_store_products_contacts` | [`shopify-store-product-contact-spy`](https://apify.com/lucacelli/shopify-store-product-contact-spy) | **$0.50 / 1k** |
| `audit_technical_seo_broken_links` | [`seo-technical-audit-broken-link-schema-analyzer`](https://apify.com/lucacelli/seo-technical-audit-broken-link-schema-analyzer) | **$0.80 / 1k** |
| `convert_website_to_ai_markdown_llms_txt` | [`ai-ready-website-to-markdown-rag-crawler`](https://apify.com/lucacelli/ai-ready-website-to-markdown-rag-crawler) | **$0.50 / 1k** |
| `scrape_ats_job_board_hiring_signals` | [`ats-job-board-hiring-signal-scraper`](https://apify.com/lucacelli/ats-job-board-hiring-signal-scraper) | **$0.50 / 1k** |
| `find_restaurant_toast_opentable_leads` | [`restaurant-toast-opentable-leads-scraper`](https://apify.com/lucacelli/restaurant-toast-opentable-leads-scraper) | **$0.80 / 1k** |
| `find_dental_medical_clinic_leads` | [`dental-clinic-leads-scraper`](https://apify.com/lucacelli/dental-clinic-leads-scraper) | **$0.50 / 1k** |
| `find_salon_medspa_mindbody_leads` | [`salon-spa-fitness-studio-mindbody-vagaro-booking-spy`](https://apify.com/lucacelli/salon-spa-fitness-studio-mindbody-vagaro-booking-spy) | **$0.80 / 1k** |
| `spy_chrome_firefox_extensions` | [`chrome-extension-store-scraper`](https://apify.com/lucacelli/chrome-extension-store-scraper) | **$0.50 / 1k** |
| `extract_saas_competitor_pricing_matrix` | [`saas-pricing-page-tier-feature-extractor`](https://apify.com/lucacelli/saas-pricing-page-tier-feature-extractor) | **$0.80 / 1k** |

---

## 🧱 Ready-to-Import Clay.com, n8n, Make.com & Google Sheets Workflows (`/workflows`)

All ready-made blueprints live inside [`/workflows`](./workflows):

1. **[`clay-http-api-waterfall-pack.json`](./workflows/clay-http-api-waterfall-pack.json)** — 8 Clay.com `"HTTP API"` enrichment columns (replace expensive 4-credit Clay waterfalls with `$0.50–$0.80/1k` direct API calls).
2. **[`n8n-google-maps-cold-email-pipeline.json`](./workflows/n8n-google-maps-cold-email-pipeline.json)** — 3x Chained Google Maps $\rightarrow$ Domain Contact Enricher $\rightarrow$ Bulk DNS MX Verifier.
3. **[`n8n-agency-ad-pixel-funnel-outbound.json`](./workflows/n8n-agency-ad-pixel-funnel-outbound.json)** — 4x Chained Ad Pixel Spy $\rightarrow$ Calendly/HubSpot Funnel $\rightarrow$ Domain Contacts $\rightarrow$ AI Cold Email Icebreaker.
4. **[`n8n-local-vertical-hospitality-medspa-dental.json`](./workflows/n8n-local-vertical-hospitality-medspa-dental.json)** — 4x Local Vertical SaaS Outbound (Google Maps + Dental Zocdoc/NexHealth + MedSpa Mindbody + Email MX Verifier).
5. **[`n8n-hiring-signal-recruiting-outbound.json`](./workflows/n8n-hiring-signal-recruiting-outbound.json)** — 4x ATS Hiring Velocity (Greenhouse/Lever/Ashby) $\rightarrow$ Executive Finder $\rightarrow$ Contacts $\rightarrow$ Cold Email Hook.
6. **[`n8n-shopify-woocommerce-competitor-spy.json`](./workflows/n8n-shopify-woocommerce-competitor-spy.json)** — 3x Daily Shopify + WooCommerce + SaaS Pricing Matrix Competitor Monitor.
7. **[`n8n-seo-audit-ai-markdown-rag.json`](./workflows/n8n-seo-audit-ai-markdown-rag.json)** — 3x 45-Point Technical SEO Audit + XML Sitemap Freshness + Clean AI Markdown / `llms.txt`.
8. **[`make-com-google-maps-b2b-blueprint.json`](./workflows/make-com-google-maps-b2b-blueprint.json)** & **[`google-sheets-lead-automation.gs`](./workflows/google-sheets-lead-automation.gs)**.

---

## 💼 Turnkey Pro Agency Vault ($19 One-Time)
Want the complete pre-configured Agency Outbound & Competitive Intelligence Vault with priority template support?
👉 **[Unlock Pro Agency Vault ($19 USD via Polar/Stripe)](https://buy.polar.sh/polar_cl_j0IOeyioFqMjcNZRqTo0Cqk6HGslU1yArpHUV47NP1j)**

---

## 📜 License
MIT © [Lucacelli Data Engineering](https://apify.com/lucacelli)
