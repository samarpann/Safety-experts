import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Helper to get all HTML files recursively
function getHtmlFiles(dir, files_ = []) {
    const files = fs.readdirSync(dir);
    for (const i in files) {
        const name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            if (files[i] !== 'node_modules' && files[i] !== 'dist') {
                getHtmlFiles(name, files_);
            }
        } else {
            if (name.endsWith('.html')) {
                files_.push(name);
            }
        }
    }
    return files_;
}

const htmlFiles = getHtmlFiles('.');
const input = {};
htmlFiles.forEach(file => {
    // Remove './' and '.html' to create a key
    const name = file.replace(/^\.\//, '').replace(/\.html$/, '');
    input[name] = resolve(__dirname, file);
});

export default defineConfig({
    build: {
        rollupOptions: {
            input: input
        },
        outDir: 'dist',
        emptyOutDir: true
    }
});
