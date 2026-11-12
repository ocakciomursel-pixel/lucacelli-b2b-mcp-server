---
name: b2b-lead-enrichment
description: Scrape Google Maps business leads, enrich company domains with verified emails/phones/tech stacks, verify bulk email lists via DNS MX, spy on competitor ad pixels (Meta/Google/TikTok), extract SaaS pricing matrices, and generate personalized cold-email icebreakers via 25 ultra-low-cost Apify Cloud APIs ($5.00/mo free credit included).
---

# B2B Lead Generation, Domain Enrichment & Competitor Intelligence Skill (`@lucacelli`)

Use this skill whenever the user asks to find B2B leads, scrape local businesses from Google Maps, enrich a list of company domains with verified emails and social handles, verify email deliverability (MX/SPF/DMARC), spy on competitor ad pixels or booking funnels, audit technical SEO, or draft hyper-personalized cold outreach.

## Prerequisites
Set `APIFY_TOKEN` in your environment (every free Apify account includes **$5.00/month in free compute credit** = 3,300 to 10,000 verified leads/month at `$0.50–$1.50 / 1,000` records):
- Token URL: `https://console.apify.com/settings/integrations`

## Zero-Install CLI Usage (Works in Any Agent Shell)

List all 25 tools and JSON schemas:
```bash
npx -y github:ocakciomursel-pixel/lucacelli-b2b-mcp-server --list-tools
```

Execute any tool directly and receive clean JSON output:
```bash
# 1. Enrich B2B domains with emails, phones, social profiles & 38+ tech signatures ($0.80/1k)
npx -y github:ocakciomursel-pixel/lucacelli-b2b-mcp-server --call enrich_b2b_company_domain '{"domains":["stripe.com","linear.app"]}'

# 2. Scrape Google Maps local leads with website emails & social links ($1.50/1k)
npx -y github:ocakciomursel-pixel/lucacelli-b2b-mcp-server --call scrape_google_maps_leads '{"queries":["dental clinic"],"location":"Austin, TX","maxResultsPerQuery":20}'

# 3. Verify bulk email lists for syntax, DNS MX & disposable traps ($0.50/1k)
npx -y github:ocakciomursel-pixel/lucacelli-b2b-mcp-server --call verify_bulk_emails_mx_syntax '{"emails":["founders@linear.app","hello@vercel.com"]}'

# 4. Detect active Meta, Google Ads, TikTok & LinkedIn ad pixels ($0.80/1k)
npx -y github:ocakciomursel-pixel/lucacelli-b2b-mcp-server --call detect_ad_spend_pixels '{"domains":["gymshark.com","allbirds.com"]}'

# 5. Generate personalized cold-email first-line icebreakers ($0.50/1k)
npx -y github:ocakciomursel-pixel/lucacelli-b2b-mcp-server --call generate_cold_email_icebreakers '{"domains":["supabase.com","resend.com"]}'
```

## Chained Multi-Step Playbooks (Recommended)
1. **Local Agency Outbound:** `scrape_google_maps_leads` → vertical spy (`find_dental_medical_clinic_leads` / `find_salon_medspa_mindbody_leads` / `find_restaurant_toast_opentable_leads` / `find_solar_hvac_contractor_leads`) → `verify_bulk_emails_mx_syntax`.
2. **B2B Paid-Media Agency Audit:** `detect_ad_spend_pixels` → `detect_b2b_sales_funnel_calendly_hubspot` → `enrich_b2b_company_domain` → `generate_cold_email_icebreakers`.
3. **SaaS Competitive Teardown:** `build_360_b2b_company_dossier` → `extract_saas_competitor_pricing_matrix` → `extract_b2b_case_studies_logos`.

## Resources
- Interactive Token Injector & Clay/n8n Hub: https://ocakciomursel-pixel.github.io/lucacelli-b2b-mcp-server/
- Apify Store Catalog (89+ Live Actors): https://apify.com/lucacelli
