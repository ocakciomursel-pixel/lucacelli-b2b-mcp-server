#!/usr/bin/env node
/**
 * Lucacelli B2B Intelligence, SEO & E-Commerce MCP Server
 * Zero-dependency Model Context Protocol (2024-11-05) stdio server powered by Apify Cloud (@lucacelli).
 * Works instantly via: npx -y github:ocakciomursel-pixel/lucacelli-b2b-mcp-server
 */
import readline from 'node:readline';

const SERVER_INFO = {
  name: 'lucacelli-b2b-mcp-server',
  version: '1.2.0'
};

const TOOLS = [
  {
    name: 'scrape_google_maps_leads',
    actor: 'lucacelli~google-maps-scraper-places-emails-contacts-reviews',
    description: 'Extract local business leads from Google Maps including verified website emails, phone numbers, social links, ratings, and tech stack ($1.50/1k all-inclusive).',
    inputSchema: {
      type: 'object',
      properties: {
        queries: { type: 'array', items: { type: 'string' }, description: 'Search queries, e.g. ["dentists in Austin TX", "roofing contractors Miami"]' },
        maxResultsPerQuery: { type: 'integer', default: 20, description: 'Maximum places per query (default 20)' }
      },
      required: ['queries']
    }
  },
  {
    name: 'enrich_b2b_company_domain',
    actor: 'lucacelli~b2b-domain-contact-tech-enricher',
    description: 'Enrich company domains with verified emails, phone numbers, LinkedIn/X/Instagram handles, DNS MX/SPF/DMARC records, and 38+ SaaS tech stack signatures ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'Company domains, e.g. ["stripe.com", "linear.app"]' }
      },
      required: ['domains']
    }
  },
  {
    name: 'build_360_b2b_company_dossier',
    actor: 'lucacelli~master-360-b2b-company-deep-dossier-enricher',
    description: 'Generate a complete 360-degree B2B company intelligence dossier combining executive contacts, DNS/security posture, ad spend pixels, and tech stack ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'Target company domains' }
      },
      required: ['domains']
    }
  },
  {
    name: 'verify_bulk_emails_mx_syntax',
    actor: 'lucacelli~bulk-email-verifier-mx-syntax',
    description: 'Verify email lists in bulk for RFC syntax, live DNS MX records, disposable providers, role accounts, and cold-email deliverability readiness ($0.50/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        emails: { type: 'array', items: { type: 'string' }, description: 'Email addresses to verify' }
      },
      required: ['emails']
    }
  },
  {
    name: 'generate_cold_email_icebreakers',
    actor: 'lucacelli~cold-email-icebreaker-scraper',
    description: 'Crawl prospect websites and generate personalized B2B cold email first-line icebreakers, value-prop summaries, and Clay/Instantly outreach hooks ($0.50/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'Prospect domains, e.g. ["vercel.com", "supabase.com"]' }
      },
      required: ['domains']
    }
  },
  {
    name: 'detect_ad_spend_pixels',
    actor: 'lucacelli~pixel-tag-manager-ad-spend-signal-detector',
    description: 'Detect active paid ad spend signals on any website including Meta Pixel, Google Ads/GTM, TikTok Pixel, LinkedIn Insight Tag, and Microsoft Clarity ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'Domains to inspect for active ad pixels' }
      },
      required: ['domains']
    }
  },
  {
    name: 'detect_b2b_sales_funnel_calendly_hubspot',
    actor: 'lucacelli~calendly-hubspot-booking-funnel-sales-stack-detector',
    description: 'Detect Calendly, Chili Piper, HubSpot Meetings, Intercom, Drift, and high-intent B2B demo booking funnels across company websites ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'Target B2B domains' }
      },
      required: ['domains']
    }
  },
  {
    name: 'spy_shopify_store_products_contacts',
    actor: 'lucacelli~shopify-store-product-contact-spy',
    description: 'Extract Shopify store product catalogs, live variant/SKU prices, stock availability, and merchant contact/social details ($0.50/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        stores: { type: 'array', items: { type: 'string' }, description: 'Shopify domains, e.g. ["gymshark.com", "allbirds.com"]' },
        maxProductsPerStore: { type: 'integer', default: 20 }
      },
      required: ['stores']
    }
  },
  {
    name: 'audit_technical_seo_broken_links',
    actor: 'lucacelli~seo-technical-audit-broken-link-schema-analyzer',
    description: 'Run a 45-point technical SEO, broken link, JSON-LD Schema.org, OpenGraph, and security header audit on any URL ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        urls: { type: 'array', items: { type: 'string' }, description: 'Full webpage URLs to audit' }
      },
      required: ['urls']
    }
  },
  {
    name: 'convert_website_to_ai_markdown_llms_txt',
    actor: 'lucacelli~ai-ready-website-to-markdown-rag-crawler',
    description: 'Convert webpages into clean LLM-ready Markdown, token-counted RAG chunks, and /llms.txt index entries ($0.50/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        urls: { type: 'array', items: { type: 'string' }, description: 'Webpage URLs to convert to clean AI Markdown' }
      },
      required: ['urls']
    }
  },
  {
    name: 'scrape_ats_job_board_hiring_signals',
    actor: 'lucacelli~ats-job-board-hiring-signal-scraper',
    description: 'Extract active job openings, department hiring velocity, and B2B buying signals from Greenhouse, Lever, and Ashby career boards ($0.50/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        companies: { type: 'array', items: { type: 'string' }, description: 'Company slugs or career URLs, e.g. ["stripe", "figma"]' }
      },
      required: ['companies']
    }
  },
  {
    name: 'find_restaurant_toast_opentable_leads',
    actor: 'lucacelli~restaurant-toast-opentable-leads-scraper',
    description: 'Detect Toast POS, Square, OpenTable, Resy, DoorDash, UberEats, and contact emails across restaurant websites ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'Restaurant domains to enrich' }
      },
      required: ['domains']
    }
  },
  {
    name: 'find_dental_medical_clinic_leads',
    actor: 'lucacelli~dental-clinic-leads-scraper',
    description: 'Extract dental, medspa, and clinic contact emails, phones, and patient booking software (Zocdoc, NexHealth, LocalMed) ($0.50/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'Clinic domains to enrich' }
      },
      required: ['domains']
    }
  },
  {
    name: 'find_salon_medspa_mindbody_leads',
    actor: 'lucacelli~salon-spa-fitness-studio-mindbody-vagaro-booking-spy',
    description: 'Detect Mindbody, Vagaro, Boulevard, Fresha, Zenoti, and owner contact leads across salons, spas, and fitness studios ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        domains: { type: 'array', items: { type: 'string' }, description: 'Salon/MedSpa/Fitness studio domains' }
      },
      required: ['domains']
    }
  },
  {
    name: 'spy_chrome_firefox_extensions',
    actor: 'lucacelli~chrome-extension-store-scraper',
    description: 'Extract browser extension active users, ratings, versions, and publisher support emails by keyword or slug ($0.50/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        queries: { type: 'array', items: { type: 'string' }, description: 'Keywords or extension slugs, e.g. ["seo", "crm"]' }
      },
      required: ['queries']
    }
  },
  {
    name: 'extract_saas_competitor_pricing_matrix',
    actor: 'lucacelli~saas-pricing-page-tier-feature-extractor',
    description: 'Extract SaaS competitor pricing tiers, monthly/annual plan amounts, enterprise CTAs, and feature matrices ($0.80/1k).',
    inputSchema: {
      type: 'object',
      properties: {
        pricingUrls: { type: 'array', items: { type: 'string' }, description: 'Competitor pricing page URLs' }
      },
      required: ['pricingUrls']
    }
  }
];

function sendResponse(id, result) {
  process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, result }) + '\n');
}

function sendError(id, code, message) {
  process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } }) + '\n');
}

async function callApifyActor(actorSlug, args) {
  const token = process.env.APIFY_TOKEN || process.env.APIFY_API_TOKEN || '';
  if (!token) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: [
            'Missing APIFY_TOKEN environment variable.',
            '1. Get your free Apify API token ($5.00/month free credit included) at: https://console.apify.com/settings/integrations',
            `2. Or run the Actor directly on Apify Store: https://apify.com/${actorSlug.replace('~', '/')}`,
            '3. Add "env": { "APIFY_TOKEN": "apify_api_..." } to your MCP config.'
          ].join('\n')
        }
      ]
    };
  }

  const url = `https://api.apify.com/v2/acts/${actorSlug}/run-sync-get-dataset-items?token=${encodeURIComponent(token)}&memory=256&timeout=120`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(args || {})
  });

  if (!res.ok) {
    const errText = await res.text();
    return {
      isError: true,
      content: [{ type: 'text', text: `Apify API error (${res.status}) for ${actorSlug}: ${errText.slice(0, 500)}` }]
    };
  }

  const data = await res.json();
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(data, null, 2)
      }
    ]
  };
}

const rl = readline.createInterface({ input: process.stdin, terminal: false });

rl.on('line', async (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  let msg;
  try {
    msg = JSON.parse(trimmed);
  } catch {
    return;
  }

  const { id, method, params } = msg;
  if (id === undefined || id === null) return; // Notification (e.g. notifications/initialized)

  try {
    if (method === 'initialize') {
      sendResponse(id, {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: SERVER_INFO
      });
    } else if (method === 'ping') {
      sendResponse(id, {});
    } else if (method === 'tools/list') {
      sendResponse(id, {
        tools: TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema }))
      });
    } else if (method === 'tools/call') {
      const tool = TOOLS.find((t) => t.name === params?.name);
      if (!tool) {
        sendError(id, -32602, `Unknown tool: ${params?.name}`);
        return;
      }
      const result = await callApifyActor(tool.actor, params?.arguments || {});
      sendResponse(id, result);
    } else if (method === 'resources/list') {
      sendResponse(id, { resources: [] });
    } else if (method === 'prompts/list') {
      sendResponse(id, { prompts: [] });
    } else {
      sendError(id, -32601, `Method not found: ${method}`);
    }
  } catch (err) {
    sendError(id, -32603, err?.message || 'Internal MCP server error');
  }
});
