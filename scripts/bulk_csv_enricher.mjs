#!/usr/bin/env node
/**
 * Lucacelli High-Speed Bulk CSV B2B Domain Enricher + MX Email Verifier + Cold Email Icebreaker CLI
 * Usage:
 *   APIFY_TOKEN=apify_api_xxx node bulk_csv_enricher.mjs input_domains.csv enriched_output.csv
 */
import fs from 'node:fs';

const token = process.env.APIFY_TOKEN || process.env.APIFY_API_TOKEN || '';
if (!token) {
  console.error('Set APIFY_TOKEN first! Free $5/mo credit at: https://console.apify.com/settings/integrations');
  process.exit(1);
}

const inFile = process.argv[2] || 'domains.csv';
const outFile = process.argv[3] || 'enriched_leads.csv';
if (!fs.existsSync(inFile)) {
  console.error(`Input file not found: ${inFile}. Create a CSV with one domain per line (e.g. stripe.com).`);
  process.exit(1);
}

const domains = fs.readFileSync(inFile, 'utf8')
  .split(/\r?\n/)
  .map((l) => l.split(',')[0].trim().replace(/^["']|["']$/g, '').replace(/^https?:\/\//i, '').split('/')[0])
  .filter((d) => d && d.includes('.') && d.toLowerCase() !== 'domain');

async function callActor(slug, body) {
  const r = await fetch(`https://api.apify.com/v2/acts/lucacelli~${slug}/run-sync-get-dataset-items?token=${encodeURIComponent(token)}&memory=256&timeout=120`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return r.ok ? await r.json() : [];
}

const BATCH = 20;
const rows = [['domain', 'emails', 'phones', 'linkedin', 'techStack', 'adPixels', 'icebreaker']];

for (let i = 0; i < domains.length; i += BATCH) {
  const chunk = domains.slice(i, i + BATCH);
  console.log(`Enriching batch ${i + 1}-${Math.min(i + BATCH, domains.length)} of ${domains.length}...`);
  const [contacts, pixels, hooks] = await Promise.all([
    callActor('b2b-domain-contact-tech-enricher', { domains: chunk, crawlContactPages: true }),
    callActor('pixel-tag-manager-ad-spend-signal-detector', { domains: chunk }),
    callActor('cold-email-icebreaker-scraper', { domains: chunk }),
  ]);

  for (const d of chunk) {
    const c = contacts.find((x) => JSON.stringify(x).toLowerCase().includes(d.toLowerCase())) || {};
    const p = pixels.find((x) => JSON.stringify(x).toLowerCase().includes(d.toLowerCase())) || {};
    const h = hooks.find((x) => JSON.stringify(x).toLowerCase().includes(d.toLowerCase())) || {};
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    rows.push([
      esc(d),
      esc((c.emails || [c.email]).filter(Boolean).join('; ')),
      esc((c.phones || [c.phone]).filter(Boolean).join('; ')),
      esc(c.linkedin || c.socials?.linkedin || ''),
      esc((c.technologies || c.techStack || []).join('; ')),
      esc((p.detectedPixels || p.pixels || []).join('; ')),
      esc(h.icebreaker || h.firstLine || ''),
    ]);
  }
}

fs.writeFileSync(outFile, rows.map((r) => r.join(',')).join('\n'), 'utf8');
console.log(`Saved ${rows.length - 1} enriched leads to ${outFile}!`);
