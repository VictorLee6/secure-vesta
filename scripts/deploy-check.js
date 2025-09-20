#!/usr/bin/env node

/**
 * Deployment Check Script for Secure Vesta
 * This script verifies that all necessary components are in place for deployment
 */

import fs from 'fs';
import path from 'path';

console.log('🔍 Secure Vesta Deployment Check\n');

// Check if required files exist
const requiredFiles = [
  'package.json',
  'vite.config.ts',
  'vercel.json',
  'src/App.tsx',
  'src/components/WalletProvider.tsx',
  'src/components/WalletButton.tsx',
  'src/lib/wagmi.ts',
  'contracts/SecureVesta.sol',
  'env.example'
];

console.log('📁 Checking required files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check package.json for required dependencies
console.log('\n📦 Checking dependencies...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = [
  '@rainbow-me/rainbowkit',
  'wagmi',
  'viem',
  'react',
  'react-dom'
];

requiredDeps.forEach(dep => {
  if (packageJson.dependencies[dep]) {
    console.log(`✅ ${dep} - ${packageJson.dependencies[dep]}`);
  } else {
    console.log(`❌ ${dep} - MISSING`);
    allFilesExist = false;
  }
});

// Check for lovable references
console.log('\n🧹 Checking for Lovable references...');
const filesToCheck = [
  'README.md',
  'package.json',
  'src/App.tsx'
];

let lovableReferencesFound = false;
filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.toLowerCase().includes('lovable')) {
      console.log(`⚠️  ${file} contains Lovable references`);
      lovableReferencesFound = true;
    } else {
      console.log(`✅ ${file} - No Lovable references`);
    }
  }
});

// Check environment variables
console.log('\n🔧 Checking environment configuration...');
if (fs.existsSync('env.example')) {
  console.log('✅ env.example exists');
} else {
  console.log('❌ env.example missing');
  allFilesExist = false;
}

// Summary
console.log('\n📊 Deployment Check Summary:');
console.log(`Files: ${allFilesExist ? '✅ All required files present' : '❌ Some files missing'}`);
console.log(`Dependencies: ${requiredDeps.every(dep => packageJson.dependencies[dep]) ? '✅ All dependencies present' : '❌ Some dependencies missing'}`);
console.log(`Lovable Cleanup: ${!lovableReferencesFound ? '✅ No Lovable references found' : '⚠️  Lovable references still present'}`);

if (allFilesExist && !lovableReferencesFound) {
  console.log('\n🎉 Ready for deployment!');
  console.log('\nNext steps:');
  console.log('1. Push changes to GitHub');
  console.log('2. Connect repository to Vercel');
  console.log('3. Configure environment variables in Vercel');
  console.log('4. Deploy!');
} else {
  console.log('\n⚠️  Please fix the issues above before deploying');
  process.exit(1);
}
