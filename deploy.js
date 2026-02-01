#!/usr/bin/env node

/**
 * FTP Deployment Script for weavrk.com
 * 
 * This script deploys the built React app to GoDaddy via FTP.
 * Credentials are read from .env file (not committed to git).
 */

const fs = require('fs');
const path = require('path');
const { Client } = require('basic-ftp');
require('dotenv').config();

const BUILD_DIR = path.join(__dirname, 'build');
const SKIP_BUILD = process.argv.includes('--skip-build');

// Load FTP credentials from environment variables
const FTP_CONFIG = {
  host: process.env.FTP_HOST || 'ftp.weavrk.com',
  user: process.env.FTP_USER || 'weavrk',
  password: process.env.FTP_PASS || '',
  secure: false, // Use explicit TLS if needed
};

const REMOTE_PATH = process.env.FTP_REMOTE_PATH || '/public_html';

async function deploy() {
  console.log('🚀 Starting deployment to weavrk.com...\n');

  // Check if build directory exists
  if (!fs.existsSync(BUILD_DIR)) {
    if (SKIP_BUILD) {
      console.error('❌ Build directory not found. Run "npm run build" first.');
      process.exit(1);
    } else {
      console.log('📦 Building project first...');
      const { execSync } = require('child_process');
      try {
        execSync('npm run build', { stdio: 'inherit' });
      } catch (error) {
        console.error('❌ Build failed!');
        process.exit(1);
      }
    }
  }

  // Validate credentials
  if (!FTP_CONFIG.password) {
    console.error('❌ FTP password not found in .env file!');
    console.error('   Please create a .env file with FTP credentials.');
    console.error('   See credentials.md for details.');
    process.exit(1);
  }

  const client = new Client();
  client.ftp.verbose = true;

  try {
    console.log(`📡 Connecting to ${FTP_CONFIG.host}...`);
    await client.access(FTP_CONFIG);

    console.log(`📂 Changing to remote directory: ${REMOTE_PATH}`);
    await client.cd(REMOTE_PATH);

    console.log('📤 Uploading files...');
    await client.uploadFromDir(BUILD_DIR);

    console.log('\n✅ Deployment successful!');
    console.log(`🌐 Your site should be live at: https://weavrk.com`);
  } catch (error) {
    console.error('\n❌ Deployment failed!');
    console.error(error.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();


