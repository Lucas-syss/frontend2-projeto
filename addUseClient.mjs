import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function traverse(dir) {
    const files = readdirSync(dir);
    for (const file of files) {
        const fullPath = join(dir, file);
        if (statSync(fullPath).isDirectory()) {
            traverse(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            const content = readFileSync(fullPath, 'utf8');
            if (content.match(/use(State|Effect|Ref|Memo|Callback|Context|Pathname|Scroll|Transform|Spring|Router)/) || content.includes('framer-motion')) {
                if (!content.includes('"use client"') && !content.includes("'use client'")) {
                    writeFileSync(fullPath, '"use client";\n' + content);
                    console.log('Added use client to', fullPath);
                }
            }
        }
    }
}

traverse('./src');
