#!/usr/bin/env node
/**
 * Lucacelli B2B Intelligence, Clay.com, n8n & Agency Outbound MCP Server (v2.0.0)
 * Zero-dependency Model Context Protocol (2025-03-26 / 2024-11-05) server + Streamable HTTP + CLI
 * Powered by 89+ Apify Cloud Actors (@lucacelli) — $0.50–$1.50 / 1,000 results all-inclusive ($5/mo free credit).
 *
 * Modes:
 *   1. MCP Stdio (default): npx -y github:ocakciomursel-pixel/lucacelli-b2b-mcp-server
 *   2. Streamable HTTP:     npx -y github:ocakciomursel-pixel/lucacelli-b2b-mcp-server --http
 *   3. Direct CLI:          npx -y github:ocakciomursel-pixel/lucacelli-b2b-mcp-server --call enrich_b2b_company_domain '{"domains":["stripe.com"]}'
 */
import readline from 'node:readline';
import http from 'node:http';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

export const SERVER_INFO = {
  name: 'lucacelli-b2b-mcp-server',
  version: '2.0.0',
};

const READ_ONLY_ANNOTATIONS = (title) => ({
  title,
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: true,
});

function toCleanDomain(val) {
  return String(val || '')
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .split('/')[0]
    .trim();
}

export const TOOLS = [
  {
    name: 'scrape_google_maps_leads',
    title: 'Google Maps B2B Email & Places Scraper',
    actor: 'lucacelli~google-maps-scraper-places-emails-contacts-reviews',
    pricePer1kUsd: 1.5,
    description:
      'Extract local business leads from Google Maps including verified website emails (MX/SPF/DMARC), phone numbers, Instagram/LinkedIn/Facebook links, ad pixels, ratings, and reviews ($1.50/1k all-inclusive).',
    inputSchema: {
      type: 'object',
      properties: {
        queries: {
          type: 'array',
          items: { type: 'string' },
          description: 'Search terms, e.g. ["dental clinic", "medspa", "roofing contractor"]',
        },
        location: {
          type: 'string',
          description: 'Optional city, state, or country filter, e.g. "Austin, TX, USA"',
        },
        maxResultsPerQuery: {
          type: 'integer',
          default: 20,
          description: 'Maximum places per search query (default 20)',
        },
      },
      required: ['queries'],
    },
    mapInput: (args = {}) => {
      const searchStringsArray = args.searchStringsArray || args.queries || ['dental clinic'];
      const payload = {
        searchStringsArray: Array.isArray(searchStringsArray) ? searchStringsArray : [String(searchStringsArray)],
        maxCrawledPlacesPerSearch: Number(args.maxCrawledPlacesPerSearch || args.maxResultsPerQuery || 20),
        scrapeContacts: true,
        scrapeSocialMediaProfiles: true,
      };
      if (args.locationQuery || args.location) payload.locationQuery = String(args.locationQuery || args.location);
      return payload;
    },
  },
  {
    name: 'enrich_b2b_company_domain',
    title: 'B2B Company Domain Email, Phone & Tech Enricher',
    actor: 'lucacelli~b2b-domain-contact-tech-enricher',
    pricePer1kUsd: 0.8,
    description:
      'Enrich company domains with verified emails, phone numbers, LinkedIn/X/Instagram handles, DNS MX/SPF/DMARC records, and 38+ SaaS tech stack signatures ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: {
          type: 'array',
          items: { type: 'string' },
          description: 'Company domains, e.g. ["stripe.com", "linear.app"]',
        },
      },
      required: ['domains'],
    },
    mapInput: (args = {}) => ({
      domains: (args.domains || args.urls || []).map(toCleanDomain).filter(Boolean),
      crawlContactPages: args.crawlContactPages !== false,
    }),
  },
  {
    name: 'build_360_b2b_company_dossier',
    title: '360° B2B Company Intelligence Dossier Builder',
    actor: 'lucacelli~master-360-b2b-company-deep-dossier-enricher',
    pricePer1kUsd: 0.8,
    description:
      'Generate a complete 360-degree B2B company intelligence dossier combining executive contacts, DNS/security posture, ad spend pixels, and tech stack ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'Target company domains' },
      },
      required: ['domains'],
    },
    mapInput: (args = {}) => ({
      domains: (args.domains || []).map(toCleanDomain).filter(Boolean),
    }),
  },
  {
    name: 'verify_bulk_emails_mx_syntax',
    title: 'Bulk Email MX, Syntax & Disposable Verifier',
    actor: 'lucacelli~bulk-email-verifier-mx-syntax',
    pricePer1kUsd: 0.5,
    description:
      'Verify email lists in bulk for RFC syntax, live DNS MX records, disposable providers, role accounts, and cold-email deliverability readiness ($0.50/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        emails: { type: 'array', items: { type: 'string' }, description: 'Email addresses to verify' },
      },
      required: ['emails'],
    },
  },
  {
    name: 'generate_cold_email_icebreakers',
    title: 'Cold Email Personalized Icebreaker Generator',
    actor: 'lucacelli~cold-email-icebreaker-scraper',
    pricePer1kUsd: 0.5,
    description:
      'Crawl prospect websites and generate personalized B2B cold email first-line icebreakers, value-prop summaries, and Clay/Instantly/Smartlead outreach hooks ($0.50/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: {
          type: 'array',
          items: { type: 'string' },
          description: 'Prospect domains, e.g. ["vercel.com", "supabase.com"]',
        },
      },
      required: ['domains'],
    },
    mapInput: (args = {}) => ({
      domains: (args.domains || args.urls || []).map(toCleanDomain).filter(Boolean),
    }),
  },
  {
    name: 'detect_ad_spend_pixels',
    title: 'Meta, Google, TikTok & LinkedIn Ad Pixel Spy',
    actor: 'lucacelli~pixel-tag-manager-ad-spend-signal-detector',
    pricePer1kUsd: 0.8,
    description:
      'Detect active paid ad spend signals on any website including Meta Pixel, Google Ads/GTM, TikTok Pixel, LinkedIn Insight Tag, and Microsoft Clarity ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'Domains to inspect for active ad pixels' },
      },
      required: ['domains'],
    },
    mapInput: (args = {}) => ({
      domains: (args.domains || args.urls || []).map(toCleanDomain).filter(Boolean),
    }),
  },
  {
    name: 'detect_b2b_sales_funnel_calendly_hubspot',
    title: 'Calendly, HubSpot & Chili Piper Sales Funnel Spy',
    actor: 'lucacelli~calendly-hubspot-booking-funnel-sales-stack-detector',
    pricePer1kUsd: 0.8,
    description:
      'Detect Calendly, Chili Piper, HubSpot Meetings, Intercom, Drift, and high-intent B2B demo booking funnels across company websites ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'Target B2B domains' },
      },
      required: ['domains'],
    },
    mapInput: (args = {}) => ({
      domains: (args.domains || args.urls || []).map(toCleanDomain).filter(Boolean),
    }),
  },
  {
    name: 'spy_shopify_store_products_contacts',
    title: 'Shopify Store Product Catalog & Merchant Contact Spy',
    actor: 'lucacelli~shopify-store-product-contact-spy',
    pricePer1kUsd: 0.5,
    description:
      'Extract Shopify store product catalogs, live variant/SKU prices, stock availability, and merchant contact/social details ($0.50/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        stores: {
          type: 'array',
          items: { type: 'string' },
          description: 'Shopify domains, e.g. ["gymshark.com", "allbirds.com"]',
        },
        maxProductsPerStore: { type: 'integer', default: 20, description: 'Max products per store (default 20)' },
      },
      required: ['stores'],
    },
    mapInput: (args = {}) => ({
      stores: (args.stores || args.domains || []).map(toCleanDomain).filter(Boolean),
      maxProductsPerStore: Number(args.maxProductsPerStore || 20),
      enrichStoreContacts: true,
    }),
  },
  {
    name: 'audit_technical_seo_broken_links',
    title: '45-Point Technical SEO, Schema & Broken Link Auditor',
    actor: 'lucacelli~seo-technical-audit-broken-link-schema-analyzer',
    pricePer1kUsd: 0.8,
    description:
      'Run a 45-point technical SEO, broken link, JSON-LD Schema.org, OpenGraph, and security header audit on any URL ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        urls: { type: 'array', items: { type: 'string' }, description: 'Full webpage URLs to audit' },
      },
      required: ['urls'],
    },
  },
  {
    name: 'convert_website_to_ai_markdown_llms_txt',
    title: 'Website to Clean AI Markdown & llms.txt Converter',
    actor: 'lucacelli~ai-ready-website-to-markdown-rag-crawler',
    pricePer1kUsd: 0.5,
    description:
      'Convert webpages into clean LLM-ready Markdown, token-counted RAG chunks, and /llms.txt index entries ($0.50/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        urls: { type: 'array', items: { type: 'string' }, description: 'Webpage URLs to convert to clean AI Markdown' },
      },
      required: ['urls'],
    },
  },
  {
    name: 'scrape_ats_job_board_hiring_signals',
    title: 'Greenhouse, Lever & Ashby ATS Hiring Signal Scraper',
    actor: 'lucacelli~ats-job-board-hiring-signal-scraper',
    pricePer1kUsd: 0.5,
    description:
      'Extract active job openings, department hiring velocity, and B2B buying signals from Greenhouse, Lever, and Ashby career boards ($0.50/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        companies: {
          type: 'array',
          items: { type: 'string' },
          description: 'Company slugs or career URLs, e.g. ["stripe", "figma"]',
        },
      },
      required: ['companies'],
    },
  },
  {
    name: 'find_restaurant_toast_opentable_leads',
    title: 'Restaurant Toast POS, OpenTable & Delivery Spy',
    actor: 'lucacelli~restaurant-toast-opentable-leads-scraper',
    pricePer1kUsd: 0.5,
    description:
      'Detect Toast POS, Square, OpenTable, Resy, DoorDash, UberEats, and contact emails across restaurant websites ($0.50/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'Restaurant domains to enrich' },
      },
      required: ['domains'],
    },
    mapInput: (args = {}) => ({ domains: (args.domains || []).map(toCleanDomain).filter(Boolean) }),
  },
  {
    name: 'find_dental_medical_clinic_leads',
    title: 'Dental & Medical Clinic Patient Booking Spy',
    actor: 'lucacelli~dental-clinic-leads-scraper',
    pricePer1kUsd: 0.5,
    description:
      'Extract dental, medspa, and clinic contact emails, phones, and patient booking software (Zocdoc, NexHealth, LocalMed) ($0.50/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'Clinic domains to enrich' },
      },
      required: ['domains'],
    },
    mapInput: (args = {}) => ({ domains: (args.domains || []).map(toCleanDomain).filter(Boolean) }),
  },
  {
    name: 'find_salon_medspa_mindbody_leads',
    title: 'Salon, MedSpa & Fitness Mindbody/Vagaro Spy',
    actor: 'lucacelli~salon-spa-fitness-studio-mindbody-vagaro-booking-spy',
    pricePer1kUsd: 0.8,
    description:
      'Detect Mindbody, Vagaro, Boulevard, Fresha, Zenoti, and owner contact leads across salons, spas, and fitness studios ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'Salon/MedSpa/Fitness studio domains' },
      },
      required: ['domains'],
    },
    mapInput: (args = {}) => ({ domains: (args.domains || []).map(toCleanDomain).filter(Boolean) }),
  },
  {
    name: 'spy_chrome_firefox_extensions',
    title: 'Chrome & Firefox Extension Store Publisher Spy',
    actor: 'lucacelli~chrome-extension-store-scraper',
    pricePer1kUsd: 0.5,
    description:
      'Extract browser extension active users, ratings, versions, and publisher support emails by keyword or slug ($0.50/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        queries: { type: 'array', items: { type: 'string' }, description: 'Keywords or extension slugs, e.g. ["seo", "crm"]' },
      },
      required: ['queries'],
    },
  },
  {
    name: 'extract_saas_competitor_pricing_matrix',
    title: 'SaaS Competitor Pricing Tier & Feature Matrix Spy',
    actor: 'lucacelli~saas-pricing-page-tier-feature-extractor',
    pricePer1kUsd: 0.8,
    description:
      'Extract SaaS competitor pricing tiers, monthly/annual plan amounts, enterprise CTAs, and feature matrices ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: {
          type: 'array',
          items: { type: 'string' },
          description: 'Competitor SaaS domains or pricing URLs, e.g. ["linear.app", "notion.so"]',
        },
      },
      required: ['domains'],
    },
    mapInput: (args = {}) => ({
      domains: (args.domains || args.pricingUrls || args.urls || []).map(toCleanDomain).filter(Boolean),
    }),
  },
  {
    name: 'find_accounting_cpa_firm_leads',
    title: 'Accounting, CPA & Tax Advisory Firm Lead Enricher',
    actor: 'lucacelli~accounting-cpa-tax-advisory-firm-lead-enricher',
    pricePer1kUsd: 0.8,
    description:
      'Extract partner emails, client portal software (CCH, Thomson Reuters, QuickBooks, Xero, Canopy), and phone numbers from CPA and accounting firm domains ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'Accounting or CPA firm domains' },
      },
      required: ['domains'],
    },
    mapInput: (args = {}) => ({ domains: (args.domains || []).map(toCleanDomain).filter(Boolean) }),
  },
  {
    name: 'find_solar_hvac_contractor_leads',
    title: 'Solar, HVAC, Roofing & Home Services Contractor Spy',
    actor: 'lucacelli~solar-hvac-home-services-contractor-lead-enricher',
    pricePer1kUsd: 0.8,
    description:
      'Detect ServiceTitan, Housecall Pro, Jobber, financing widgets, license numbers, and owner contacts across home-service contractor websites ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'Solar, HVAC, plumbing, or roofing domains' },
      },
      required: ['domains'],
    },
    mapInput: (args = {}) => ({ domains: (args.domains || []).map(toCleanDomain).filter(Boolean) }),
  },
  {
    name: 'spy_hotel_direct_booking_ota_parity',
    title: 'Hotel & Resort Direct Booking Engine & OTA Spy',
    actor: 'lucacelli~hotel-resort-direct-booking-engine-ota-parity-spy',
    pricePer1kUsd: 0.8,
    description:
      'Detect Cloudbeds, SynXis, Mews, SiteMinder, Booking.com/Expedia widgets, and hospitality GM/sales contacts across hotel websites ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'Hotel, resort, or boutique hospitality domains' },
      },
      required: ['domains'],
    },
    mapInput: (args = {}) => ({ domains: (args.domains || []).map(toCleanDomain).filter(Boolean) }),
  },
  {
    name: 'extract_b2b_case_studies_logos',
    title: 'B2B Competitor Case Study & Customer Logo Extractor',
    actor: 'lucacelli~b2b-case-study-customer-logo-testimonial-extractor',
    pricePer1kUsd: 0.8,
    description:
      'Extract named enterprise customers, case study URLs, client logo walls, and testimonial quotes from competitor B2B websites ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'Competitor B2B company domains' },
      },
      required: ['domains'],
    },
    mapInput: (args = {}) => ({ domains: (args.domains || []).map(toCleanDomain).filter(Boolean) }),
  },
  {
    name: 'find_b2b_affiliate_partner_programs',
    title: 'B2B SaaS Affiliate & Partner Program Finder',
    actor: 'lucacelli~b2b-partner-affiliate-program-commission-finder',
    pricePer1kUsd: 0.8,
    description:
      'Discover PartnerStack, Impact, Rewardful, FirstPromoter, Tolt, commission percentages, and partnership contacts on SaaS domains ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'SaaS or e-commerce domains' },
      },
      required: ['domains'],
    },
    mapInput: (args = {}) => ({ domains: (args.domains || []).map(toCleanDomain).filter(Boolean) }),
  },
  {
    name: 'spy_zapier_make_n8n_integrations',
    title: 'Zapier, Make.com & n8n Integration Ecosystem Spy',
    actor: 'lucacelli~zapier-make-n8n-automation-integration-spy',
    pricePer1kUsd: 0.8,
    description:
      'Detect public webhooks, REST API docs, Zapier apps, Make modules, n8n nodes, and developer relations contacts on SaaS domains ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'SaaS domains to inspect' },
      },
      required: ['domains'],
    },
    mapInput: (args = {}) => ({ domains: (args.domains || []).map(toCleanDomain).filter(Boolean) }),
  },
  {
    name: 'analyze_landing_page_cro_funnel',
    title: 'Landing Page CRO, CTA, Form Field & Funnel Analyzer',
    actor: 'lucacelli~landing-page-cro-cta-form-funnel-analyzer',
    pricePer1kUsd: 0.8,
    description:
      'Audit landing page headlines, form field friction, CTA hierarchy, social proof density, and A/B testing scripts (VWO, Optimizely, PostHog) ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        urls: { type: 'array', items: { type: 'string' }, description: 'Landing page URLs to analyze' },
      },
      required: ['urls'],
    },
  },
  {
    name: 'scrape_substack_newsletter_authors',
    title: 'Substack Newsletter & Creator Sponsor Lead Scraper',
    actor: 'lucacelli~substack-newsletter-scraper',
    pricePer1kUsd: 0.5,
    description:
      'Extract Substack newsletter metadata, author profiles, recent post cadence, subscriber signals, and sponsorship contact links ($0.50/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        publications: {
          type: 'array',
          items: { type: 'string' },
          description: 'Substack handles or URLs, e.g. ["lennysnewsletter", "pragmaticengineer"]',
        },
      },
      required: ['publications'],
    },
    mapInput: (args = {}) => ({
      publications: args.publications || args.queries || args.domains || ['pragmaticengineer'],
    }),
  },
  {
    name: 'scrape_vscode_marketplace_extensions',
    title: 'VS Code Marketplace Extension & Publisher Scraper',
    actor: 'lucacelli~vscode-marketplace-scraper',
    pricePer1kUsd: 0.5,
    description:
      'Extract VS Code extension install counts, ratings, GitHub repo links, and developer/company publisher details by keyword ($0.50/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        queries: {
          type: 'array',
          items: { type: 'string' },
          description: 'Search keywords, e.g. ["copilot", "mcp", "terraform"]',
        },
      },
      required: ['queries'],
    },
  },
];

export const PROMPTS = [
  {
    name: 'agency-ad-pixel-funnel-audit',
    description:
      '4-step chained B2B agency outbound playbook: Detect Ad Pixels -> Audit Demo Funnel -> Enrich Decision-Maker Contacts -> Generate Cold Email Icebreakers.',
    arguments: [
      {
        name: 'domains',
        description: 'Comma-separated target domains, e.g. "linear.app, vercel.com, loom.com"',
        required: true,
      },
    ],
  },
  {
    name: 'local-business-outbound-campaign',
    description:
      '3-step local lead generation pipeline: Scrape Google Maps -> Enrich Vertical Booking/POS Stack -> Verify Emails via DNS MX.',
    arguments: [
      { name: 'niche', description: 'Business niche, e.g. "dental clinic" or "medspa"', required: true },
      { name: 'city', description: 'City and state/country, e.g. "Austin, TX"', required: true },
    ],
  },
  {
    name: 'hiring-signal-recruiter-outreach',
    description:
      '3-step hiring-intent outbound workflow: Scrape Greenhouse/Lever/Ashby Jobs -> Enrich Company Contacts -> Draft Personalized Hiring Outreach.',
    arguments: [
      { name: 'companies', description: 'Comma-separated company slugs, e.g. "stripe, figma, anthropic"', required: true },
    ],
  },
  {
    name: 'saas-competitor-360-teardown',
    description:
      '3-step competitive intelligence teardown: Build 360° Dossier -> Extract Pricing Tiers -> Extract Named Case Study Customers.',
    arguments: [
      { name: 'competitors', description: 'Comma-separated competitor domains', required: true },
    ],
  },
];

export const RESOURCES = [
  {
    uri: 'lucacelli://catalog/25-b2b-tools',
    name: 'Lucacelli 25 B2B MCP Tools & Flat Pricing Catalog',
    description: 'Complete directory of all 25 @lucacelli Apify Cloud tools, input schemas, and $0.50–$1.50/1k flat pricing.',
    mimeType: 'application/json',
  },
  {
    uri: 'lucacelli://clay/http-api-waterfall-pack',
    name: 'Clay.com HTTP API Waterfall Configuration',
    description: 'Ready-to-paste Clay.com HTTP API enrichment endpoint templates saving 85–98% vs native Clay credits.',
    mimeType: 'application/json',
  },
  {
    uri: 'lucacelli://pricing/free-credit-and-pro-vault',
    name: 'Free $5/mo Apify Credit Setup & Pro Agency Automation Vault',
    description: 'Instructions to claim $5.00/mo free Apify compute credit (up to 10,000 leads/mo) plus n8n/Clay/MCP links.',
    mimeType: 'text/markdown',
  },
];

function formatToolsForMcp() {
  return TOOLS.map(({ name, title, description, inputSchema }) => ({
    name,
    title,
    description,
    inputSchema,
    annotations: READ_ONLY_ANNOTATIONS(title || name),
  }));
}

function buildPromptMessages(name, args = {}) {
  if (name === 'agency-ad-pixel-funnel-audit') {
    const domains = args.domains || 'linear.app, vercel.com';
    return [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `Run a 4-stage B2B agency qualification & outbound pipeline on [${domains}]:\n1. Call detect_ad_spend_pixels to see which companies spend on Meta/Google/LinkedIn/TikTok ads.\n2. Call detect_b2b_sales_funnel_calendly_hubspot to audit their demo booking stack.\n3. Call enrich_b2b_company_domain to extract verified emails & social links.\n4. Call generate_cold_email_icebreakers to write custom cold outreach hooks referencing their exact ad & funnel gaps.`,
        },
      },
    ];
  }
  if (name === 'local-business-outbound-campaign') {
    const niche = args.niche || 'dental clinic';
    const city = args.city || 'Austin, TX';
    return [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `Build a verified local B2B lead list for "${niche}" in "${city}":\n1. Call scrape_google_maps_leads with queries=["${niche}"] and location="${city}".\n2. Enrich discovered websites with the matching vertical spy tool (find_dental_medical_clinic_leads, find_salon_medspa_mindbody_leads, find_restaurant_toast_opentable_leads, or find_solar_hvac_contractor_leads).\n3. Call verify_bulk_emails_mx_syntax on all extracted emails and present a clean markdown table of verified leads.`,
        },
      },
    ];
  }
  if (name === 'hiring-signal-recruiter-outreach') {
    const companies = args.companies || 'stripe, figma';
    return [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `Execute a hiring-signal B2B outbound workflow for [${companies}]:\n1. Call scrape_ats_job_board_hiring_signals to map open roles and department growth.\n2. Call enrich_b2b_company_domain on their domains.\n3. Call generate_cold_email_icebreakers and draft tailored outreach tying their active hiring velocity to our solution.`,
        },
      },
    ];
  }
  const competitors = args.competitors || 'notion.so, coda.io';
  return [
    {
      role: 'user',
      content: {
        type: 'text',
        text: `Perform a 360° SaaS competitive teardown on [${competitors}]:\n1. Call build_360_b2b_company_dossier.\n2. Call extract_saas_competitor_pricing_matrix.\n3. Call extract_b2b_case_studies_logos and summarize pricing gaps, tech stack, and named enterprise customers.`,
      },
    },
  ];
}

function readMcpResource(uri) {
  if (uri === 'lucacelli://catalog/25-b2b-tools') {
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(
            TOOLS.map((t) => ({
              tool: t.name,
              actor: t.actor.replace('~', '/'),
              storeUrl: `https://apify.com/${t.actor.replace('~', '/')}`,
              pricePer1000ResultsUsd: t.pricePer1kUsd,
              description: t.description,
            })),
            null,
            2
          ),
        },
      ],
    };
  }
  if (uri === 'lucacelli://clay/http-api-waterfall-pack') {
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(
            {
              documentationUrl: 'https://ocakciomursel-pixel.github.io/lucacelli-b2b-mcp-server/',
              clayHttpMethod: 'POST',
              endpointTemplate:
                'https://api.apify.com/v2/acts/lucacelli~b2b-domain-contact-tech-enricher/run-sync-get-dataset-items?token=YOUR_APIFY_TOKEN&memory=256&timeout=90',
              sampleBody: { domains: ['{{domain}}'] },
              costComparison: '$0.50–$0.80 per 1,000 rows vs $75–$200 per 1,000 Clay credits (96% savings)',
            },
            null,
            2
          ),
        },
      ],
    };
  }
  return {
    contents: [
      {
        uri: 'lucacelli://pricing/free-credit-and-pro-vault',
        mimeType: 'text/markdown',
        text: [
          '# Lucacelli B2B Cloud Suite — Free $5/mo Credit & Agency Vault',
          '- **Free Apify Token ($5.00/mo included):** https://console.apify.com/settings/integrations',
          '- **89+ Live Apify Store Scrapers:** https://apify.com/lucacelli',
          '- **Interactive Token Injector & ROI Hub:** https://ocakciomursel-pixel.github.io/lucacelli-b2b-mcp-server/',
          '- **Clay & n8n Chained Workflows Repo:** https://github.com/ocakciomursel-pixel/clay-n8n-b2b-enrichment-workflows',
          '- **Pro Agency Vault ($19 One-Time):** https://buy.polar.sh/polar_cl_j0IOeyioFqMjcNZRqTo0Cqk6HGslU1yArpHUV47NP1j',
        ].join('\n'),
      },
    ],
  };
}

export async function callApifyActor(toolDef, rawArgs, overrideToken = '') {
  const token = overrideToken || process.env.APIFY_TOKEN || process.env.APIFY_API_TOKEN || '';
  const actorSlug = toolDef.actor;
  if (!token) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: [
            'Missing APIFY_TOKEN environment variable.',
            '1. Grab your free Apify API token ($5.00/month free credit = up to 10,000 leads/mo) at: https://console.apify.com/settings/integrations',
            `2. Or test visually on Apify Store: https://apify.com/${actorSlug.replace('~', '/')}`,
            '3. Interactive 1-Click Configurator: https://ocakciomursel-pixel.github.io/lucacelli-b2b-mcp-server/',
          ].join('\n'),
        },
      ],
    };
  }

  const mappedPayload = typeof toolDef.mapInput === 'function' ? toolDef.mapInput(rawArgs || {}) : rawArgs || {};
  const memoryMb = actorSlug.includes('google-maps') ? 1024 : 256;
  const url = `https://api.apify.com/v2/acts/${actorSlug}/run-sync-get-dataset-items?token=${encodeURIComponent(token)}&memory=${memoryMb}&timeout=120`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mappedPayload),
  });

  if (!res.ok) {
    const errText = await res.text();
    return {
      isError: true,
      content: [{ type: 'text', text: `Apify API error (${res.status}) for ${actorSlug}: ${errText.slice(0, 500)}` }],
    };
  }

  const items = await res.json();
  return {
    content: [{ type: 'text', text: JSON.stringify(items, null, 2) }],
  };
}

export async function handleJsonRpcRequest(msg, overrideToken = '') {
  if (!msg || typeof msg !== 'object') return null;

  // Notifications have no id
  if (msg.id === undefined || msg.id === null) {
    return null;
  }

  if (msg.method === 'initialize') {
    const clientProto = msg.params?.protocolVersion;
    const supported = ['2025-03-26', '2024-11-05'];
    const protocolVersion = supported.includes(clientProto) ? clientProto : '2024-11-05';
    return {
      jsonrpc: '2.0',
      id: msg.id,
      result: {
        protocolVersion,
        capabilities: {
          tools: { listChanged: false },
          prompts: { listChanged: false },
          resources: { subscribe: false, listChanged: false },
        },
        serverInfo: SERVER_INFO,
      },
    };
  }

  if (msg.method === 'ping') {
    return { jsonrpc: '2.0', id: msg.id, result: {} };
  }

  if (msg.method === 'tools/list') {
    return {
      jsonrpc: '2.0',
      id: msg.id,
      result: { tools: formatToolsForMcp() },
    };
  }

  if (msg.method === 'prompts/list') {
    return {
      jsonrpc: '2.0',
      id: msg.id,
      result: { prompts: PROMPTS },
    };
  }

  if (msg.method === 'prompts/get') {
    const pName = msg.params?.name;
    const found = PROMPTS.find((p) => p.name === pName);
    if (!found) {
      return { jsonrpc: '2.0', id: msg.id, error: { code: -32602, message: `Unknown prompt: ${pName}` } };
    }
    return {
      jsonrpc: '2.0',
      id: msg.id,
      result: {
        description: found.description,
        messages: buildPromptMessages(pName, msg.params?.arguments || {}),
      },
    };
  }

  if (msg.method === 'resources/list') {
    return {
      jsonrpc: '2.0',
      id: msg.id,
      result: { resources: RESOURCES },
    };
  }

  if (msg.method === 'resources/read') {
    const uri = msg.params?.uri;
    return {
      jsonrpc: '2.0',
      id: msg.id,
      result: readMcpResource(uri),
    };
  }

  if (msg.method === 'tools/call') {
    const toolName = msg.params?.name;
    const toolArgs = msg.params?.arguments || {};
    const found = TOOLS.find((t) => t.name === toolName);
    if (!found) {
      return {
        jsonrpc: '2.0',
        id: msg.id,
        error: { code: -32601, message: `Unknown tool: ${toolName}` },
      };
    }
    try {
      const result = await callApifyActor(found, toolArgs, overrideToken);
      return { jsonrpc: '2.0', id: msg.id, result };
    } catch (err) {
      return {
        jsonrpc: '2.0',
        id: msg.id,
        result: { isError: true, content: [{ type: 'text', text: `Execution failed: ${err.message}` }] },
      };
    }
  }

  return {
    jsonrpc: '2.0',
    id: msg.id,
    error: { code: -32601, message: `Method not found: ${msg.method}` },
  };
}

function startHttpServer(port) {
  const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Apify-Token, Mcp-Session-Id');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const reqUrl = new URL(req.url || '/', `http://localhost:${port}`);

    if (req.method === 'GET' && (reqUrl.pathname === '/' || reqUrl.pathname === '/health')) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          status: 'ok',
          server: SERVER_INFO.name,
          version: SERVER_INFO.version,
          transport: 'streamable-http',
          toolsCount: TOOLS.length,
          promptsCount: PROMPTS.length,
          resourcesCount: RESOURCES.length,
          mcpEndpoint: '/mcp',
          docs: 'https://ocakciomursel-pixel.github.io/lucacelli-b2b-mcp-server/',
        })
      );
      return;
    }

    if (req.method === 'GET' && reqUrl.pathname === '/tools') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ tools: formatToolsForMcp() }, null, 2));
      return;
    }

    if (req.method === 'POST' && (reqUrl.pathname === '/mcp' || reqUrl.pathname === '/')) {
      let body = '';
      for await (const chunk of req) body += chunk;
      try {
        const parsed = JSON.parse(body);
        const bearer = (req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
        const headerToken = req.headers['x-apify-token'] || reqUrl.searchParams.get('token') || bearer;
        if (Array.isArray(parsed)) {
          const responses = (await Promise.all(parsed.map((m) => handleJsonRpcRequest(m, headerToken)))).filter(Boolean);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(responses));
        } else {
          const reply = await handleJsonRpcRequest(parsed, headerToken);
          if (!reply) {
            res.writeHead(202);
            res.end();
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(reply));
          }
        }
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }));
      }
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found. Use POST /mcp or GET /health' }));
  });

  server.listen(port, () => {
    process.stderr.write(`Lucacelli B2B MCP Streamable HTTP server v${SERVER_INFO.version} listening on port ${port}\n`);
  });
  return server;
}

function startStdioServer() {
  const rl = readline.createInterface({ input: process.stdin, terminal: false });
  rl.on('line', async (line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    try {
      const msg = JSON.parse(trimmed);
      const reply = await handleJsonRpcRequest(msg);
      if (reply) process.stdout.write(JSON.stringify(reply) + '\n');
    } catch {
      // Ignore malformed lines per MCP stdio convention
    }
  });
}

async function runCli(argv) {
  if (argv.includes('--version') || argv.includes('-v')) {
    console.log(SERVER_INFO.version);
    return true;
  }
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log(
      [
        `${SERVER_INFO.name} v${SERVER_INFO.version} — 25 B2B Lead Gen, Scraping & Enrichment Tools`,
        '',
        'Usage:',
        '  lucacelli-b2b-mcp-server                          Start MCP stdio server (Claude/Cursor/Windsurf)',
        '  lucacelli-b2b-mcp-server --http [--port 8080]     Start Streamable HTTP MCP + REST server',
        '  lucacelli-b2b-mcp-server --list-tools             Print all 25 tools as JSON',
        "  lucacelli-b2b-mcp-server --call <tool> '<json>'   Execute a scraper tool directly from CLI",
      ].join('\n')
    );
    return true;
  }
  if (argv.includes('--list-tools')) {
    console.log(JSON.stringify(formatToolsForMcp(), null, 2));
    return true;
  }
  const callIdx = argv.indexOf('--call');
  if (callIdx !== -1) {
    const toolName = argv[callIdx + 1];
    const rawJson = argv[callIdx + 2] || '{}';
    const found = TOOLS.find((t) => t.name === toolName);
    if (!found) {
      console.error(`Unknown tool "${toolName}". Run with --list-tools to view all ${TOOLS.length} tools.`);
      process.exit(1);
    }
    const parsedArgs = JSON.parse(rawJson);
    const out = await callApifyActor(found, parsedArgs);
    console.log(out.content?.[0]?.text || JSON.stringify(out));
    if (out.isError) process.exit(1);
    return true;
  }
  if (argv.includes('--http') || process.env.MCP_TRANSPORT === 'http') {
    const portIdx = argv.indexOf('--port');
    const port = Number((portIdx !== -1 ? argv[portIdx + 1] : process.env.PORT) || 8080);
    startHttpServer(port);
    return true;
  }
  return false;
}

let isDirectExecution = false;
try {
  if (process.argv[1]) {
    isDirectExecution = import.meta.url === pathToFileURL(fs.realpathSync(process.argv[1])).href;
  }
} catch {}

if (isDirectExecution) {
  const handled = await runCli(process.argv.slice(2));
  if (!handled) {
    startStdioServer();
  }
}
