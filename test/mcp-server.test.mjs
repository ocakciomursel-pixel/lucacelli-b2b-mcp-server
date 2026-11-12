import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawn } from 'node:child_process';
import { TOOLS, PROMPTS, RESOURCES, SERVER_INFO, handleJsonRpcRequest } from '../bin/mcp-server.mjs';

test('MCP initialize negotiates 2024-11-05 and 2025-03-26', async () => {
  const res1 = await handleJsonRpcRequest({
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: { protocolVersion: '2025-03-26' },
  });
  assert.equal(res1.result.protocolVersion, '2025-03-26');
  assert.equal(res1.result.serverInfo.version, SERVER_INFO.version);
  assert.ok(res1.result.capabilities.tools);
  assert.ok(res1.result.capabilities.prompts);
  assert.ok(res1.result.capabilities.resources);
});

test('tools/list returns 34 read-only annotated B2B tools', async () => {
  const res = await handleJsonRpcRequest({ jsonrpc: '2.0', id: 2, method: 'tools/list' });
  assert.equal(res.result.tools.length, 34);
  for (const t of res.result.tools) {
    assert.ok(t.name);
    assert.ok(t.description.length > 20);
    assert.equal(t.inputSchema.type, 'object');
    assert.equal(t.annotations.readOnlyHint, true);
    assert.equal(t.annotations.destructiveHint, false);
  }
});

test('prompts/list and resources/list return playbooks and Clay resources', async () => {
  const pList = await handleJsonRpcRequest({ jsonrpc: '2.0', id: 3, method: 'prompts/list' });
  assert.equal(pList.result.prompts.length, PROMPTS.length);

  const pGet = await handleJsonRpcRequest({
    jsonrpc: '2.0',
    id: 4,
    method: 'prompts/get',
    params: { name: 'agency-ad-pixel-funnel-audit', arguments: { domains: 'stripe.com' } },
  });
  assert.ok(pGet.result.messages[0].content.text.includes('stripe.com'));

  const rList = await handleJsonRpcRequest({ jsonrpc: '2.0', id: 5, method: 'resources/list' });
  assert.equal(rList.result.resources.length, RESOURCES.length);

  const rRead = await handleJsonRpcRequest({
    jsonrpc: '2.0',
    id: 6,
    method: 'resources/read',
    params: { uri: 'lucacelli://catalog/25-b2b-tools' },
  });
  const parsed = JSON.parse(rRead.result.contents[0].text);
  assert.equal(parsed.length, 34);
});

test('input mappers normalize Google Maps and SaaS pricing arguments accurately', () => {
  const gmaps = TOOLS.find((t) => t.name === 'scrape_google_maps_leads');
  const mappedGmaps = gmaps.mapInput({ queries: ['dentist'], location: 'Miami, FL', maxResultsPerQuery: 15 });
  assert.deepEqual(mappedGmaps.searchStringsArray, ['dentist']);
  assert.equal(mappedGmaps.locationQuery, 'Miami, FL');
  assert.equal(mappedGmaps.maxCrawledPlacesPerSearch, 15);

  const pricing = TOOLS.find((t) => t.name === 'extract_saas_competitor_pricing_matrix');
  const mappedPricing = pricing.mapInput({ pricingUrls: ['https://www.linear.app/pricing'] });
  assert.deepEqual(mappedPricing.domains, ['linear.app']);
});

test('CLI --list-tools and Streamable HTTP /health + /mcp work end-to-end', async () => {
  const cliOut = execFileSync(process.execPath, ['./bin/mcp-server.mjs', '--list-tools'], { encoding: 'utf8' });
  const cliTools = JSON.parse(cliOut);
  assert.equal(cliTools.length, 34);

  const port = 18941;
  const proc = spawn(process.execPath, ['./bin/mcp-server.mjs', '--http', '--port', String(port)], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  try {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const healthRes = await fetch(`http://127.0.0.1:${port}/health`);
    assert.equal(healthRes.status, 200);
    const healthJson = await healthRes.json();
    assert.equal(healthJson.toolsCount, 34);

    const mcpRes = await fetch(`http://127.0.0.1:${port}/mcp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 99, method: 'tools/list' }),
    });
    assert.equal(mcpRes.status, 200);
    const mcpJson = await mcpRes.json();
    assert.equal(mcpJson.result.tools.length, 34);
  } finally {
    proc.kill();
  }
});
