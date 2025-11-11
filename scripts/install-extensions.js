#!/usr/bin/env node

/**
 * Script to automatically install recommended VS Code extensions
 * Run with: node scripts/install-extensions.js
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

const extensionsFile = join(__dirname, '..', '.vscode', 'extensions.json');

try {
    // Read the extensions.json file
    const extensionsConfig = JSON.parse(readFileSync(extensionsFile, 'utf8'));
    const recommendations = extensionsConfig.recommendations || [];

    if (recommendations.length === 0) {
        console.log('No extensions to install.');
        process.exit(0);
    }

    console.log('Installing recommended VS Code extensions...\n');

    // Install each extension
    recommendations.forEach((extension) => {
        try {
            console.log(`Installing ${extension}...`);
            execSync(`code --install-extension ${extension}`, {
                stdio: 'inherit',
            });
            console.log(`✓ ${extension} installed successfully\n`);
        } catch (error) {
            console.error(`✗ Failed to install ${extension}`);
            console.error(error.message);
        }
    });

    console.log('\n✓ All extensions installation complete!');
    console.log('Please reload VS Code to activate the extensions.');
} catch (error) {
    console.error('Error reading extensions.json:', error.message);
    process.exit(1);
}
