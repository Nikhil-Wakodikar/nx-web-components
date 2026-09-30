#!/bin/bash

# Build and Serve Script
# 1. Build Stencil library
# 2. Build Angular component-library
# 3. Serve Angular my-app

set -e  # Exit on any error

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
STENCIL_DIR="$ROOT_DIR/packages/stencil-library"
ANGULAR_DIR="$ROOT_DIR/packages/angular-workspace"

echo "============================================"
echo "  Step 1: Building Stencil Library"
echo "============================================"
cd "$STENCIL_DIR"
npm run build
echo "✅ Stencil build complete!"

echo ""
echo "============================================"
echo "  Step 2: Building Angular Component Library"
echo "============================================"
cd "$ANGULAR_DIR"
npx ng build component-library
echo "✅ Angular component-library build complete!"

echo ""
echo "============================================"
echo "  Step 3: Serving Angular my-app"
echo "============================================"
cd "$ANGULAR_DIR"
npx ng serve my-app
