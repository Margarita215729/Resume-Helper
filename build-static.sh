#!/bin/bash

echo "🚀 Building static export for GitHub Pages..."

# Clean previous builds
rm -rf out .next/out

# Build with static config
NEXT_CONFIG_FILE=next.config.static.js npx next build

# Check if out directory was created
if [ ! -d "./out" ]; then
    echo "⚠️  out directory not found, creating manually..."
    mkdir -p ./out
    
    # Copy static files from .next
    if [ -d "./.next/static" ]; then
        echo "📁 Copying static assets..."
        mkdir -p ./out/_next
        cp -r ./.next/static ./out/_next/
    fi
    
    # Copy server-rendered HTML files
    if [ -d "./.next/server/app" ]; then
        echo "📄 Copying HTML pages..."
        find ./.next/server/app -name "*.html" -exec cp {} ./out/ \;
    fi
    
    # Copy public assets
    if [ -d "./public" ]; then
        echo "🖼️  Copying public assets..."
        cp -r ./public/* ./out/ 2>/dev/null || true
    fi
fi

echo "✅ Static export created in ./out/"
echo "📋 Contents:"
ls -la ./out/
