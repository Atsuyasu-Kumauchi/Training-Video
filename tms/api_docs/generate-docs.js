#!/usr/bin/env node

/**
 * Generate static Swagger/OpenAPI documentation
 * 
 * This script fetches the Swagger JSON from the running API server
 * and saves it to the api_docs folder.
 * 
 * Usage:
 *   node api_docs/generate-docs.js
 *   node api_docs/generate-docs.js --port 3001
 *   node api_docs/generate-docs.js --host http://localhost:7001
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

const args = process.argv.slice(2);
const port = args.includes('--port') ? args[args.indexOf('--port') + 1] : '3001';
const host = args.includes('--host') ? args[args.indexOf('--host') + 1] : `http://localhost:${port}`;
// Swagger JSON endpoint - NestJS Swagger exposes JSON at /api-docs-json when UI is at /api-docs
const apiDocsPath = '/api-docs-json';

const outputDir = path.join(__dirname);
const jsonFile = path.join(outputDir, 'swagger.json');
const yamlFile = path.join(outputDir, 'swagger.yaml');

// Parse URL
const url = new URL(`${host}${apiDocsPath}`);
const client = url.protocol === 'https:' ? https : http;

console.log(`📚 Fetching Swagger documentation from ${host}${apiDocsPath}...`);

const request = client.get(`${host}${apiDocsPath}`, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.error(`❌ Error: Received status code ${res.statusCode}`);
      if (res.statusCode === 404) {
        console.error(`\n💡 The Swagger endpoint might not be configured.`);
        console.error(`   Make sure SwaggerModule.setup('api-docs', ...) is in main.ts`);
        console.error(`   Try accessing: ${host}/api-docs (should show Swagger UI)`);
      }
      console.error(`Response: ${data.substring(0, 200)}...`);
      process.exit(1);
    }

    try {
      const swaggerDoc = JSON.parse(data);

      // Save JSON
      fs.writeFileSync(jsonFile, JSON.stringify(swaggerDoc, null, 2));
      console.log(`✅ Generated: ${jsonFile}`);

      // Try to save YAML (requires js-yaml if you want this)
      console.log(`💡 Tip: Install 'js-yaml' to generate YAML format: npm install -g js-yaml`);
      console.log(`📄 JSON documentation saved successfully!`);
      console.log(`\n📖 You can view it at: ${host}/api-docs`);
    } catch (error) {
      console.error(`❌ Error parsing JSON:`, error.message);
      process.exit(1);
    }
  });
});

request.on('error', (error) => {
  console.error(`❌ Error fetching documentation:`, error.message);
  console.error(`\n💡 Troubleshooting:`);
  console.error(`   1. Make sure the API server is running:`);
  console.error(`      docker ps | grep tvms-api`);
  console.error(`   2. Check if Swagger is accessible:`);
  console.error(`      curl ${host}/api-docs`);
  console.error(`   3. Try starting the API:`);
  console.error(`      docker-compose up -d api`);
  console.error(`   4. Check API logs:`);
  console.error(`      docker logs tvms-api`);
  process.exit(1);
});

request.setTimeout(10000, () => {
  request.destroy();
  console.error(`❌ Request timeout. Is the API server running?`);
  process.exit(1);
});
